"use client";

import {
  Button,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardHeader,
} from "@mui/material";
import { Formik, Form, Field, FormikProps, FormikHelpers } from "formik";
import { TextField } from "formik-mui";
import { useState } from "react";
import * as yup from "yup";

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
  const [emailValidate, setEmailValidate] = useState(false);
  const [isCodeSubmitted, setIsCodeSubmitted] = useState(false);
  const locationsArray = ["colombo", "kandy"];
  const phoneNumberRegex = /^07\d{8}$/;

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const accountValidationSchemaWithEmailField = yup.object({
    companyName: yup.string().min(1).max(30).required("Company Name is required"),
    companyDetails: yup.string().min(1).max(300).required("Company Details are required"),
    websiteUrl: yup
      .string()
      .url("Invalid URL format")
      .required("Website URL is required"),
    location: yup.string().required("Location is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    companyContactNo: yup.string().matches(phoneNumberRegex,"Please enter a valid mobile number").required("Company Contact No is required"),
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
    companyName: yup.string().min(1).max(30).required("Company Name is required"),
    companyDetails: yup.string().min(1).max(300).required("Company Details are required"),
    websiteUrl: yup
      .string()
      .url("Invalid URL format")
      .required("Website URL is required"),
    location: yup.string().required("Location is required"),
    verificationCode: yup.string().required("Verification Code is required"),
    companyContactNo: yup.string().matches(phoneNumberRegex,"Please enter a valid mobile number").required("Company Contact No is required"),
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

  const handleSubmit = (
    values: initialValues,
    formikHelpers: FormikHelpers<initialValues>
  ) => {
    formikHelpers.resetForm();
    setEmailValidate(false);
    setIsCodeSubmitted(false);

    console.log(values);
  };

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
          const {
            isValid,
            dirty,
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            setFieldValue,
          } = formik;
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
                    <FormControl fullWidth>
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
                        <Button
                          disabled={values.email === ""}
                          color="success"
                          variant="contained"
                          fullWidth
                          onClick={() => setEmailValidate(true)}
                        >
                          Verify
                        </Button>
                      </Grid>
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
                        <Button
                          disabled={
                            isCodeSubmitted || values.verificationCode === ""
                          }
                          color="success"
                          variant="contained"
                          fullWidth
                          onClick={() => setIsCodeSubmitted(true)}
                        >
                          Submit
                        </Button>
                      </Grid>
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
                            console.log("val", newValue);
                            setFieldValue("acceptTerms", newValue);
                          }}
                        />
                      }
                      label="Accept terms and conditions"
                    />
                    {errors.acceptTerms && touched.acceptTerms && (
                      <div>{JSON.stringify(errors)}</div>
                    )}
                  </Grid>

                  <Grid item lg={"auto"}>
                    <Button
                      disabled={
                        !isCodeSubmitted || !emailValidate || !isValid || !dirty
                      }
                      color="primary"
                      variant="contained"
                      size="large"
                      type="submit"
                    >
                      Create Account
                    </Button>
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
