"use client";

import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardHeader,
  FormHelperText,
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import { Formik, Form, Field, FormikProps, FormikHelpers } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/navigation";
import { MouseEvent, useCallback, useState } from "react";
import * as yup from "yup";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type initialValues = {
  companyName: string;
  companyDetails: string;
  websiteUrl: string;
  location: string;
  email: string;
  verificationCode: string;
  companyContactNo: string;
  password: string;
  reenterPassword: string;
  acceptTerms: boolean;
};

type selectProps = {
  children: React.ReactNode;
  form: FormikProps<initialValues>;
  field: {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    ref: React.Ref<HTMLInputElement>;
    type: string;
    id: string;
    placeholder: string;
    multiline: boolean;
    rows: number;
    maxRows: number;
    minRows: number;
    fullWidth: boolean;
    required: boolean;
    label: string;
    error: boolean;
  };
};
type AlertType = {
  show: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
};

const CustomizedSelectForFormik = (selectProps: selectProps) => {
  const { children, form, field } = selectProps;

  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <Select
      label="Locations"
      name={name}
      value={value}
      fullWidth
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}
    >
      {children}
    </Select>
  );
};

const EmployerRegForm = () => {
  const router = useRouter();
  const [emailValidate, setEmailValidate] = useState(false);
  const [isCodeSubmitted, setIsCodeSubmitted] = useState(false);
  const [backendCall, setBackendCall] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [newConfirmPasswordVisibility, setNewConfirmPasswordVisibility] =
    useState(false);

  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });
  const locationsArray = ["colombo", "kandy"];
  const phoneNumberRegex = /^07\d{8}$/;

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const accountValidationSchemaWithEmailField = yup.object({
    companyName: yup
      .string()
      .min(1)
      .max(30)
      .required("Company Name is required"),
    companyDetails: yup
      .string()
      .min(1)
      .max(300)
      .required("Company Details are required"),
    websiteUrl: yup
      .string()
      .url("Invalid URL format")
      .required("Website URL is required"),
    location: yup.string().required("Location is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    companyContactNo: yup
      .string()
      .matches(phoneNumberRegex, "Please enter a valid mobile number")
      .required("Company Contact No is required"),
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
    acceptTerms: yup.boolean().oneOf([true], "Please accept the terms"),
  });

  const accountValidationSchemaWithVerifyField = yup.object({
    companyName: yup
      .string()
      .min(1)
      .max(30)
      .required("Company Name is required"),
    companyDetails: yup
      .string()
      .min(1)
      .max(300)
      .required("Company Details are required"),
    websiteUrl: yup
      .string()
      .url("Invalid URL format")
      .required("Website URL is required"),
    location: yup.string().required("Location is required"),
    verificationCode: yup.string().required("Verification Code is required"),
    companyContactNo: yup
      .string()
      .matches(phoneNumberRegex, "Please enter a valid mobile number")
      .required("Company Contact No is required"),
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
    acceptTerms: yup.boolean().oneOf([true], "Please accept the terms"),
  });

  const initialValues: initialValues = {
    companyName: "",
    companyDetails: "",
    websiteUrl: "",
    location: "",
    email: "",
    verificationCode: "",
    companyContactNo: "",
    password: "",
    reenterPassword: "",
    acceptTerms: false,
  };

  const handleSubmit = useCallback(
    async (
      values: initialValues,
      formikHelpers: FormikHelpers<initialValues>
    ) => {
      try {
        setBackendCall(true);
        const payload = {
          name: values.companyName,
          companyDetails: values.companyDetails,
          websiteUrl: values.websiteUrl,
          location: values.location,
          email: values.email,
          contactNo: values.companyContactNo,
          password: values.password,
        };

        const response = await fetch("/api/employer/register", {
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
            message:
              (typeof errorMessage?.message === "string" &&
                errorMessage?.message) ??
              "Something went wrong!",
            severity: "error",
          });
        } else {
          formikHelpers.resetForm();
          setEmailValidate(false);
          setIsCodeSubmitted(false);
          setBackendCall(false);
          setAlert({
            show: true,
            message: "Employer Created successfully!!",
            severity: "success",
          });
          router.replace("/login");
        }
      } catch (e: any) {
        setBackendCall(false);
        setAlert({
          show: true,
          message: typeof e.message === "string" ? e.message : "Server Error",
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
        body: JSON.stringify({ email, userType: "employer" }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        const errorMessage = await response.json();
        setBackendCall(false);
        setAlert({
          show: true,
          message:
            typeof errorMessage?.message === "string"
              ? errorMessage?.message
              : "Something went wrong!",
          severity: "error",
        });
      } else {
        setEmailValidate(true);
        setBackendCall(false);
        setAlert({
          show: true,
          message: "OTP sent to your email!",
          severity: "success",
        });
      }
    } catch (e: any) {
      setBackendCall(false);
      setAlert({
        show: true,
        message: typeof e?.message === "string" ? e?.message : "Server Error",
        severity: "error",
      });
    }
  }, []);

  const verifyOtp = useCallback(
    async (e: MouseEvent, email: string, otpCode?: string) => {
      e.preventDefault();

      try {
        setBackendCall(false);

        const response = await fetch("/api/common/verifyOtp", {
          method: "POST",
          body: JSON.stringify({ email, otpCode, userType: "employer" }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status !== 200) {
          const errorMessage = await response.json();
          setBackendCall(false);
          setAlert({
            show: true,
            message:
              (typeof errorMessage?.message === "string" &&
                errorMessage?.message) ??
              "Something went wrong!",
            severity: "error",
          });
        } else {
          setIsCodeSubmitted(true);
          setBackendCall(false);
          setAlert({
            show: true,
            message: "Email is verified!",
            severity: "success",
          });
        }
      } catch (e: any) {
        setBackendCall(false);
        setAlert({
          show: true,
          message: typeof e?.message === "string" ? e?.message : "Server Error",
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
                      id="companyName"
                      name="companyName"
                      label="Company Name"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
                      id="companyDetails"
                      name="companyDetails"
                      maxRows={3}
                      minRows={3}
                      fullWidth
                      placeholder="Company Details"
                      multiline
                      component={TextField}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
                      fullWidth
                      id="websiteUrl"
                      name="websiteUrl"
                      label="Website URL"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <FormControl error={!!errors.location} fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Locations
                      </InputLabel>
                      <Field
                        fullWidth
                        name="location"
                        component={CustomizedSelectForFormik}
                      >
                        {locationsArray.map((item) => (
                          <MenuItem
                            sx={{ textTransform: "capitalize" }}
                            key={item}
                            value={item}
                          >
                            {item}
                          </MenuItem>
                        ))}
                      </Field>

                      <FormHelperText error={!!errors.location}>
                        {errors.location}
                      </FormHelperText>
                    </FormControl>
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
                      id="companyContactNo"
                      name="companyContactNo"
                      label="Company Contact No"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
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
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
                      fullWidth
                      id="reenterPassword"
                      name="reenterPassword"
                      label="Re-enter Password"
                      type={newConfirmPasswordVisibility ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            style={{ outline: "none", cursor: "pointer" }}
                            onClick={() =>
                              setNewConfirmPasswordVisibility(
                                !newConfirmPasswordVisibility
                              )
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
                    <FormHelperText error={!!errors.acceptTerms}>
                      {errors.acceptTerms}
                    </FormHelperText>
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

export { EmployerRegForm };
