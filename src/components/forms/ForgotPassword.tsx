"use client";

import {
  Grid,
  Card,
  CardHeader,
  Stack,
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { TextField } from "formik-mui";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";

type initialValues = {
  email: string;
};

type Alert = {
  show: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
};

type props = {
  userType: string;
};

const ForgotPassword = (props: props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [backendCall, setBackendCall] = useState(false);
  const [alert, setAlert] = useState<Alert>({
    show: false,
    message: "",
    severity: "success",
  });

  const loginValidationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const initialValues: initialValues = {
    email: "",
  };

  const handleSubmit = async (
    values: initialValues,
    formikHelpers: FormikHelpers<initialValues>
  ) => {
    try {
      setBackendCall(true);

      const payload = {
        email: values.email,
        userType: props.userType,
      };

      const response = await fetch("/api/forgotPassword", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        setBackendCall(false);
        setAlert({
          show: true,
          message: "Something went wrong!",
          severity: "error",
        });
      } else {
        formikHelpers.resetForm();
        setBackendCall(false);
        setAlert({
          show: true,
          message: "Password rest email sent successfully!",
          severity: "success",
        });
        router.push("/");
      }
    } catch (e: any) {
      setBackendCall(false);
      setAlert({
        show: true,
        message: "Server Error",
        severity: "error",
      });
    }
  };

  return (
    <Card
      sx={{
        padding: "1rem",
        width: "100%",
        maxWidth: {
          lg: "40vw",
          md: "70vw",
          sm: "70vw",
          xs: "85vw",
        },
        marginLeft: "auto",
        marginRight: "auto",
      }}
      elevation={3}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        open={alert.show}
        onClose={() =>
          setAlert({
            show: false,
            message: "",
            severity: "success",
          })
        }
      >
        <Alert
          onClose={() =>
            setAlert({
              show: false,
              message: "",
              severity: "success",
            })
          }
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>

      <CardHeader
        title={
          !session?.user?.email && !backendCall
            ? "Forgot Password"
            : "Please wait. sending reset link to your mail..."
        }
        align="center"
        sx={{ textTransform: "uppercase" }}
      />
      {!session?.user?.email && !backendCall ? (
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={loginValidationSchema}
          enableReinitialize
        >
          {(formik) => {
            const { isValid, dirty } = formik;
            return (
              <Form>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  mt={3}
                >
                  <Grid
                    item
                    container
                    alignItems="center"
                    justifyContent="center"
                    gap={3}
                    lg={10}
                    md={9}
                    sm={11}
                    xs={12}
                  >
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Field
                        disabled={backendCall}
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        component={TextField}
                      />
                    </Grid>

                    <Grid item lg={"auto"}>
                      <Stack direction="column" gap={2}>
                        <LoadingButton
                          loading={backendCall}
                          disabled={!isValid || !dirty}
                          color="primary"
                          variant="contained"
                          size="large"
                          type="submit"
                        >
                          Submit
                        </LoadingButton>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      ) : (
        <Stack height={"50vh"} alignItems="center" justifyContent="center">
          <CircularProgress />
        </Stack>
      )}
    </Card>
  );
};

export { ForgotPassword };
