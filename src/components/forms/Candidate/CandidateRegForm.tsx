"use client";

import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Card,
  CardHeader,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/navigation";
import { MouseEvent, useCallback, useState } from "react";
import * as yup from "yup";

type initialValues = {
  name: string;
  linkedInProfileUrl: string;
  dateOfBirth: string;
  email: string;
  verificationCode: string;
  contactNo: string;
  password: string;
  reenterPassword: string;
  acceptTerms: boolean;
};

type Alert = {
  show: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
};

const CandidateRegForm = () => {
  const router = useRouter();

  const [emailValidate, setEmailValidate] = useState(false);
  const [backendCall, setBackendCall] = useState(false);
  const [alert, setAlert] = useState<Alert>({
    show: false,
    message: "",
    severity: "success",
  });

  const [isCodeSubmitted, setIsCodeSubmitted] = useState(false);
  const phoneNumberRegex = /^07\d{8}$/;

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const accountValidationSchemaWithEmailField = yup.object({
    name: yup.string().min(1).max(30).required("Name is required"),
    linkedInProfileUrl: yup
      .string()
      .url("Invalid URL format")
      .required("LinkedIn Profile URL is required"),
    dateOfBirth: yup.string().required("Date of Birth is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    contactNo: yup
      .string()
      .matches(phoneNumberRegex, "Please enter a valid mobile number")
      .required("Candidate's Contact No is required"),
    password: yup
      .string()
      .matches(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long"
      )
      .required("Password is required"),
    reenterPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Please re-enter your password"),
    acceptTerms: yup
      .boolean()
      .oneOf([true], "Please accept the terms")
      .required(),
  });

  const accountValidationSchemaWithVerifyField = yup.object({
    name: yup.string().min(1).max(30).required("Name is required"),
    linkedInProfileUrl: yup
      .string()
      .url("Invalid URL format")
      .required("LinkedIn Profile URL is required"),
    dateOfBirth: yup.date().required("Date of Birth is required"),
    verificationCode: yup.string().required("Verification Code is required"),
    contactNo: yup
      .string()
      .matches(phoneNumberRegex, "Please enter a valid mobile number")
      .required("Candidate's Contact No is required"),
    password: yup
      .string()
      .matches(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long"
      )
      .required("Password is required"),
    reenterPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Please re-enter your password"),
    acceptTerms: yup
      .boolean()
      .oneOf([true], "Please accept the terms")
      .required(),
  });

  const initialValues: initialValues = {
    name: "",
    linkedInProfileUrl: "",
    dateOfBirth: "",
    email: "",
    verificationCode: "",
    contactNo: "",
    password: "",
    reenterPassword: "",
    acceptTerms: false,
  };

  const handleSubmit = useCallback(
    async (
      values: initialValues,
      formikHelpers: FormikHelpers<initialValues>
    ) => {
      setBackendCall(true);
      try {
        const payload = {
          name: values.name,
          linkedInProfileUrl: values.linkedInProfileUrl,
          dateOfBirth: values.dateOfBirth,
          email: values.email,
          contactNo: values.contactNo,
          password: values.password,
        };

        const response = await fetch("/api/candidate/register", {
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
          setEmailValidate(false);
          setIsCodeSubmitted(false);
          setBackendCall(false);
          setAlert({
            show: true,
            message: "Candidate Created successfully!",
            severity: "success",
          });

          router.replace('/login');
        }
      } catch (e: any) {
        setBackendCall(false);
        setAlert({
          show: true,
          message: "Server Error",
          severity: "error",
        });
      }
    },

    [router]
  );

  const verifyAccount = useCallback(async (e: MouseEvent, email: string) => {
    e.preventDefault();

    try {
      setBackendCall(true);
      const response = await fetch("/api/common/sendOtpEmail", {
        method: "POST",
        body: JSON.stringify({ email, userType: "candidate" }),
        headers: {
          "Content-Type": "application/json",
        },
      });
        
      if (response.status !== 200) {
        setBackendCall(false);
        setAlert({
          show: true,
          message:" Something went wrong!",
          severity: "error",
        });
      } else {
        setEmailValidate(true);
        setBackendCall(false);
        setAlert({
          show: true,
          message: `OTP sent to your email!`,
          severity: "success",
        });
      }
    } catch (e:any) {
      setBackendCall(false);
      setAlert({
        show: true,
        message:  e?.message?? "Server Error",
        severity: "error",
      });
    }
  }, []);

  const verifyOtp = useCallback(
    async (e: MouseEvent, email: string, otpCode?: string) => {
      e.preventDefault();

      try {
        setBackendCall(true);

        const response = await fetch("/api/common/verifyOtp", {
          method: "POST",
          body: JSON.stringify({ email, otpCode, userType: "candidate" }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        

        if (response.status !== 200) {
          setBackendCall(false);
           setAlert({
          show: true,
          message: " Something went wrong!",
          severity: "error",
        });
        } else {
          setIsCodeSubmitted(true);
          setBackendCall(false);
          setAlert({
          show: true,
          message: `Email is verified!`,
          severity: "success",
        });
        }
      } catch (e:any) {
        setBackendCall(false);
         setAlert({
        show: true,
        message: "Server Error",
        severity: "error",
      });
      }
    },
    []
  );

  return (
    <Card
      sx={{
        padding: "1rem",
        width: "100%",
        maxWidth: {
          lg: "50vw",
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
        onClose={() => setAlert({
          show: false,
          message: "",
          severity: "success",
        })}
      >
        <Alert
          onClose={() => setAlert({
            show: false,
            message: "",
            severity: "success",
          })}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>

      <CardHeader title="Create account to post a job" align="center" />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={
          emailValidate
            ? accountValidationSchemaWithVerifyField
            : accountValidationSchemaWithEmailField
        }
        enableReinitialize
      >
        {(formik) => {
          const { isValid, dirty, values, errors, setFieldValue } = formik;
          return (
            <Form>
              <Grid container alignItems="center" justifyContent="center">
                <Grid
                  item
                  container
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                >
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
                      fullWidth
                      id="name"
                      name="name"
                      label="Name"
                      component={TextField}
                    />
                  </Grid>
                  {!emailValidate ? (
                    <Grid
                      container
                      item
                      alignItems="center"
                      justifyContent="flex-start"
                      gap={2}
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                    >
                      <Grid item lg={8} md={8} sm={8} xs={7}>
                        <Field
                          fullWidth
                          id="email"
                          name="email"
                          label="Email"
                          component={TextField}
                        />
                      </Grid>
                      <Grid
                        item
                        lg={"auto"}
                        md={"auto"}
                        sm={"auto"}
                        xs={"auto"}
                      >
                        <LoadingButton
                          loading={backendCall}
                          disabled={values.email === ""}
                          color="success"
                          variant="contained"
                          fullWidth
                          onClick={(e) => verifyAccount(e, values.email)}
                        >
                          Verify
                        </LoadingButton>
                      </Grid>
                      {!emailValidate && (
                        <FormHelperText error={!emailValidate}>
                          Click Verify to get the Email verification Code
                        </FormHelperText>
                      )}
                    </Grid>
                  ) : (
                    <Grid
                      container
                      item
                      alignItems="center"
                      justifyContent="flex-start"
                      gap={2}
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                    >
                      <Grid item lg={8} md={8} sm={8} xs={7}>
                        <Field
                          fullWidth
                          disabled={isCodeSubmitted}
                          id="verificationCode"
                          name="verificationCode"
                          label="Verification Code"
                          component={TextField}
                        />
                      </Grid>
                      <Grid
                        item
                        lg={"auto"}
                        md={"auto"}
                        sm={"auto"}
                        xs={"auto"}
                      >
                        <LoadingButton
                          loading={backendCall}
                          disabled={
                            isCodeSubmitted || values.verificationCode === ""
                          }
                          color="success"
                          variant="contained"
                          fullWidth
                          onClick={(e) =>
                            verifyOtp(e, values.email, values.verificationCode)
                          }
                        >
                          Submit
                        </LoadingButton>
                      </Grid>
                      {!isCodeSubmitted && (
                        <FormHelperText error={!isCodeSubmitted}>
                          Enter the verification code and Click Submit to Verify
                          the email
                        </FormHelperText>
                      )}
                    </Grid>
                  )}
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
                      fullWidth
                      id="linkedInProfileUrl"
                      name="linkedInProfileUrl"
                      label="LinkedIn Profile URL"
                      component={TextField}
                    />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
                      fullWidth
                      id="contactNo"
                      name="contactNo"
                      label="Contact Number"
                      component={TextField}
                    />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
                      fullWidth
                      id="dateOfBirth"
                      name="dateOfBirth"
                      label="Date of Birth"
                      type="date"
                      component={TextField}
                    />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
                      fullWidth
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
                      fullWidth
                      id="reenterPassword"
                      name="reenterPassword"
                      label="Re-enter Password"
                      type="password"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="acceptTerms"
                          name="acceptTerms"
                          color="primary"
                          checked={values.acceptTerms}
                          onChange={(e, newValue) => {
                            setFieldValue("acceptTerms", newValue);
                          }}
                        />
                      }
                      label="Accept terms and conditions"
                    />
                    {!!errors.acceptTerms && (
                      <FormHelperText error={!!errors.acceptTerms}>
                        {errors.acceptTerms}
                      </FormHelperText>
                    )}
                  </Grid>

                  <Grid item lg={"auto"}>
                    <LoadingButton
                      loading={backendCall}
                      disabled={
                        !isCodeSubmitted || !emailValidate || !isValid || !dirty
                      }
                      color="primary"
                      variant="contained"
                      size="large"
                      type="submit"
                    >
                      Create Account
                    </LoadingButton>
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

export { CandidateRegForm };
