import React from "react";
import {
  Dialog,
  Card,
  CardHeader,
  CardContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ScheduleInterviewForm } from "../forms/Employer/ScheduleInterviewForm";
 
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

type props = {
  openInterviewSchedule: boolean;
  handleCloseInterviewSchedule: () => void;
  getSchedule: () => void;
  initialData: initialData;
  userRole?: string;
};

function ScheduleInterviewDialogBox(props: props) {
  const {
    openInterviewSchedule,
    handleCloseInterviewSchedule,
    getSchedule,
    initialData,
    userRole,
  } = props;
  return (
    <Dialog
      fullScreen={false}
      fullWidth
      maxWidth="sm"
      open={openInterviewSchedule}
      onClose={handleCloseInterviewSchedule}
    >
      <Card
        sx={{ padding: { lg: "2rem", md: "2rem", sm: "2rem", xs: "1rem" } }}
      >
        <CardHeader
          action={
            <IconButton onClick={handleCloseInterviewSchedule} autoFocus>
              <CloseIcon fontSize="large" sx={{ color: "black" }} />
            </IconButton>
          }
          title="Create a interview schedule"
          sx={{ textAlign: "center" }}
        />
        <CardContent sx={{ maxHeight: "20rem", overflowY: "auto" }}> 
          <ScheduleInterviewForm
          getSchedule={getSchedule}
          initialData={initialData}
            handleCloseEditProfile={handleCloseInterviewSchedule}
          />
        </CardContent>
      </Card>
    </Dialog>
  );
}

export { ScheduleInterviewDialogBox };
