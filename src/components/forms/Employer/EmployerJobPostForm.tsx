"use client";

import SnackBarComponent from "../../../components/common/SnackBarComponent";
import { AlertType, companyInfo } from "../../../utils/types/general-types";
import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Card,
  CardHeader,
  FormHelperText,
  Autocomplete,
  TextField as MUITextField,
  Chip,
  CircularProgress,
  Stack,
} from "@mui/material";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { TextField } from "formik-mui";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import * as yup from "yup";
 
const EmployerJobPostForm = () => {
  const industryArray = ["IT", "Health", "Education"];
  const [skillsArray, setSkillsArray] = useState([]);
  const { data: session, status } = useSession();

  const [backendCall, setBackendCall] = useState(false);
  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });

  const employerAccountValidationSchema = yup.object({
    companyName: yup
      .string()
      .min(1)
      .max(80)
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
    industry: yup
      .string()
      .required(
        "Industry is required (Hit Enter key on the keyboard if you already typed)"
      ),
    position: yup.string().required("Position is required"),
    jobDescription: yup.string().required("Job Description is required"),
    requiredQualifications: yup
      .array()
      .min(
        1,
        "Please select at least one qualification (Hit Enter key on the keyboard if you already typed)"
      ),
    workingHoursPerDay: yup
      .number()
      .required("Working Hours Per Day is required"),
    acceptTerms: yup.boolean().oneOf([true], "Please accept the terms"),
  });

  const initialValues: companyInfo = {
    companyName: session?.user?.name ?? "",
    companyDetails: "",
    // @ts-ignore
    websiteUrl: session?.user?.webUrl ?? "",
    location: "",
    industry: "",
    position: "",
    jobDescription: "",
    requiredQualifications: [],
    workingHoursPerDay: 8,
    acceptTerms: false,
  };

  const handleSubmit = useCallback(
    async (
      values: companyInfo,
      formikHelpers: FormikHelpers<companyInfo>
    ) => {
      setBackendCall(true);
      const payLoad = {
        companyDetails: values.companyDetails,
        websiteUrl: values.websiteUrl,
        location: values.location,
        industry: values.industry,
        position: values.position,
        jobDescription: values.jobDescription,
        requiredQualifications: values.requiredQualifications,
        workingHoursPerDay: values.workingHoursPerDay,
      };

      try {
        const response = await fetch("/api/employer/job/createJob", {
          method: "POST",
          body: JSON.stringify(payLoad),
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
          setBackendCall(false);
          setAlert({
            show: true,
            message: "Job Created successfully!!",
            severity: "success",
          });
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

    []
  );

  const getSkills = useCallback(async () => {
    try {
      const response = await fetch("/api/candidate/getAllSkills", {
        method: "POST",
        body: JSON.stringify({
          // @ts-ignore
          userRole: session?.user?.role,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setSkillsArray(data.data);
    } catch (error) {
 
    }
    // @ts-ignore
  }, [session?.user?.role]);

  useEffect(() => {
    getSkills();
  }, [getSkills]);

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
      <SnackBarComponent alert={alert} setAlert={setAlert} />

      <CardHeader title="Post a job" align="center" />

      {status === "authenticated" ? (
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={employerAccountValidationSchema}
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
                        disabled
                        fullWidth
                        id="companyName"
                        name="companyName"
                        label="Company Name"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Field
                        disabled={backendCall}
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
                        disabled={backendCall}
                        fullWidth
                        id="websiteUrl"
                        name="websiteUrl"
                        label="Website URL"
                        component={TextField}
                      />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Field
                        disabled={backendCall}
                        fullWidth
                        id="location"
                        name="location"
                        label="Location"
                        component={TextField}
                      />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Autocomplete
                        disabled={backendCall}
                        freeSolo
                        options={industryArray}
                        value={values.industry}
                        onChange={(event, value) => {
                          setFieldValue("industry", value);
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
                            value={values.industry}
                            label="Industry (You need to hit ENTER key if you are adding a custom  industry)"
                            placeholder="+ Add Industry"
                            component={MUITextField}
                            name="industry"
                            error={!!errors.industry}
                            helperText={errors.industry}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Field
                        disabled={backendCall}
                        fullWidth
                        id="position"
                        name="position"
                        label="Position"
                        component={TextField}
                      />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Field
                        disabled={backendCall}
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
                        disabled={backendCall}
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
                            label="Required Qualifications (You need to hit ENTER key if you are adding a custom qualification)"
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
                        disabled={backendCall}
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
                        disabled={backendCall}
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
                        disabled={!isValid || !dirty}
                        color="primary"
                        variant="contained"
                        size="large"
                        type="submit"
                      >
                        Create Job
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      ) : (
        <Stack alignItems="center" justifyContent="center">
          <CircularProgress />
        </Stack>
      )}
    </Card>
  );
};

export { EmployerJobPostForm };
