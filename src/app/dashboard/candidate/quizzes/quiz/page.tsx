"use client";
import { CountDownTimer } from "@/components/quiz/CountDownTimer";
import { Questions } from "@/components/quiz/Questions";
import { questions } from "@/utils/quiz/questions";
import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const onTimeout = () => {
      router.push("/dashboard/candidate/quizzes/results"); 
  };

  return (
    <Grid container>
      <Grid container item alignItems="center" justifyContent="center" gap={3}>
        <Grid item xs={12}>
          <CountDownTimer minutes={1} onTimeout={onTimeout} />
        </Grid>

        <Questions questions={questions} />
      </Grid>{" "}
    </Grid>
  );
}

export default Page;
