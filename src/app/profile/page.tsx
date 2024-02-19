"use client";
import React, { useState } from "react";
import { CandidateProfileInfoCard } from "@/components/cards/Profile/Candidate/CandidateProfileInfoCard";
import { CandidateProfileRightSideCard } from "@/components/cards/Profile/Candidate/CandidateProfileRightSideCard";
import { RightSideAttachedMenu } from "@/components/sideAttachMenu/profile/RightSideAttachedMenu";
import { Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {UploadCvDialogBox} from "@/components/dialogBoxes/CV/UploadCvDialogBox";
import {UploadCvDoneDialogBox} from "@/components/dialogBoxes/CV/UploadCvDoneDialogBox";
import {EditProfileDialogBox} from "@/components/dialogBoxes/Profile/EditProfileDialogBox";
// import { EmployerProfileInfoCard } from "@/components/cards/Profile/Employer/EmployerProfileInfoCard";
// import { EmployerProfileRightSideCard } from "@/components/cards/Profile/Employer/EmployerProfileRightSideCard";

function Page() {
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openUploadCv, setOpenUploadCv] = useState(false);
  const [openUploadCvDone, setOpenUploadCvDone] = useState(false);

  // Edit profile
  const handleClickOpenEditProfile = () => {
    setOpenEditProfile(true);
  };

  const handleCloseEditProfile = () => {
    setOpenEditProfile(false);
  };

  //upload CV
  const handleClickOpenUploadCv = () => {
    setOpenUploadCv(true);
  };

  const handleClickCloseUploadCv = () => {
    setOpenUploadCv(false);
  };

  //upload Complete
  const handleClickOpenUploadCvDone = () => {
    setOpenUploadCvDone(true);
  };

  const handleClickCloseUploadCvDone = () => {
    setOpenUploadCvDone(false);
  };

  const marginSm = useMediaQuery("(max-width:600px)");

  return (
    <>
      <EditProfileDialogBox
        openEditProfile={openEditProfile}
        handleCloseEditProfile={handleCloseEditProfile}
      />

      <UploadCvDialogBox
        openUploadCv={openUploadCv}
        handleClickCloseUploadCv={handleClickCloseUploadCv}
        handleClickOpenUploadCvDone={handleClickOpenUploadCvDone}
      />

      <UploadCvDoneDialogBox
        openUploadCv={openUploadCvDone}
        handleClickCloseUploadCv={handleClickCloseUploadCvDone}
      />

      <Grid
        container
        alignContent="center"
        justifyContent={{
          lg: "space-between",
          md: "space-between",
          sm: "center",
          xs: "center",
        }}
      >
        {marginSm && (
          <Grid
            container
            item
            lg={1}
            md={1}
            sm={12}
            xs={12}
            justifyContent={{
              lg: "flex-end",
              md: "flex-end",
              sm: "center",
              xs: "center",
            }}
            mb={3}
          >
            <RightSideAttachedMenu />
          </Grid>
        )}

        <Grid
          container
          item
          lg={11}
          md={11}
          sm={11}
          xs={11}
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Grid item lg={"auto"} md={"auto"} sm={"auto"} xs={"auto"}>
            <CandidateProfileInfoCard handleClickOpenEditProfile={handleClickOpenEditProfile} />
            {/* <EmployerProfileInfoCard
              handleClickOpenEditProfile={handleClickOpenEditProfile}
            /> */}
          </Grid>

          <Grid item lg={"auto"} md={"auto"} sm={"auto"} xs={"auto"}>
            <CandidateProfileRightSideCard
              handleClickOpenUploadCv={handleClickOpenUploadCv}
            />

            {/* <EmployerProfileRightSideCard /> */}
          </Grid>
        </Grid>

        {!marginSm && (
          <Grid
            container
            item
            lg={1}
            md={1}
            sm={1}
            xs={1}
            justifyContent="flex-end"
          >
            <RightSideAttachedMenu />
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default Page;
