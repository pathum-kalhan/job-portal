"use client";

import {
  InputLabel,
  Grid,
  FormHelperText,
  Stack,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { RadioGroup, TextField } from "formik-mui";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { LoadingButton } from "@mui/lab";
import SnackBarComponent from "../../common/SnackBarComponent";
import { AlertType } from "../../../utils/types/general-types";

type initialData = {
  jobApplicationId: string;
  jobId: string;
  candidateId: string;
  applicationStatus: string;

  status: string;
  scheduleDate: string;
  interviewType: string;
  meetingUrl: string;
  notes: string;
};

type ScheduleInterView = {
  meetingUrl: string;
  notes: string;
  dateAndTime: string;
  interviewType: string;
};

type props = {
  getSchedule: () => void;
  handleCloseEditProfile: () => void;
  initialData: initialData;
};

const ScheduleInterviewForm = (props: props) => {
  const [interviewType, setInterviewType] = useState("");

  const [backendCall, setBackendCall] = useState(false);
  const { getSchedule, initialData, handleCloseEditProfile } = props;

  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });

  const interviewTypeArray = ["in-office", "remote"];

  const validationSchemaIfRemote = yup.object({
    dateAndTime: yup.string().required("Date And Time Type is required"),
    notes: yup.string().min(1).max(300).required("Notes are required"),
    interviewType: yup.string().required("Interview Type is required"),
    meetingUrl: yup
      .string()
      .url("Invalid URL format")
      .required("Meeting URL is required"),
  });

  const validationSchema = yup.object({
    dateAndTime: yup.string().required("Date And Time Type is required"),
    notes: yup.string().min(1).max(300).required("Notes are required"),
    interviewType: yup.string().required("Interview Type is required"),
  });

  const initialValues: ScheduleInterView = {
    interviewType: initialData?.interviewType,
    dateAndTime: initialData?.scheduleDate,
    notes: initialData?.notes,
    meetingUrl:
      initialData?.interviewType === "remote" ? initialData?.meetingUrl : null,
  };

  const handleSubmitSchedule = useCallback(
    async (
      values: ScheduleInterView,
      formikHelpers: FormikHelpers<ScheduleInterView>
    ) => {
      try {
        setBackendCall(true);
        const response = await fetch(
          "/api/employer/applications/scheduleInterview",
          {
            method: "POST",
            body: JSON.stringify({
              jobId: initialData.jobId,
              candidateId: initialData.candidateId,
              jobApplicationId: initialData.jobApplicationId,
              scheduleInfo: values,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response?.status !== 200) {
          setBackendCall(false);
          const { message } = await response.json();
          setAlert({
            show: true,
            message:
              typeof message === "string"
                ? message
                : `Interview schedule failed due to server error, please try again!`,
            severity: "error",
          });
        } else {
          const { message } = await response.json();
          setBackendCall(false);
          setAlert({
            show: true,
            message:
              typeof message === "string"
                ? message
                : `Interview scheduled successfully!`,
            severity: "success",
          });
        }
        
        setTimeout(() => {
          formikHelpers.resetForm();
          handleCloseEditProfile();
          getSchedule();
        }, 2000);
       
      } catch (error) {
        setBackendCall(false);
        setAlert({
          show: true,
          message: "Server Error",
          severity: "error",
        });
      }
    },
    [getSchedule, handleCloseEditProfile, initialData.candidateId, initialData.jobApplicationId, initialData.jobId]
  );

  return (
    <>
      <SnackBarComponent alert={alert} setAlert={setAlert} />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitSchedule}
        validationSchema={
          interviewType === "remote"
            ? validationSchemaIfRemote
            : validationSchema
        }
        enableReinitialize
      >
        {(formik) => {
          const { isValid, dirty, errors, setFieldValue, values } = formik;
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
                    <InputLabel id="demo-simple-select-label">
                      Interview type
                    </InputLabel>
                    <Field
                      component={RadioGroup}
                      name={"interviewType"}
                      onChange={(e: any, newVal: string) => {
                        setInterviewType(newVal);
                        setFieldValue("interviewType", newVal);
                      }} 
                    >
                      <Stack
                        direction="row"
                        gap={{ lg: 2, md: 2, sm: 1, xs: 1 }}
                      >
                        {interviewTypeArray.map((item) => (
                          <FormControlLabel
                            key={item}
                            value={item}
                            control={<Radio />}
                            label={item}
                          />
                        ))} 
                      </Stack>
                      <FormHelperText error={!!errors.interviewType}>
                          {`${errors.interviewType ?? ""}`}
                        </FormHelperText>
                    </Field>
                  </Grid>

                  {values.interviewType === "remote" && (
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Field
                        fullWidth
                        id="meetingUrl"
                        name="meetingUrl"
                        label="Meeting Url"
                        component={TextField}
                      />
                    </Grid>
                  )}
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <InputLabel id="demo-simple-select-label">
                      Date and Time
                    </InputLabel>
                    <Field
                      fullWidth
                      id="dateAndTime"
                      name="dateAndTime"
                      label="Date and Time"
                      type="datetime-local"
                    />
                      <FormHelperText error={!!errors.dateAndTime}>
                          {`${errors.dateAndTime ?? ""}`}
                        </FormHelperText>
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
                      id="notes"
                      name="notes"
                      maxRows={3}
                      minRows={3}
                      fullWidth
                      placeholder="Notes"
                      multiline
                      component={TextField}
                    />
                  </Grid>

                  <Grid item lg={"auto"}>
                    <LoadingButton
                      loading={backendCall}
                      disabled={
                        !isValid || !dirty
                        || initialData.status === "scheduled"
                      }
                      color="primary"
                      variant="contained"
                      size="large"
                      type="submit"
                    >
                      Create Schedule
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { ScheduleInterviewForm };
