"use client";
import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import SnackBarComponent from "../common/SnackBarComponent";
import { AlertType } from "../../utils/types/general-types";
import { useRouter } from "next/navigation";

type Props = {
  handleStatus?: (val: string) => void;
};

const StartForm = ({ handleStatus }: Props) => {
  const router = useRouter();
  const [jobId, setJobId] = useState<string | null>(null);
  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });

  const [initialValues, setInitialValues] = useState({
    name: "",
  });
  const handleSubmit = () => {
    if (jobId && handleStatus) {
      handleStatus(jobId);
    } else {
      setAlert({
        show: true,
        message:
          "Question loading failed, please try again!. Redirecting to the applied jobs...",
        severity: "error",
      });

      setTimeout(() => {
        router.push("/dashboard/candidate/applied-jobs");
      }, 3000);
    }
  };

  useEffect(() => {
    if (window?.location?.search) {
      const searchParams =
        window?.location?.search &&
        new URLSearchParams(window?.location?.search);
      const jobIdVal = searchParams ? searchParams.get("jobId") : null;

      setJobId(jobIdVal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window?.location?.search]);

  return (
    <Card>
      <SnackBarComponent alert={alert} setAlert={setAlert} />
      <CardHeader title="Welcome to the Quiz" sx={{ textAlign: "center" }} />
      <CardContent>
        <Grid container>
          <Grid container item alignItems="center" justifyContent="center">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {(formik) => {
                const { isValid, dirty } = formik;
                return (
                  <Form>
                    <Grid item>
                      <Button
                        type="submit"
                        variant="contained"
                        endIcon={<SportsScoreIcon />}
                      >
                        Start
                      </Button>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export { StartForm };
