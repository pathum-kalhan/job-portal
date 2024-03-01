"use client";

import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Card,
  CardHeader,
  Typography,
  Stack,
  Alert,
  Snackbar,
} from "@mui/material";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { TextField } from "formik-mui";

import * as yup from "yup";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";

type initialValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type props = {
  handleLoginMethod: (val: string) => void;
};
type Alert = {
  show: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
};

const CandidateLoginForm = (props: props) => {
  const { handleLoginMethod } = props;
  const router = useRouter();
  const [backendCall, setBackendCall] = useState(false);
  const [alert, setAlert] = useState<Alert>({
    show: false,
    message: "",
    severity: "success",
  });

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const loginValidationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .matches(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long"
      )
      .required("Password is required"),
    rememberMe: yup.boolean(),
  });

  const initialValues: initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const handleSubmit = async (
    values: initialValues,
    formikHelpers: FormikHelpers<initialValues>
  ) => {
    formikHelpers.resetForm();


    try {
      setBackendCall(true);

      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        role: "candidate",
      });

      if (response?.status !== 200) {
        setBackendCall(false);
        setAlert({
          show: true,
          message: "Something went wrong!",
          severity: "error",
        });
      } else {
        
        setBackendCall(false);
        setAlert({
          show: true,
          message: "Candidate Logedin successfully!",
          severity: "success",
        });
        formikHelpers.resetForm();
        router.push("/dashboard/profile");
      }
 
    } catch (error) {
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
        title="Login to career pro guide"
        align="center"
        sx={{ textTransform: "uppercase" }}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={loginValidationSchema}
        enableReinitialize
      >
        {(formik) => {
          const { isValid, dirty, values, setFieldValue } = formik;
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
                  <Grid
                    container
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    alignItems="center"
                    justifyContent="center"
                    gap={3}
                  >
                    <Grid item lg={"auto"} md={"auto"} sm={"auto"} xs={"auto"}>
                      <Button
                        variant="contained"
                        startIcon={<GoogleIcon />}
                        sx={{ fontWeight: "bold" }}
                      >
                        Google
                      </Button>
                    </Grid>
                    <Grid item lg={"auto"} md={"auto"} sm={"auto"} xs={"auto"}>
                      <Button
                        variant="contained"
                        startIcon={<LinkedInIcon />}
                        sx={{ fontWeight: "bold" }}
                      >
                        LinkedIn
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Typography textAlign="center">OR</Typography>
                  </Grid>

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
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
                    disabled={backendCall}
                      fullWidth
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      component={TextField}
                    />
                  </Grid>
                  <Grid
                    container
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                  >
                    <Grid item lg={"auto"} md={"auto"} sm={"auto"} xs={"auto"}>
                      <FormControlLabel
                        disabled={backendCall}
                        control={
                          <Checkbox
                            id="rememberMe"
                            name="rememberMe"
                            color="primary"
                            checked={values.rememberMe}
                            onChange={(e, newValue) => {
                              setFieldValue("rememberMe", newValue);
                            }}
                          />
                        }
                        label="Remember me"
                      />
                    </Grid>
                    <Grid item lg={"auto"} md={"auto"} sm={"auto"} xs={"auto"}>
                      <Button
                        disabled={backendCall}
                        sx={{ textTransform: "capitalize" }}
                        variant="text"
                      >
                        Forgot Password?
                      </Button>
                    </Grid>
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
                        Login
                      </LoadingButton>

                      <Button
                        disabled={backendCall}
                        color="primary"
                        variant="text"
                        type="submit"
                        sx={{
                          textTransform: "none",
                        }}
                        onClick={() => handleLoginMethod("employer")}
                      >
                        Login as a Employer
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Card>
  );
};

export { CandidateLoginForm };
