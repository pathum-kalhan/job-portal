"use client";

import {
  Button,
  Grid,
} from "@mui/material";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { TextField } from "formik-mui";
import * as yup from "yup";

type initialValues = {
  name: string;
  linkedInProfileUrl: string;
  contactNo: string;
  email: string;
  educationalBackground: string;
  workExperience: string;
  skillsAndCertifications: string;
};

const CandidateEditProfileForm = () => {
  const phoneNumberRegex = /^07\d{8}$/;


  const accountValidationSchema = yup.object({
    name: yup.string().min(1).max(30).required("Name is required"),
    linkedInProfileUrl: yup
      .string()
      .url("Invalid URL format"),
    email: yup
      .string()
      .email("Invalid email format"),
    contactNo: yup
      .string()
      .matches(phoneNumberRegex, "Please enter a valid mobile number"),
    educationalBackground: yup.string(),
    workExperience: yup.string(),
    skillsAndCertifications: yup.string(),
  });

  const initialValues: initialValues = {
    name: "",
    linkedInProfileUrl: "",
    contactNo: "",
    email: "",
    educationalBackground: "",
    workExperience: "",
    skillsAndCertifications: "",
  };

  const handleSubmit = (
    values: initialValues,
    formikHelpers: FormikHelpers<initialValues>
  ) => {
    formikHelpers.resetForm();

    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={accountValidationSchema}
      enableReinitialize
    >
      {(formik) => {
        const { isValid, dirty, } = formik;
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
                    id="educationalBackground"
                    name="educationalBackground"
                    maxRows={3}
                    minRows={3}
                    fullWidth
                    placeholder="Educational Background"
                    multiline
                    component={TextField}
                  />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Field
                    id="workExperience"
                    name="workExperience"
                    maxRows={3}
                    minRows={3}
                    fullWidth
                    placeholder="Work Experience"
                    multiline
                    component={TextField}
                  />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Field
                    id="skillsAndCertifications"
                    name="skillsAndCertifications"
                    maxRows={3}
                    minRows={3}
                    fullWidth
                    placeholder="Skills and Certifications"
                    multiline
                    component={TextField}
                  />
                </Grid>

                <Grid item lg={"auto"}>
                  <Button
                    disabled={ !isValid || !dirty }
                    color="primary"
                    variant="contained"
                    size="large"
                    type="submit"
                  >
                    Edit Profile
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export {CandidateEditProfileForm};
