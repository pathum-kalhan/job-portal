"use client";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Grid,
  IconButton,
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
import SnackBarComponent from "../../../components/common/SnackBarComponent";
import { LoadingButton } from "@mui/lab";
import { AlertType, jobPostInfo } from "../../../utils/types/general-types";
import { useRouter } from "next/navigation";
import { ApplyJobCvSubmitDoneDialogBox } from "../../dialogBoxes/CV/ApplyJobCvSubmitDoneDialogBox";
import { IsDateExpired } from "../../../utils/IsDateExpired";
import { red } from "@mui/material/colors";

type props = {
  saveJobOption?: boolean;
  loadJobs: () => void;
  allAreSavedJobs?: boolean;
  alreadyApplied?: boolean;
  showJobApplicationStatus?: boolean;
  jobPostInfo: jobPostInfo;
};

function JobListCard(props: props) {
  const router = useRouter();
  const {
    saveJobOption = false,
    allAreSavedJobs = false,
    alreadyApplied = false,
    showJobApplicationStatus = false,
    jobPostInfo,
    loadJobs,
  } = props;

  const [bookMarkIcon, setBookMark] = useState(
    allAreSavedJobs || jobPostInfo?.savedJob
  );
  const [viewMoreJobInfo, setViewMoreJobInfo] = useState(false);
  const [backendCall, setBackendCall] = useState(false);
  const [backendCallJobApply, setBackendCallJobApply] = useState(false);
  const [participateTheQuiz, setParticipateTheQuiz] = useState(false);

  const dateExpired = IsDateExpired(
    `${
      jobPostInfo.jobExpirationDate
        ? jobPostInfo?.jobExpirationDate?.split("T")[0]
        : ""
    }`
  );

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
          loadJobs();
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

  const applyTheJob = useCallback(async () => {
    try {
      setBackendCallJobApply(true);

      const response = await fetch("/api/candidate/job/applyJob", {
        method: "POST",
        body: JSON.stringify({
          jobId: jobPostInfo._id,
          companyId: jobPostInfo.employer,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.status !== 200) {
        setBackendCallJobApply(false);
        const { message, cvMissing } = await response.json();
        setAlert({
          show: true,
          message:
            typeof message === "string"
              ? message
              : `Job apply failed due to server error, please try again!`,
          severity: "error",
        });

        if (cvMissing) {
          setTimeout(() => {
            router.push("/dashboard/profile");
          }, 3000);
        }
      } else {
        setBackendCallJobApply(false);
        const { message } = await response.json();
        setAlert({
          show: true,
          message:
            typeof message === "string"
              ? message
              : `You applied for the job successfully!`,
          severity: "success",
        });

        setParticipateTheQuiz(true);
        jobPostInfo.alreadyApplied = true;
      }
    } catch (error) {
      setBackendCallJobApply(false);
      setAlert({
        show: true,
        message: "Server Error",
        severity: "error",
      });
    }
  }, [jobPostInfo, router]);

  return (
    <Card sx={{ backgroundColor: "" }}>
      <SnackBarComponent alert={alert} setAlert={setAlert} />

      {(dateExpired || !jobPostInfo?.jobExpirationDate) && (
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              Exp
            </Avatar>
          }
          title="Job expired."
        />
      )}
      <ApplyJobCvSubmitDoneDialogBox
        setParticipateTheQuiz={setParticipateTheQuiz}
        openUploadCv={participateTheQuiz}
        jobId={jobPostInfo?._id}
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
                  <b>Position :</b> {!jobPostInfo ? "" : jobPostInfo?.position}
                </Typography>

                <Typography sx={{ textAlign: "left" }}>
                  <b>Company Name :</b>{" "}
                  {!jobPostInfo ? "" : jobPostInfo?.companyName}
                </Typography>

                {viewMoreJobInfo && (
                  <>
                    {" "}
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Company Details :</b>{" "}
                      {!jobPostInfo ? "" : jobPostInfo?.companyDetails}
                    </Typography>
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Company website :</b>{" "}
                      {!jobPostInfo ? "" : jobPostInfo?.websiteUrl}
                    </Typography>
                  </>
                )}

                <Typography sx={{ textAlign: "left" }}>
                  <b>Location :</b> {!jobPostInfo ? "" : jobPostInfo?.location}
                </Typography>

                {viewMoreJobInfo && (
                  <>
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Industry :</b>{" "}
                      {!jobPostInfo ? "" : jobPostInfo?.industry}
                    </Typography>
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Job Type :</b>{" "}
                      {!jobPostInfo ? "" : jobPostInfo.jobType}
                    </Typography>
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Job Expiration Date :</b>{" "}
                      {!jobPostInfo?.jobExpirationDate
                        ? ""
                        : jobPostInfo?.jobExpirationDate?.split("T")[0]}
                    </Typography>
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Job description :</b>{" "}
                      {!jobPostInfo ? "" : jobPostInfo?.jobDescription}
                    </Typography>
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Required Qualifications :</b>{" "}
                      {!jobPostInfo
                        ? ""
                        : jobPostInfo?.requiredQualifications?.map((item, i) =>
                            i ===
                            jobPostInfo?.requiredQualifications?.length - 1
                              ? item
                              : `${item}, `
                          )}
                    </Typography>
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Working Hours Per Day :</b>{" "}
                      {!jobPostInfo ? "" : jobPostInfo?.workingHoursPerDay}
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
                disabled={backendCallJobApply}
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

            {showJobApplicationStatus && (
              <Grid item xs={"auto"}>
                <Typography>
                  <b>Status:</b>
                  {jobPostInfo?.cvReviewStatus === "received"
                    ? " Application sent"
                    : jobPostInfo?.cvReviewStatus === "shortListed"
                    ? " Application short listed"
                    : jobPostInfo?.cvReviewStatus === "rejected"
                    ? " Application rejected"
                    : " Not applied"}
                </Typography>
              </Grid>
            )}

            {jobPostInfo?.jobExpirationDate &&
              !dateExpired &&
              saveJobOption && (
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
                    <IconButton
                      disabled={backendCallJobApply}
                      onClick={saveJob}
                    >
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

      {jobPostInfo?.jobExpirationDate && !dateExpired && viewMoreJobInfo && (
        <Grid container pb={3}>
          <Grid
            container
            item
            alignItems="center"
            justifyContent="center"
            gap={{ md: 20, sm: 3, xs: 3 }}
          >
            <Grid item>
              <Link href={jobPostInfo?.websiteUrl ?? ""} target="_blank">
                <Button
                  size="large"
                  endIcon={<OpenInNewIcon />}
                  variant={"contained"}
                  sx={{ borderRadius: 2, textTransform: "capitalize" }}
                >
                  Company Url
                </Button>
              </Link>
            </Grid>

            {alreadyApplied || jobPostInfo?.alreadyApplied ? (
              <Grid item>
                <Link
                  href={`/dashboard/candidate/quizzes/start?jobId=${jobPostInfo?._id}`}
                >
                  <LoadingButton
                    size="large"
                    color="success"
                    variant="contained"
                    sx={{ borderRadius: 2 }}
                  >
                    Take the Quiz
                  </LoadingButton>
                </Link>
              </Grid>
            ) : (
              <Grid item>
                <LoadingButton
                  disabled={alreadyApplied || jobPostInfo?.alreadyApplied}
                  loading={backendCallJobApply}
                  onClick={applyTheJob}
                  size="large"
                  color="success"
                  variant="contained"
                  sx={{ borderRadius: 2 }}
                >
                  APPLY
                </LoadingButton>
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </Card>
  );
}

export { JobListCard };
