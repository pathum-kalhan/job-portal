"use client";
import React, { useState, useCallback } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, CircularProgress, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useDropzone } from "react-dropzone";
import { ChangePassword } from "../../../../components/forms/ChangePassword";
import { LoadingButton } from "@mui/lab";
import { useSession } from "next-auth/react";
import SnackBarComponent from "../../../../components/common/SnackBarComponent";
import { AlertType, profileData } from "../../../../utils/types/genaral-types";
import { splitString } from "../../../../utils/splitString";

type props = {
  handleClickOpenEditProfile: () => void;
  profileData: profileData | null;
  backendCall: boolean;
  getProfileData: () => void;
};

function EmployerProfileInfoCard(props: props) {
  const {
    handleClickOpenEditProfile,
    profileData,
    backendCall,
    getProfileData,
  } = props;
  const { data: session } = useSession();
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [profilePicBackendCall, setProfilePicBackendCall] = useState(false);

  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });

  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const fileExtension = acceptedFiles[0]?.name.split(".")[1];

      try {
        if (
          !(
            fileExtension === "jpg" ||
            fileExtension === "jpeg" ||
            fileExtension === "png" ||
            fileExtension === "svg"
          )
        ) {
          setAlert({
            show: true,
            message:
              "Please upload a supported picture Type (jpg ,jpeg ,png ,svg)",
            severity: "error",
          });
          return;
        } else if (acceptedFiles[0]?.size > 3599999) {
          setAlert({
            show: true,
            message: `Please upload a picture smaller than 3MB, Uploaded File is ${(
              acceptedFiles[0]?.size / 1000000
            ).toFixed(3)}MB`,
            severity: "error",
          });

          return;
        }
        setProfilePicBackendCall(true);
        const file = acceptedFiles[0];

        const imageBlob = new Image();
        imageBlob.src = URL.createObjectURL(file);
        imageBlob.onload = async () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          const maxWidth = 800;
          const maxHeight = 800;

          let width = imageBlob.width;
          let height = imageBlob.height;

          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }

          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }

          canvas.width = width;
          canvas.height = height;

          context?.drawImage(imageBlob, 0, 0, width, height);

          canvas.toBlob(
            async (blob) => {
              const formData = new FormData();
              formData.append("image", blob as Blob);
              formData.append("fileName", file.name as string);
              // @ts-ignore
              formData.append("userRole", session?.user?.role as string);
              formData.append("fileLastModified", file.lastModified as any);

              const response = await fetch("/api/uploadProfilePic", {
                method: "POST",
                body: formData,
              });

              if (response.status !== 200) {
                setProfilePicBackendCall(false);

                const { message } = await response.json();
                setAlert({
                  show: true,
                  message:
                    typeof message === "string"
                      ? message
                      : "Profile pic upload failed due to server error, please try again!",
                  severity: "error",
                });
              } else {
                setProfilePicBackendCall(false);

                setAlert({
                  show: true,
                  message: "Profile pic updated!",
                  severity: "success",
                });
                getProfileData();
              }
            },
            "image/jpeg",
            0.8
          ); //image format and quality
        };
      } catch (error) {
        setProfilePicBackendCall(false);

        setAlert({
          show: true,
          message: "Server Error",
          severity: "error",
        });
      }
    },
    // @ts-ignore
    [getProfileData, session?.user?.role]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
  });

  const handleOpenChangePassword = () => {
    setOpenChangePassword(true);
  };

  return (
    <>
      <SnackBarComponent alert={alert} setAlert={setAlert} />
      <Card
        sx={{
          width: {
            lg: 300,
            md: 300,
            sm: 500,
            xs: 350,
          },
          pb: 1,
        }}
      >
        <input {...getInputProps()} />
        <CardContent sx={{ maxHeight: 410, minHeight: 410 }}>
          <Stack gap={1}>
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
              mb={3}
            >
              {profilePicBackendCall ? (
                <CircularProgress />
              ) : (
                <Avatar
                  src={profileData?.profilePic?.image}
                  sx={{ bgcolor: "red" }}
                  aria-label="recipe"
                >
                  {!profileData?.profilePic?.status &&
                    session?.user?.name?.split("")[0]}
                </Avatar>
              )}

              <Button
                variant="text"
                disabled={profilePicBackendCall}
                style={{
                  pointerEvents: profilePicBackendCall ? "none" : "auto",
                }}
                {...getRootProps()}
                className={`dropzone ${isDragActive ? "active" : ""}`}
              >
                Change
              </Button>

              <LoadingButton
                disabled={!profileData?.email}
                loading={!profileData?.email}
                startIcon={<EditIcon />}
                size="small"
                variant="contained"
                sx={{ textTransform: "capitalize" }}
                onClick={handleClickOpenEditProfile}
              >
                Edit Profile
              </LoadingButton>
            </Stack>
            {!backendCall && profileData ? (
              <>
                <Typography variant="body2" color="text.secondary">
                  {" "}
                  Company Name: <b>
                     {profileData && splitString(profileData?.name, 14)}
                  </b>{" "}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {" "}
                  Company Email: <b>{profileData && splitString(profileData?.email, 28)}</b>{" "}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {" "}
                  {/* @ts-ignore */}
                  User Type: <b>{profileData && splitString(profileData?.userType, 14)}</b>{" "}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {" "}
                  Company Contact No:{" "}
                  <b>{profileData && profileData?.contactNo}</b>{" "}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {" "}
                  Company Details:{" "}
                  <b>{profileData && splitString(profileData?.companyDetails, 28)}</b>{" "}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {" "}
                  Company Website URL:{" "}
                  <b>{profileData && splitString(profileData?.websiteUrl, 14)}</b>{" "}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {" "}
                  Location: <b>{profileData && splitString(profileData?.location, 28)}</b>{" "}
                </Typography>
              </>
            ) : (
              <Stack alignItems="center" justifyContent="center">
                <CircularProgress />
              </Stack>
            )}
          </Stack>
        </CardContent>
        <Stack
          gap={1}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <CardActions>
            <Button
              onClick={handleOpenChangePassword}
              size="small"
              sx={{ textTransform: "capitalize", textAlign: "center" }}
              fullWidth
            >
              Change Password or Reset Password
            </Button>
          </CardActions>
        </Stack>
      </Card>
      <ChangePassword
        open={openChangePassword}
        onClose={handleCloseChangePassword}
      />
    </>
  );
}

export { EmployerProfileInfoCard };
