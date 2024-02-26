"use client";
import { questions } from "@/utils/quiz/questions";
import { Questions } from "@/components/quiz/Questions";
import { Grid } from "@mui/material";
import { StartForm } from "@/components/quiz/StartForm";
import { useState } from "react";
import { CountDownTimer } from "@/components/quiz/CountDownTimer";
import { useRouter } from "next/navigation";


function Page() {
  const [status, setStatus] = useState("start");

  const router = useRouter();  

  const handleStatus = (statusVal: string) => {
    setStatus(statusVal);
    if (statusVal === "finished") { 
      router.push("/quizzes/results");
    }
  };


  const onTimeout = () => {
    setStatus("finished"); 
      router.push("/quizzes/results"); 
  };

  return (
    <Grid container>
      <Grid container item alignItems="center" justifyContent="center" gap={3}>
        <Grid item md={7} sm={10} xs={12}></Grid>
        {status === "start" && (
          <Grid
            container
            item
            alignItems="center"
            justifyContent="center"
            gap={3}
          >
            <Grid item sm={7} xs={12}>
              <StartForm handleStatus={handleStatus} />
            </Grid>
          </Grid>
        )}

        {status === "questions" && (
          <>
            <Grid item xs={12}>
              <CountDownTimer minutes={0.1} onTimeout={onTimeout} />
            </Grid>

            <Questions questions={questions} />
          </>
        )}
 
      </Grid>
    </Grid>
  );
}

export default Page;
