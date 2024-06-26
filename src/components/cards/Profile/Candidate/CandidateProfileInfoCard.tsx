"use client";
import { useState, useCallback } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, CircularProgress, Stack, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useDropzone } from "react-dropzone";
import { ChangePassword } from "../../../forms/ChangePassword";
import { LoadingButton } from "@mui/lab";
import { useSession } from "next-auth/react";
import SnackBarComponent from "../../../../components/common/SnackBarComponent";
import { AlertType, profileData } from "../../../../utils/types/general-types";
import { splitString } from "../../../../utils/splitString";

type props = {
  handleClickOpenEditProfile: () => void;
  profileData: profileData | null;
  backendCall: boolean;
  getProfileData: () => void;
};

function CandidateProfileInfoCard(props: props) {
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [profilePicBackendCall, setProfilePPicBackendCall] = useState(false);

  const { data: session } = useSession();

  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });

  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
  };

  const handleOpenChangePassword = () => {
    setOpenChangePassword(true);
  };

  const {
    handleClickOpenEditProfile,
    profileData,
    backendCall,
    getProfileData,
  } = props;

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
        setProfilePPicBackendCall(true);
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

              if (response?.status !== 200) {
                setProfilePPicBackendCall(false);

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
                setProfilePPicBackendCall(false);

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
        setProfilePPicBackendCall(false);

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
                onClick={() => {
                  if (profileData?.email) {
                    handleClickOpenEditProfile();
                  }
                }}
              >
                Edit Profile
              </LoadingButton>
            </Stack>
            {!backendCall && profileData ? (
              <>
                <Tooltip
                  title={profileData?.name?.length > 14 && profileData?.name}
                  placement="bottom-start"
                >
                  <Typography variant="body2" color="text.secondary">
                    {" "}
                    Name:{" "}
                    <b>
                      {" "}
                      {profileData && splitString(profileData?.name, 14)}
                    </b>{" "}
                  </Typography>
                </Tooltip>

                <Tooltip
                  title={profileData?.email?.length > 14 && profileData?.email}
                  placement="bottom-start"
                >
                  <Typography variant="body2" color="text.secondary">
                    {" "}
                    Email: <b>{splitString(profileData?.email, 14)}</b>{" "}
                  </Typography>
                </Tooltip>

                <Typography variant="body2" color="text.secondary">
                  {" "}
                  {/* @ts-ignore */}
                  User Type: <b>{profileData?.userType ?? ""}</b>{" "}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {" "}
                  Contact No: <b>{profileData?.contactNo ?? ""}</b>{" "}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {" "}
                  Date Of Birth: <b>{profileData?.dateOfBirth ?? ""}</b>{" "}
                </Typography>

                <Tooltip
                  title={
                    profileData?.education?.length > 14 &&
                    profileData?.education
                  }
                  placement="bottom-start"
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textOverflow: "ellipsis" }}
                  >
                    {" "}
                    Educational Background:{" "}
                    <b>{splitString(profileData?.education, 14) ?? ""}</b>{" "}
                  </Typography>
                </Tooltip>

                <Tooltip
                  title={
                    profileData?.experience?.length > 14 &&
                    profileData?.experience
                  }
                  placement="bottom-start"
                >
                  <Typography variant="body2" color="text.secondary">
                    {" "}
                    Work Experience:{" "}
                    <b>{splitString(profileData?.experience, 14) ?? ""}</b>{" "}
                  </Typography>
                </Tooltip>

                <Tooltip
                  title={
                    profileData?.skills?.toString().length > 28 &&
                    `${profileData?.skills.toString()}`
                  }
                  placement="bottom-start"
                >
                  <Typography variant="body2" color="text.secondary">
                    {" "}
                    Skills:{" "}
                    <b>
                      {profileData?.skills && (
                        <span>
                          {splitString(profileData?.skills.toString(), 28)}
                        </span>
                      )}
                    </b>{" "}
                  </Typography>
                </Tooltip>

                <Tooltip
                  title={
                    profileData?.linkedInProfileUrl?.length > 28 &&
                    profileData?.linkedInProfileUrl
                  }
                  placement="bottom-start"
                >
                  <Typography variant="body2" color="text.secondary">
                    {" "}
                    LinkedIn Profile URL:{" "}
                    <b>
                      {splitString(profileData?.linkedInProfileUrl, 28) ?? ""}
                    </b>{" "}
                  </Typography>
                </Tooltip>
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

export { CandidateProfileInfoCard };
