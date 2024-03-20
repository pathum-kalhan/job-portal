"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { CountDownTimer } from "../../../../../components/quiz/CountDownTimer";
import { Questions } from "../../../../../components/quiz/Questions";

import { CircularProgress, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { AlertType, Question } from "../../../../../utils/types/genaral-types";
import { useSession } from "next-auth/react";
import SnackBarComponent from "../../../../../components/common/SnackBarComponent";
import { Constant } from "../../../../../utils/Constents";

function Page() {
  const router = useRouter();
  const formikRef = useRef();
  const { data: session, status } = useSession();
  const [backendCall, setBackendCall] = useState(true);
  const [getScoreBackendCall, setGetScoreBackendCall] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = useCallback(
    async (userAnswers: any) => {
      const results = Object.keys(userAnswers).map((question) => {
        const correctAnswer = questions.find((q) => q.question === question);
        if (correctAnswer) {
          const isCorrect = correctAnswer.answers.some((answer) => {
            return answer.text === userAnswers[question] && answer.isCorrect;
          });
          return { _id: correctAnswer._id, question, isCorrect };
        }
        return { _id: null, question, isCorrect: false }; // If question not found in correctAnswers
      });
      const correctAnswers = results.filter((item) => item.isCorrect);
      const questionsIds = questions.map((item) => item._id);

      const payLoad = {
        email: session.user.email,
        // @ts-ignore
        userRole: session.user.role,
        score: `${results.length ? correctAnswers.length : 0}/${
          questions.length
        }`,
        questionsIds,
      };
      try {
        setGetScoreBackendCall(true);

        const response = await fetch("/api/candidate/addQuizScore", {
          method: "POST",
          body: JSON.stringify(payLoad),
        });

        if (response.status !== 200) {
          setGetScoreBackendCall(false);

          const { message } = await response.json();
          setAlert({
            show: true,
            message:
              typeof message === "string"
                ? message
                : "Saving Quiz score failed due to server error, please try again!",
            severity: "error",
          });
        } else {
          setGetScoreBackendCall(false);
          router.push(
            `/dashboard/candidate/quizzes/results?score=${
              results.length ? correctAnswers.length : 0
            }/${questions.length}`
          );
        }
      } catch (error) {
        setAlert({
          show: true,
          message: typeof error === "string" ? error : "Server Error",
          severity: "error",
        });

        setGetScoreBackendCall(false);
      }
    },
    // @ts-ignore
    [questions, router, session?.user?.email, session?.user?.role]
  );

  const onTimeout = useCallback(async () => {
    // @ts-ignore
    if (formikRef?.current?.values) {
      // @ts-ignore
      handleSubmit(formikRef.current.values);
    }
  }, [handleSubmit]);

  const getQuestions = useCallback(async () => {
    try {
      setBackendCall(true);

      const response = await fetch("/api/common/getQuestions", {
        method: "GET",
      });

      if (response.status !== 200) {
        setBackendCall(false);

        const { message } = await response.json();
        setAlert({
          show: true,
          message:
            typeof message === "string"
              ? message
              : "Question loading failed due to server error, please try again!",
          severity: "error",
        });
      } else {
        const data = await response.json();
        setQuestions(data.data);
        setBackendCall(false);
      }
    } catch (error) {
      setAlert({
        show: true,
        message: typeof error === "string" ? error : "Server Error",
        severity: "error",
      });

      setBackendCall(false);
    }

    // @ts-ignore
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      getQuestions();
    }
  }, [getQuestions, status]);

  return (
    <Grid container>
      <SnackBarComponent alert={alert} setAlert={setAlert} />
      {backendCall ? (
        <Grid
          container
          item
          alignItems="center"
          justifyContent="center"
          gap={3}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <Grid
          container
          item
          alignItems="center"
          justifyContent="center"
          gap={3}
        >
          <Grid item xs={12}>
            <CountDownTimer
              minutes={Constant.quizTimeLimit}
              onTimeout={onTimeout}
            />
          </Grid>

          <Questions
            getScoreBackendCall={getScoreBackendCall}
            questions={questions}
            handleSubmit={handleSubmit}
            formikRef={formikRef}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default Page;
