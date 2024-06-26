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
  InputLabel,
} from "@mui/material";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { TextField } from "formik-mui";
import mongoose from "mongoose";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import * as yup from "yup";
const EmployerJobPostForm = () => {
  const jobTypeArray = ["hybrid", "remote", "dynamic", "flexible"];
  const [skillsArray, setSkillsArray] = useState([]);
  const [industryArray, setIndustryArray] = useState([]);

  const { data: session, status } = useSession();

  const [backendCall, setBackendCall] = useState(false);
  const [quizData, setQuizData] = useState([]);

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
    jobExpirationDate: yup.string().required("Job expiration date is required"),
    jobType: yup.string().required("Job type is required"),
    position: yup.string().required("Position is required"),
    jobDescription: yup.string().required("Job Description is required"),
    requiredQualifications: yup
      .array()
      .min(
        1,
        "Please select at least one qualification (Hit Enter key on the keyboard if you already typed)"
      ),
    questions: yup
      .array()
      .min(
        1,
        "Please select at least one question (Hit Enter key on the keyboard if you already typed)"
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
    jobType: "",
    position: "",
    jobDescription: "",
    requiredQualifications: [],
    questions: [],
    workingHoursPerDay: 8,
    acceptTerms: false,
    jobExpirationDate: "",
  };

  const getAllSkillsAndIndustries = useCallback(async () => {
    try {
      setBackendCall(true);
      const response = await fetch("/api/candidate/getAllSkillsAndIndustries", {
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
      setSkillsArray(data?.data?.skills);
      setIndustryArray(data?.data?.industries);
      setBackendCall(false);
    } catch (error) {
      console.log("error", error);
    }
    // @ts-ignore
  }, [session?.user?.role]);

  const handleSubmit = useCallback(
    async (values: companyInfo, formikHelpers: FormikHelpers<companyInfo>) => {
      setBackendCall(true);

      const getQuestionsIds = quizData
        ?.filter((item) => values?.questions?.includes(item?.question))
        .map((item) => ({ question: item?.id }));

      const payLoad = {
        companyDetails: values.companyDetails,
        websiteUrl: values.websiteUrl,
        location: values.location,
        industry: values.industry,
        position: values.position,
        jobDescription: values.jobDescription,
        requiredQualifications: values.requiredQualifications,
        questionsSet: getQuestionsIds,
        workingHoursPerDay: values.workingHoursPerDay,
        jobExpirationDate: values.jobExpirationDate,
        jobType: values.jobType,
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
          await getAllSkillsAndIndustries();
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

    [getAllSkillsAndIndustries, quizData]
  );

  const getAllQuestions = useCallback(async () => {
    setBackendCall(true);
    try {
      const payload = {
        email: session?.user?.email,
      };

      const response = await fetch("/api/employer/getAllQuestions", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.status !== 200) {
        setBackendCall(false);
      } else {
        const data = await response.json();
        setQuizData(data.data);
        setBackendCall(false);
      }
    } catch (error) {
      setBackendCall(false);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    getAllSkillsAndIndustries();
    getAllQuestions();
  }, [getAllQuestions, getAllSkillsAndIndustries]);

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
                        freeSolo
                        disabled={backendCall}
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
                            onKeyDown={(event) => {
                              // Handle pressing Enter key
                              if (
                                event.key === "Enter" &&
                                event.target.value.trim() !== ""
                              ) {
                                // Prevent the default behavior of the Enter key
                                event.preventDefault();
                                // Add the custom value as an option
                                const newValue = event.target.value.trim();
                                if (!industryArray.includes(newValue)) {
                                  setFieldValue("industry", newValue);
                                }
                              }
                            }}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Autocomplete
                        disabled={backendCall}
                        options={jobTypeArray}
                        value={values.jobType}
                        onChange={(event, value) => {
                          setFieldValue("jobType", value);
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
                            value={values.jobType}
                            label="Job Type"
                            placeholder="Job Type"
                            component={MUITextField}
                            name="jobType"
                            error={!!errors.jobType}
                            helperText={errors.jobType}
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
                      <InputLabel id="jobExpirationDateLabel">
                        Job Expiration Date
                      </InputLabel>
                      <Field
                        disabled={backendCall}
                        id="jobExpirationDate"
                        name="jobExpirationDate"
                        type="date"
                      />
                      <FormHelperText style={{ color: "red" }}>
                        {errors.jobExpirationDate}
                      </FormHelperText>
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
                      <Autocomplete
                        disabled={backendCall}
                        multiple
                        options={quizData.map((item) => item.question)}
                        value={values.questions}
                        onChange={(event, value) => {
                          setFieldValue("questions", value);
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
                            value={values.questions}
                            label="Questions"
                            placeholder="+ Add questions"
                            component={MUITextField}
                            name="questions"
                            error={!!errors.questions}
                            helperText={errors.questions}
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
