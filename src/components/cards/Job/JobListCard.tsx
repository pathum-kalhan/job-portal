"use client";
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  SelectChangeEvent,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Link from "next/link";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SnackBarComponent from "@/components/common/SnackBarComponent";

type props = {
  saveJobOption?: boolean;
  loadJobs: () => void;
  allAreSavedJobs?: boolean;
  jobPostInfo: {
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
    savedJob: boolean;
  };
};

type AlertType = {
  show: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
};

function JobListCard(props: props) {
  const { saveJobOption = false, allAreSavedJobs= false, jobPostInfo, loadJobs } = props;

  const [bookMarkIcon, setBookMark] = useState(allAreSavedJobs || jobPostInfo?.savedJob);
  const [viewMoreJobInfo, setViewMoreJobInfo] = useState(false);
  const [backendCall, setBackendCall] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState("");
  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });

  const saveJob = useCallback(async () => {
    try {
      setBackendCall(true);

      const response = await fetch("/api/candidate/job/saveJob", {
        method: "POST",
        body: JSON.stringify({
          jobIdToAdd: jobPostInfo._id,
          saveStatus: !bookMarkIcon === false ? "remove" : "add",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.status !== 200) {
        setBackendCall(false);
        const { message } = await response.json();
        setAlert({
          show: true,
          message:
            typeof message === "string"
              ? message
              : `Job ${
                  !bookMarkIcon === false ? "remove" : "save"
                } failed due to server error, please try again!`,
          severity: "error",
        });
      } else {
        const { message } = await response.json();
        setBookMark(!bookMarkIcon);
        setBackendCall(false);
        if (allAreSavedJobs) {
          loadJobs()
        }
        setAlert({
          show: true,
          message:
            typeof message === "string"
              ? message
              : `Job ${bookMarkIcon ? "remove" : "save"} successfully!`,
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
  }, [allAreSavedJobs, bookMarkIcon, jobPostInfo._id, loadJobs]);

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
                  <b>Company Name :</b>{" "}
                  {!jobPostInfo ? "" : jobPostInfo.companyName}
                </Typography>

                {viewMoreJobInfo && (
                  <>
                    {" "}
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Company Details :</b>{" "}
                      {!jobPostInfo ? "" : jobPostInfo.companyDetails}
                    </Typography>
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Company website :</b>{" "}
                      {!jobPostInfo ? "" : jobPostInfo?.websiteUrl}
                    </Typography>
                  </>
                )}

                <Typography sx={{ textAlign: "left" }}>
                  <b>Location :</b> {!jobPostInfo ? "" : jobPostInfo.location}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  <b>Industry :</b> {!jobPostInfo ? "" : jobPostInfo.industry}
                </Typography>

                {viewMoreJobInfo && (
                  <>
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Position :</b>{" "}
                      {!jobPostInfo ? "" : jobPostInfo.position}
                    </Typography>
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Job description :</b>{" "}
                      {!jobPostInfo ? "" : jobPostInfo.jobDescription}
                    </Typography>
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Required Qualifications :</b>{" "}
                      {!jobPostInfo ? "" : jobPostInfo.requiredQualifications}
                    </Typography>
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Working Hours Per Day :</b>{" "}
                      {!jobPostInfo ? "" : jobPostInfo.workingHoursPerDay}
                    </Typography>
                  </>
                )}
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
            <Grid item xs={"auto"}>
              <Button
                size="large"
                endIcon={
                  !viewMoreJobInfo ? <ExpandMoreIcon /> : <ExpandLessIcon />
                }
                variant={!viewMoreJobInfo ? "contained" : "outlined"}
                sx={{ borderRadius: 2 }}
                onClick={() => setViewMoreJobInfo(!viewMoreJobInfo)}
              >
                View {!viewMoreJobInfo ? "More" : "Less"}
              </Button>
            </Grid>

            {saveJobOption && (
              <Grid
                item
                xs={"auto"}
                alignItems="flex-end"
                justifyContent="flex-end"
                textAlign="end"
              >
                <Tooltip
                  title={
                    bookMarkIcon ? "Remove the job from save" : "Save the job"
                  }
                >
                  <IconButton onClick={saveJob}>
                    {backendCall ? (
                      <CircularProgress size={20} sx={{ color: "black" }} />
                    ) : bookMarkIcon ? (
                      <BookmarkIcon sx={{ color: "black" }} />
                    ) : (
                      <BookmarkBorderIcon sx={{ color: "black" }} />
                    )}
                  </IconButton>
                </Tooltip>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      {viewMoreJobInfo && (
        <Grid container pb={3} xs={12}>
          <Grid
            container
            item
            alignItems="center"
            justifyContent="center"
            gap={{ md: 20, sm: 3, xs: 3 }}
          >
            <Grid item>
              <Link href={jobPostInfo?.websiteUrl} target="_blank">
                <Button
                  size="large"
                  endIcon={<OpenInNewIcon />}
                  variant={"contained"}
                  sx={{ borderRadius: 2, textTransform: "capitalize" }}
                  onClick={() => console.log("test")}
                >
                  Company Url
                </Button>
              </Link>
            </Grid>

            <Grid item>
              <Button
                size="large"
                color="success"
                variant="contained"
                sx={{ borderRadius: 2 }}
              >
                APPLY
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Card>
  );
}

export { JobListCard };
