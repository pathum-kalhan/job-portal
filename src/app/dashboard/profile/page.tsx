"use client";
import React, { useCallback, useEffect, useState } from "react";
import { CandidateProfileInfoCard } from "@/components/cards/Profile/Candidate/CandidateProfileInfoCard";
import { CandidateProfileRightSideCard } from "@/components/cards/Profile/Candidate/CandidateProfileRightSideCard";
import { RightSideAttachedMenu } from "@/components/sideAttachMenu/profile/RightSideAttachedMenu";
import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Skeleton,
  Stack,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { UploadCvDialogBox } from "@/components/dialogBoxes/CV/UploadCvDialogBox";
import { UploadCvDoneDialogBox } from "@/components/dialogBoxes/CV/UploadCvDoneDialogBox";
import { EditProfileDialogBox } from "@/components/dialogBoxes/Profile/EditProfileDialogBox";
import { useSession } from "next-auth/react";
import { EmployerProfileInfoCard } from "@/components/cards/Profile/Employer/EmployerProfileInfoCard";
import { EmployerProfileRightSideCard } from "@/components/cards/Profile/Employer/EmployerProfileRightSideCard";
import { useRouter } from "next/navigation";
import SnackBarComponent from "@/components/common/SnackBarComponent";

type AlertType = {
  show: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
};

function Page() {
  const router = useRouter();

  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openUploadCv, setOpenUploadCv] = useState(false);
  const [openUploadCvDone, setOpenUploadCvDone] = useState(false);
  const [backendCall, setBackendCall] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });

  const { data: session, update, status } = useSession();

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

  const getProfileData = useCallback(async () => {
    try {
      setBackendCall(true);

      const response = await fetch("/api/getProfile", {
        method: "POST",
        body: JSON.stringify({
          email: session?.user?.email,
          // @ts-ignore
          userRole: session?.user?.role,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.status !== 200) {
        setBackendCall(false);
      } else {
        const data = await response.json();
        setProfileData(data.data);

        await update({ profileImage: data?.data?.profilePic?.image ?? "" });

        setBackendCall(false);
      }
    } catch (error) {
      setBackendCall(false);
      setAlert({
        show: true,
        message: "Server Error",
        severity: "error",
      });
    }
  }, [session, update]);

  useEffect(() => {
    if (status === "authenticated" && !profileData) {
      getProfileData();
    }

    if (status !== "loading" && !session) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <>
      <EditProfileDialogBox
        openEditProfile={openEditProfile}
        handleCloseEditProfile={handleCloseEditProfile}
        getProfileData={getProfileData}
        initialData={profileData}
        // @ts-ignore
        userRole={session?.user?.role}
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
            {session ? (
              <>
                {/* @ts-ignore */}
                {session?.user?.role === "candidate" ? (
                  <CandidateProfileInfoCard
                    handleClickOpenEditProfile={handleClickOpenEditProfile}
                    profileData={profileData}
                    backendCall={backendCall}
                    getProfileData={getProfileData}
                  />
                ) : // @ts-ignore
                session?.user?.role === "employer" ? (
                  <EmployerProfileInfoCard
                    handleClickOpenEditProfile={handleClickOpenEditProfile}
                    profileData={profileData}
                    backendCall={backendCall}
                    getProfileData={getProfileData}
                  />
                ) : (
                  <></>
                )}
              </>
            ) : (
              <Card>
                <CardContent
                  sx={{
                    maxHeight: 410,
                    minHeight: 410,
                    minWidth: 20,
                    width: { lg: "25vw", sm: "60vw", xs: "85vw" },
                  }}
                >
                  <Stack alignItems="center" justifyContent="center" mt={1}>
                    <CircularProgress sx={{ marginBottom: 5 }} />
                    <Skeleton
                      sx={{
                        width: "100%",
                        height: 50,
                      }}
                    ></Skeleton>
                    <Skeleton
                      sx={{
                        width: "100%",
                        height: 50,
                      }}
                    ></Skeleton>
                    <Skeleton
                      sx={{
                        width: "100%",
                        height: 50,
                      }}
                    ></Skeleton>

                    <Skeleton
                      sx={{
                        width: "100%",
                        height: 50,
                      }}
                    ></Skeleton>
                    <Skeleton
                      sx={{
                        width: "100%",
                        height: 50,
                      }}
                    ></Skeleton>
                    <Skeleton
                      sx={{
                        width: "100%",
                        height: 50,
                      }}
                    ></Skeleton>
                  </Stack>
                </CardContent>
              </Card>
            )}
          </Grid>

          <Grid item lg={"auto"} md={"auto"} sm={"auto"} xs={"auto"}>
            {/* @ts-ignore */}
            {session && session?.user?.role === "candidate" ? (
              <CandidateProfileRightSideCard
                getProfileData={getProfileData}
                profileData={profileData}
                handleClickOpenUploadCv={handleClickOpenUploadCv}
              />
            ) : // @ts-ignore
            session && session?.user?.role === "employer" ? (
              <EmployerProfileRightSideCard />
            ) : (
              <></>
            )}
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

      <SnackBarComponent alert={alert} setAlert={setAlert} />
    </>
  );
}

export default Page;
