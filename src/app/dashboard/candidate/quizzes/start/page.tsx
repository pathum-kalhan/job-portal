"use client";
import { StartForm } from "../../../../../components/quiz/StartForm";
import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const handleStatus = () => {
      router.push("/dashboard/candidate/quizzes/quiz");
  };

  return (
    <Grid container>
      <Grid container item alignItems="center" justifyContent="center" gap={3}>
        <Grid item md={7} sm={10} xs={12}></Grid>
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
      </Grid>
    </Grid>
  );
}

export default Page;
