"use client";
import {
  Button,
  Card,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import Link from "next/link";
import SnackBarComponent from "../../../../components/common/SnackBarComponent";
import { AlertType, applicationType } from "../../../../utils/types/general-types";

type props = {
  applicantInfo: applicationType;
  loadApplications: () => void;
};

function CandidatesApplicationCard(props: props) {
  const { applicantInfo, loadApplications } = props;
  const [backendCall, setBackendCall] = useState(false);
  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });
  const [applicationStatus, setApplicationStatus] = React.useState(
    applicantInfo?.applicationStatus ?? ""
  );

  const handleChangeApplicationStatus = useCallback(
    async (event: SelectChangeEvent) => {
      try {
        setBackendCall(true);
        setApplicationStatus(event.target.value);
        const response = await fetch(
          "/api/employer/applications/changeApplicationStatus",
          {
            method: "POST",
            body: JSON.stringify({
              jobId: applicantInfo.jobId,
              candidateId: applicantInfo.candidateId,
              jobApplicationId: applicantInfo._id,
              cvReviewStatus: event.target.value,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response?.status !== 200) {
          setBackendCall(false);
          setApplicationStatus(applicantInfo?.applicationStatus ?? "");
          const { message } = await response.json();
          setAlert({
            show: true,
            message:
              typeof message === "string"
                ? message
                : `Application status change failed due to server error, please try again!`,
            severity: "error",
          });
        } else {
          const { message } = await response.json();
          applicantInfo.applicationStatus = event.target.value;
          setBackendCall(false);
          setAlert({
            show: true,
            message:
              typeof message === "string"
                ? message
                : `Application status changed successfully!`,
            severity: "success",
          });
        }
      } catch (error) {
        setBackendCall(false);
        setAlert({
          show: true,
          message: "Server Error",
          severity: "error",
        });
      }
    },
    [applicantInfo]
  );

  return (
    <Card sx={{ backgroundColor: "" }}>
      <SnackBarComponent alert={alert} setAlert={setAlert} />
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
                <Typography sx={{ textAlign: "left" }}>
                  <b>Required skills :</b> {applicantInfo.jobSkills}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  <b>Candidate&apos;s skills :</b>{" "}
                  {applicantInfo.candidateSkills}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  <b>Result of Quiz :</b> {applicantInfo.resultOfTheQuiz}
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
            justifyContent="flex-end"
            gap={2}
          >
            <Grid item xs={12} mt={{ lg: 0, md: 5, sm: 5, xs: 5 }}>
              <Grid
                container
                item
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                gap={2}
              >
                <Grid item lg={6} md={6} sm={10} xs={9}>
                  <FormControl disabled={backendCall} fullWidth>
                    <InputLabel>Status of the Application</InputLabel>
                    <Select
                      disabled={backendCall}
                      value={applicationStatus}
                      label="Status of the Application"
                      onChange={handleChangeApplicationStatus}
                      fullWidth
                    >
                      <MenuItem value={"shortListed"}>Shortlisted</MenuItem>
                      <MenuItem value={"received"}>Received</MenuItem>
                      <MenuItem value={"rejected"}>Rejected</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {backendCall && (
                  <Grid item>
                    <CircularProgress color="inherit" />
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item>
              <Link href={applicantInfo.candidateCVUrl ?? ""} target="_blank" style={{cursor:"pointer"}}>
                <Button
                  disabled={!applicantInfo.candidateCVUrl}
                  size="large"
                  endIcon={<DownloadIcon />}
                  variant="contained"
                  color="success"
                  sx={{ borderRadius: 2 }}
                >
                  View CV / Download
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export { CandidatesApplicationCard };
