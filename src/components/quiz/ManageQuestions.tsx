"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AlertType } from "../../utils/types/general-types";
import { useSession } from "next-auth/react";
import { QuestionCard } from "./QuestionCard";
import { useRouter } from "next/navigation";
import { Grid, CircularProgress, Typography } from "@mui/material";
import SnackBarComponent from "../common/SnackBarComponent";

function ManageQuestions() {
  const { data:session, status } = useSession();
  const [questions, setQuestions] = useState([
    {
      question: "",
      answers: [],
      correctAnswer: "",
      questionId: "",
      jobId: "",
    },
  ]);

  const router = useRouter();

  const [backendCall, setBackendCall] = useState(true);

  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });

  const getQuestions = useCallback(async () => {
    try {
      setBackendCall(true);
      // @ts-ignore 
      const response = await fetch(`/api/${session?.user?.role}/quiz/getCreatedQuestions`, {
        method: "POST",
        body: JSON.stringify({ jobId: "661fba9a285aa9ce2e82d0fc" }),
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

        setTimeout(() => {
          router.push("/dashboard/candidate/applied-jobs");
        }, 4000);
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
  }, [router, session?.user?.role]);

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
          {questions.length ? (
            <QuestionCard
              getQuestions={getQuestions}
              questions={questions as any}
              editQuestion
            />
          ) : (
            <Typography variant="h5">This user not created a questions Yet.</Typography>
          )}
        </Grid>
      )}
    </Grid>
  );
}

export { ManageQuestions };
