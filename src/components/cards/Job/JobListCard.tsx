"use client";
import {
  Button,
  Card,
  Grid,
  IconButton,
  SelectChangeEvent,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Link from "next/link";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

type props = {
  saveJobOption?: boolean;
  companyInfo: {
    companyName: string,
    companyDetails: string,
    companyWebsite: string,
    location: string,
    industry: string,
    position: string,
    jobDescription: string,
    requiredQualifications: string,
    workingHoursPerDay: string,
    jobRole: string,
  }
}

function JobListCard(props: props) {
  
  const { saveJobOption = false, companyInfo } = props

  const [bookMarkIcon, setBookMark] = React.useState(false);
  const [viewMoreJobInfo, setViewMoreJobInfo] = React.useState(false);
  const [applicationStatus, setApplicationStatus] = React.useState("");
 

  const handleChangeApplicationStatus = (event: SelectChangeEvent) => {
    setApplicationStatus(event.target.value as string);
  };

  return (
    <Card sx={{ backgroundColor: "" }}>
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
                  <b>Company Name :</b> {!companyInfo ? "" :companyInfo.companyName}
                </Typography>

                {viewMoreJobInfo && (
                  <>
                    {" "}
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Company Details :</b> {!companyInfo ? "" :companyInfo.companyDetails}
                    </Typography>
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Company website :</b> {!companyInfo ? "" :companyInfo.companyWebsite}
                    </Typography>
                  </>
                )}

                <Typography sx={{ textAlign: "left" }}>
                  <b>Location :</b> {!companyInfo ? "" :companyInfo.location}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  <b>Industry :</b> {!companyInfo ? "" :companyInfo.industry}
                </Typography>

                {viewMoreJobInfo && (
                  <>
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Position :</b> {!companyInfo ? "" :companyInfo.position}
                    </Typography>
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Job description :</b> {!companyInfo ? "" :companyInfo.jobDescription}
                    </Typography>
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Required Qualifications :</b>{" "}
                      {!companyInfo ? "" :companyInfo.requiredQualifications}
                    </Typography>
                    <Typography sx={{ textAlign: "left" }}>
                      <b>Working Hours Per Day :</b>{" "}
                      {!companyInfo ? "" :companyInfo.workingHoursPerDay}
                    </Typography>
                  </>
                )}

                <Typography sx={{ textAlign: "left" }}>
                  <b>Job Role :</b> {!companyInfo ? "" :companyInfo.jobRole}
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
            justifyContent={{md:"flex-end", sm:"center", xs:"center"}}
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

           {saveJobOption&& <Grid
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
            </Grid>}
          </Grid>
        </Grid>
      </Grid>

      {viewMoreJobInfo && <Grid container pb={3} xs={12}>
        <Grid
          container
          item
          alignItems="center"
          justifyContent="center"
          gap={{ md: 20, sm: 3, xs: 3 }}
        >
          <Grid item>
            <Link href="#" target="_blank">
              <Button
                size="large"
                endIcon={<OpenInNewIcon />}
                variant={"contained"}
                sx={{ borderRadius: 2, textTransform: "capitalize" }}
                onClick={() => console.log("test")}
              >
                Company LinkedIn Profile
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
      </Grid>}
    </Card>
  );
}

export { JobListCard };
