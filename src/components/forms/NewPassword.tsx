"use client";

import {
  Grid,
  Card,
  CardHeader,
  Stack,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { TextField } from "formik-mui";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SnackBarComponent from "../common/SnackBarComponent";
import { AlertType } from "../../utils/types";

type initialValues = {
  newPassword: string;
  reenterPassword: string;
};
 

type props = {
  userType: string;
};

const NewPassword = (props: props) => {
  const [token, setToken] = useState<null | string>(null);
  const [newPasswordVisibility, setNewPasswordVisibility] = useState(false);
  const [newConfirmPasswordVisibility, setNewConfirmPasswordVisibility] = useState(false);

  const router = useRouter();

  const [backendCall, setBackendCall] = useState(false);
  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const loginValidationSchema = yup.object({
    newPassword: yup
      .string()
      .matches(
        passwordRegex,
        "New Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long"
      )
      .required("Password is required"),
    reenterPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Passwords must match")
      .required("Please re-enter your password"),
  });

  const initialValues: initialValues = {
    newPassword: "",
    reenterPassword: "",
  };

  const handleSubmit = async (
    values: initialValues,
    formikHelpers: FormikHelpers<initialValues>
  ) => {
    try {
      setBackendCall(true);

      const payload = {
        newPassword: values.newPassword,
        userType: props.userType,
        token,
      };

      const response = await fetch("/api/forgotPassword/new-password", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        const errorMessage = await response.json();
        setBackendCall(false);
        setAlert({
          show: true,
          message: (typeof errorMessage?.message === "string" && errorMessage?.message) ?? "Something went wrong!",
          severity: "error",
        });
      } else {
        formikHelpers.resetForm();
        setBackendCall(false);
        setAlert({
          show: true,
          message: "Password updated successfully!",
          severity: "success",
        });

        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } catch (e: any) {
      setBackendCall(false);
      setAlert({
        show: true,
        message: e.message,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");
    setToken(token);
  }, []);

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
        title={
          !backendCall
            ? "Change Password"
            : "Please wait. updating your password..."
        }
        align="center"
        sx={{ textTransform: "uppercase" }}
      />
      {!backendCall ? (
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
                        id="newPassword"
                        name="newPassword"
                        label="New Password"
                        type={newPasswordVisibility ? "text" : "password"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              style={{ outline: "none", cursor: "pointer" }}
                              onClick={() =>
                                setNewPasswordVisibility(!newPasswordVisibility)
                              }
                            >
                              {newPasswordVisibility ? (
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

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Field
                        disabled={backendCall}
                        fullWidth
                        id="reenterPassword"
                        name="reenterPassword"
                        label="Reenter Password"
                        type={newConfirmPasswordVisibility ? "text" : "password"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              style={{ outline: "none", cursor: "pointer" }}
                              onClick={() =>
                                setNewConfirmPasswordVisibility(!newConfirmPasswordVisibility)
                              }
                            >
                              {newConfirmPasswordVisibility ? (
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

export { NewPassword };
