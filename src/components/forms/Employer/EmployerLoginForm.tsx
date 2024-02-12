"use client";

import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Card,
  CardHeader,
  Stack,
} from "@mui/material";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { TextField } from "formik-mui";

import * as yup from "yup";


type initialValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type props = {
  handleLoginMethod: (val: string) => void
};


const EmployerLoginForm = (props:props) => {

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

  const handleSubmit = (
    values: initialValues,
    formikHelpers: FormikHelpers<initialValues>
  ) => {
    formikHelpers.resetForm();

    console.log(values);
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
      <CardHeader title="Login as a Employer" align="center" sx={{textTransform:"uppercase"}}/>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={loginValidationSchema}
        enableReinitialize
      >
        {(formik) => {
          const {
            isValid,
            dirty,
            values,
            setFieldValue,
          } = formik;
          return (
            <Form>
              <Grid container alignItems="center" justifyContent="center" mt={3}>
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
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
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
                      <Button sx={{textTransform:"capitalize"}} variant="text">Forgot Password?</Button>
                    </Grid>
                  </Grid>

                  <Grid item lg={"auto"}>
                  <Stack direction="column" gap={2}>
                    <Button
                      disabled={!isValid || !dirty}
                      color="primary"
                      variant="contained"
                      size="large"
                      type="submit"
                    >
                      Login
                    </Button>

                     <Button
                        color="primary"
                        variant="text"
                        type="submit"
                        sx={{
                          textTransform: "none",
                        }}
                        onClick={() => handleLoginMethod('candidate')}
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
    </Card>
  );
};

export default EmployerLoginForm;
