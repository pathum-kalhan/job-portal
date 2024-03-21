"use client";
import {
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useCallback, useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { LoadingButton } from "@mui/lab";
import SnackBarComponent from "../../../components/common/SnackBarComponent";
import { EditJobDialogBox } from "../../../components/dialogBoxes/Job/EditJobDialogBox";

type props = {
  saveJobOption?: boolean;
  loadCreatedJobs: () => void;
  companyInfo: {
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
};

type AlertType = {
  show: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
};

function EmployerJobListCard(props: props) {
  const { saveJobOption = false, companyInfo, loadCreatedJobs } = props;

  const [openEditProfile, setOpenEditProfile] = useState(false);

  const [bookMarkIcon, setBookMark] = useState(false);
  const [viewMoreJobInfo, setViewMoreJobInfo] = useState(false);
  const [backendCall, setBackendCall] = useState(false);
  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });

  const handleCloseEditProfile = () => {
    setOpenEditProfile(false);
  };

  const handleOpenEditProfile = () => {
    setOpenEditProfile(true);
  };

  const deleteJob = useCallback(async () => {
    try {
      setBackendCall(true);

      const response = await fetch("/api/employer/job/deleteJob", {
        method: "DELETE",
        body: JSON.stringify({
          jobId: companyInfo._id,
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
              : "Job deletion failed due to server error, please try again!",
          severity: "error",
        });
      } else {
        setBackendCall(false);
        loadCreatedJobs();
        setAlert({
          show: true,
          message: "Job deleted successfully!",
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
  }, [companyInfo._id, loadCreatedJobs]);

  return (
    <Card sx={{ backgroundColor: "" }}>
      <EditJobDialogBox
        initialValues={companyInfo}
        loadCreatedJobs={loadCreatedJobs}
        openEditProfile={openEditProfile}
        handleCloseEditProfile={handleCloseEditProfile}
      />
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
                  <b>Position :</b> {!companyInfo ? "" : companyInfo.position}
                </Typography>

                <Typography sx={{ textAlign: "left" }}>
                  <b>Company Name :</b>{" "}
                  {!companyInfo ? "" : companyInfo.companyName}
                </Typography>

                {viewMoreJobInfo && (
                  <>
                    {" "}
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Company Details :</b>{" "}
                      {!companyInfo ? "" : companyInfo.companyDetails}
                    </Typography>
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Company website :</b>{" "}
                      {!companyInfo ? "" : companyInfo?.websiteUrl}
                    </Typography>
                  </>
                )}

                <Typography sx={{ textAlign: "left" }}>
                  <b>Location :</b> {!companyInfo ? "" : companyInfo.location}
                </Typography>

                {viewMoreJobInfo && (
                  <>
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Industry :</b>{" "}
                      {!companyInfo ? "" : companyInfo.industry}
                    </Typography>
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Job description :</b>{" "}
                      {!companyInfo ? "" : companyInfo.jobDescription}
                    </Typography>
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Required Qualifications :</b>{" "}
                      {!companyInfo
                        ? ""
                        : companyInfo.requiredQualifications.map((item, i) =>
                            i === companyInfo.requiredQualifications.length - 1
                              ? item
                              : `${item}, `
                          )}
                    </Typography>
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Working Hours Per Day :</b>{" "}
                      {!companyInfo ? "" : companyInfo.workingHoursPerDay}
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
                  <IconButton onClick={() => setBookMark(!bookMarkIcon)}>
                    {bookMarkIcon ? (
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
              <Button
                disabled={backendCall}
                size="large"
                endIcon={<EditIcon />}
                variant={"contained"}
                sx={{ borderRadius: 2, textTransform: "capitalize" }}
                onClick={handleOpenEditProfile}
              >
                Edit Job
              </Button>
            </Grid>

            <Grid item>
              <LoadingButton
                loading={backendCall}
                onClick={deleteJob}
                endIcon={<DeleteForeverIcon />}
                size="large"
                color="error"
                variant="contained"
                sx={{ borderRadius: 2 }}
              >
                Delete Job
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Card>
  );
}

export { EmployerJobListCard };
