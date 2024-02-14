"use client";

import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import { Formik, Form, Field, FormikProps, FormikHelpers } from "formik";
import { TextField } from "formik-mui";
import { useState } from "react";
import * as yup from "yup";

type initialValues = {
  companyName: string;
  companyDetails: string;
  location: string;
  email: string;
  companyContactNo: string;
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

const EmployerEditProfileForm = () => {
  const locationsArray = ["colombo", "kandy"];
  const phoneNumberRegex = /^07\d{8}$/;

  const accountValidationSchema = yup.object({
    companyName: yup
      .string()
      .min(1)
      .max(30)
      .required("Company Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    companyContactNo: yup
      .string()
      .matches(phoneNumberRegex, "Please enter a valid mobile number")
      .required("Company Contact No is required"),
    companyDetails: yup
      .string()
      .min(1)
      .max(300)
      .required("Company Details are required"),
    location: yup.string().required("Location is required"),
  });

  const initialValues: initialValues = {
    companyName: "",
    companyDetails: "",
    location: "",
    email: "",
    companyContactNo: "",
  };

  const handleSubmit = (
    values: initialValues,
    formikHelpers: FormikHelpers<initialValues>
  ) => {
    console.log(values);

    formikHelpers.resetForm();
  };

  return ( 
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={accountValidationSchema}
        enableReinitialize
      >
        {(formik) => {
          const { isValid, dirty } = formik;
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
                      id="companyContactNo"
                      name="companyContactNo"
                      label="Company Contact No"
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
                      Create Account
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

export default EmployerEditProfileForm;
