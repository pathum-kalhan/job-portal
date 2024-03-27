"use client";
import React, { useCallback, useState } from "react";
import { Button, Card, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import MessageIcon from "@mui/icons-material/Message";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  AlertType,
  applicationType,
} from "../../../../utils/types/general-types";
import { ScheduleInterviewDialogBox } from "../../../dialogBoxes/ScheduleInterviewDialogBox";
import { LoadingButton } from "@mui/lab";
import SnackBarComponent from "../../../common/SnackBarComponent";

type props = {
  applicantInfo: applicationType;
  loadApplications: () => void;
};

function EmployerInterviewScheduleCard(props: props) {
  const { applicantInfo, loadApplications } = props;
  const [sendReminderBackendCall, setSendReminderBackendCall] = useState(false);
  const [openInterviewSchedule, setOpenInterviewSchedule] = useState(false);
  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });

  const handleCloseInterviewSchedule = () => {
    setOpenInterviewSchedule(false);
  };

  const handleSendReminder = useCallback(async () => {
    try {
      setSendReminderBackendCall(true);
      const response = await fetch(
        "/api/employer/applications/sendInterviewReminder",
        {
          method: "POST",
          body: JSON.stringify({
            jobApplicationId: applicantInfo.interview.jobApplicationId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.status !== 200) {
        setSendReminderBackendCall(false);
        const { message } = await response.json();
        setAlert({
          show: true,
          message:
            typeof message === "string"
              ? message
              : `Sending interview reminder failed due to server error, please try again!`,
          severity: "error",
        });
      } else {
        const { message } = await response.json();
        setSendReminderBackendCall(false);
        setAlert({
          show: true,
          message:
            typeof message === "string"
              ? message
              : `Interview reminder sent successfully!`,
          severity: "success",
        });
      }

      setTimeout(() => {
        loadApplications();
      }, 2000);
    } catch (error) {
      setSendReminderBackendCall(false);
      setAlert({
        show: true,
        message: "Server Error",
        severity: "error",
      });
    }
  }, [applicantInfo.interview.jobApplicationId, loadApplications]);

  console.log(applicantInfo, "status");

  return (
    <Card sx={{ backgroundColor: "" }}>
      <SnackBarComponent alert={alert} setAlert={setAlert} />
      <ScheduleInterviewDialogBox
        initialData={applicantInfo.interview}
        getSchedule={loadApplications}
        handleCloseInterviewSchedule={handleCloseInterviewSchedule}
        openInterviewSchedule={openInterviewSchedule}
      />
      <Grid
        container
        alignItems="center"
        justifyContent={{ md: "space-between", sm: "center", xs: "center" }}
        p={3}
        gap={{ lg: 0, md: 0, xs: 2, sm: 2 }}
      >
        <Grid
          container
          item
          md="auto"
          gap={{ md: 10, xs: 1 }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            container
            item
            md="auto"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src="/profilepic.jpeg"
              alt="profileImage"
              width={100}
              height={100}
            />
          </Grid>

          <Grid
            container
            item
            md="auto"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item md={12}>
              <Stack direction="column">
                <Typography sx={{ textAlign: "left" }}>
                  <b>Applicant Name :</b> {applicantInfo.name}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  <b>Date of Birth :</b> {applicantInfo.dateOfBirth}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  <b>Email :</b> {applicantInfo.email}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  <b>Job Role :</b> {applicantInfo.jobRole}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          item
          md="auto"
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            container
            item
            alignItems="center"
            justifyContent={{ md: "flex-end", sm: "center", xs: "center" }}
            gap={2}
          >
            <Grid item>
              <Stack direction="row" gap={1}>
                <Button
                  size="large"
                  endIcon={<MessageIcon />}
                  variant="contained"
                  sx={{ borderRadius: 2 }}
                  href={`/dashboard/employer/interview-schedule/${applicantInfo.candidateId}/message`}
                >
                  Message
                </Button>
                <LoadingButton
                  disabled={applicantInfo.interview.status === "scheduled"}
                  onClick={() => setOpenInterviewSchedule(true)}
                  size="large"
                  endIcon={<CalendarMonthIcon />}
                  variant="contained"
                  sx={{ borderRadius: 2 }}
                >
                  Schedule
                </LoadingButton>
              </Stack>

              <Stack
                direction="row"
                mt={3}
                justifyContent={{ md: "flex-end", sm: "center", xs: "center" }}
                alignItems="center"
              >
                <LoadingButton
                  onClick={handleSendReminder}
                  loading={sendReminderBackendCall}
                  disabled={applicantInfo.interview.status === "not-scheduled"}
                  size="large"
                  endIcon={<CalendarMonthIcon />}
                  variant="outlined"
                  sx={{ borderRadius: 2, textTransform: "capitalize" }}
                >
                  Send a Reminder
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export { EmployerInterviewScheduleCard };
