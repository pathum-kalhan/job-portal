"use client";

import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Card,
  CardHeader,
  Stack,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import * as yup from "yup";
import Link from "next/link";
import SnackBarComponent from "../../../components/common/SnackBarComponent";
import { AlertType } from "../../../utils/types";

type initialValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type props = {
  handleLoginMethod: (val: string) => void;
};
 

const EmployerLoginForm = (props: props) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();
  const [backendCall, setBackendCall] = useState(false);
  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });

  const { handleLoginMethod } = props;
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

  const handleSubmit = async (values: initialValues) => {
    try {
      setBackendCall(true);

      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        role: "employer",
      });

      if (response?.status !== 200) {
        setBackendCall(false);
        setAlert({
          show: true,
          message: "Please check your email and password are correct!",
          severity: "error",
        });
      } else {
        setBackendCall(false);
        setAlert({
          show: true,
          message: "Employer Loged-in successfully!",
          severity: "success",
        });
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

  useEffect(() => {
    if (session?.user?.email && !backendCall) {
      router.push("/");
    }
  }, [session?.user?.email, backendCall, router]);

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
      <SnackBarComponent alert={alert} setAlert={setAlert} />

      <CardHeader
        title="Login as a Employer"
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
                        type={passwordVisibility ? "text" : "password"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              style={{ outline: "none", cursor: "pointer" }}
                              onClick={() =>
                                setPasswordVisibility(!passwordVisibility)
                              }
                            >
                              {passwordVisibility ? (
                                <RemoveRedEyeIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </InputAdornment>
                          ),
                        }}
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
                      <Grid
                        item
                        lg={"auto"}
                        md={"auto"}
                        sm={"auto"}
                        xs={"auto"}
                      >
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
                      <Grid
                        item
                        lg={"auto"}
                        md={"auto"}
                        sm={"auto"}
                        xs={"auto"}
                      >
                        <Link href="/employer/forgot-password">
                        <Button
                          sx={{ textTransform: "capitalize" }}
                          variant="text"
                        >
                          Forgot Password?
                        </Button>
                        </Link>
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
                          onClick={() => handleLoginMethod("candidate")}
                        >
                          Login as a Candidate
                        </Button>
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

export { EmployerLoginForm };
