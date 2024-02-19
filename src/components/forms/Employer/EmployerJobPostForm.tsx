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
  FormHelperText,
  Autocomplete,
  TextField as MUITextField,
  Chip,
} from "@mui/material";
import { Formik, Form, Field, FormikProps, FormikHelpers } from "formik";
import { TextField } from "formik-mui";
import * as yup from "yup";

type initialValues = {
  companyName: string;
  companyDetails: string;
  websiteUrl: string;
  location: string;
  industry: string;
  position: string;
  jobDescription: string;
  requiredQualifications: string[];
  workingHoursPerDay: Number;
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

const EmployerJobPostForm = () => {
  const industryArray = ["Industry1", "Industry2"];
  const skillsArray = ["Option 1", "Option 2", "Option 3", "Option 4"];

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
    industry: yup.string().required("Industry is required"),
    position: yup.string().required("Position is required"),
    jobDescription: yup.string().required("Job Description is required"),
    requiredQualifications: yup
      .array()
      .min(1, "Please select at least one qualification"),
    workingHoursPerDay: yup
      .number()
      .required("Working Hours Per Day is required"),
    acceptTerms: yup.boolean().oneOf([true], "Please accept the terms"),
  });

  const initialValues: initialValues = {
    companyName: "",
    companyDetails: "",
    websiteUrl: "",
    location: "",
    industry: "",
    position: "",
    jobDescription: "",
    requiredQualifications: [],
    workingHoursPerDay: 8,
    acceptTerms: false,
  };

  const handleSubmit = (
    values: initialValues,
    formikHelpers: FormikHelpers<initialValues>
  ) => {
    console.log(values);

    formikHelpers.resetForm();
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
        validationSchema={accountValidationSchemaWithEmailField}
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
                    <Field
                      fullWidth
                      id="location"
                      name="location"
                      label="Location"
                      component={TextField}
                    />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <FormControl error={!!errors.industry} fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Industry
                      </InputLabel>
                      <Field
                        fullWidth
                        name="industry"
                        component={CustomizedSelectForFormik}
                      >
                        {industryArray.map((item) => (
                          <MenuItem
                            sx={{ textTransform: "capitalize" }}
                            key={item}
                            value={item}
                          >
                            {item}
                          </MenuItem>
                        ))}
                      </Field>
                      <FormHelperText error={!!errors.industry}>
                        {errors.industry}
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
                      fullWidth
                      id="position"
                      name="position"
                      label="Position"
                      component={TextField}
                    />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
                      id="jobDescription"
                      name="jobDescription"
                      maxRows={3}
                      minRows={3}
                      fullWidth
                      placeholder="Job Description"
                      multiline
                      component={TextField}
                    />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Autocomplete
                      multiple
                      freeSolo
                      options={skillsArray}
                      value={values.requiredQualifications}
                      onChange={(event, value) => {
                        setFieldValue("requiredQualifications", value);
                      }}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            label={option}
                            {...getTagProps({ index })}
                            key={option}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <Field
                          {...params}
                          variant="outlined"
                          value={values.requiredQualifications}
                          label="Required Qualifications"
                          placeholder="+ Add Qualifications"
                          component={MUITextField}
                          name="requiredQualifications"
                          error={!!errors.requiredQualifications}
                          helperText={errors.requiredQualifications}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
                      fullWidth
                      id="workingHoursPerDay"
                      name="workingHoursPerDay"
                      label="Working Hours Per Day"
                      type="number"
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
                    <Button
                      disabled={!isValid || !dirty}
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

export { EmployerJobPostForm };
