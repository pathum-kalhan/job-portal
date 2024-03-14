"use client";

import SnackBarComponent from "../../../components/common/SnackBarComponent";
import { LoadingButton } from "@mui/lab";
import {
  Grid,
  Card,
  CardHeader,
  Dialog,
  Autocomplete,
  TextField as MUITextField,
  Chip,
  IconButton,
  CardContent,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import { useCallback, useState } from "react";
import * as yup from "yup";

import React from "react";
import CloseIcon from "@mui/icons-material/Close";

type initialValues = {
  _id: string;
  websiteUrl: string;
  companyName: string;
  companyDetails: string;
  location: string;
  industry: string;
  position: string;
  jobDescription: string;
  requiredQualifications: string[];
  workingHoursPerDay: number;
  jobRole: string;
};

type props = {
  openEditProfile: boolean;
  handleCloseEditProfile: () => void;
  initialValues: initialValues;
  loadCreatedJobs: () => void;
};

type AlertType = {
  show: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
};

function EditJobDialogBox(props: props) {
  const {
    openEditProfile,
    handleCloseEditProfile,
    initialValues,
    loadCreatedJobs,
  } = props;

  const industryArray = ["Industry1", "Industry2"];
  const skillsArray = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const [backendCall, setBackendCall] = useState(false);
  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });

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
  });

  const handleSubmit = useCallback(
    async (values: initialValues) => {
      setBackendCall(true);
      const payLoad = {
        companyDetails: values?.companyDetails,
        websiteUrl: values?.websiteUrl,
        location: values?.location,
        industry: values?.industry,
        position: values?.position,
        jobDescription: values?.jobDescription,
        requiredQualifications: values?.requiredQualifications,
        workingHoursPerDay: values?.workingHoursPerDay,
        jobId: initialValues?._id,
      };

      try {
        const response = await fetch("/api/employer/job/updateJob", {
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
          setBackendCall(false);
          loadCreatedJobs();

          setAlert({
            show: true,
            message: "Job updated successfully!",
            severity: "success",
          });
          setTimeout(() => {
            handleCloseEditProfile();
          }, 2010);
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

    [handleCloseEditProfile, initialValues?._id, loadCreatedJobs]
  );

  return (
    <Dialog
      fullScreen={false}
      fullWidth
      maxWidth="sm"
      open={openEditProfile}
      onClose={handleCloseEditProfile}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: {
            lg: "50vw",
            md: "70vw",
            sm: "70vw",
            xs: "85vw",
          },
        }}
        elevation={3}
      >
        <SnackBarComponent autoHideDuration={2000} alert={alert} setAlert={setAlert} />

        <CardHeader
          action={
            <IconButton onClick={handleCloseEditProfile} autoFocus>
              <CloseIcon fontSize="large" sx={{ color: "black" }} />
            </IconButton>
          }
          sx={{ textAlign: "center" }}
          title="Post a job"
          align="center"
        />
        <CardContent sx={{ maxHeight: "20rem", overflowY: "auto" }}>
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
                      <Grid item lg={"auto"}>
                        <LoadingButton
                          loading={backendCall}
                          disabled={!isValid || !dirty}
                          color="primary"
                          variant="contained"
                          size="large"
                          type="submit"
                        >
                          Update Job
                        </LoadingButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </CardContent>
      </Card>
    </Dialog>
  );
}

export { EditJobDialogBox };
