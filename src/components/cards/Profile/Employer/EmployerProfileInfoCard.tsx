//  @ts-nocheck
"use client";
import React, { useState, useCallback} from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, CircularProgress, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useDropzone } from "react-dropzone";
import { ChangePassword } from "@/components/forms/ChangePassword";
import { LoadingButton } from "@mui/lab";

type IFormData = {
  file:
    | {
        lastModified: number;
        lastModifiedDate: Date;
        name: string;
        size: number;
        type: string;
        webkitRelativePath: string;
      }
    | any;
};

type props = {
  handleClickOpenEditProfile: () => void;
  profileData: {
    name: string;
    companyDetails: string;
    location: string;
    contactNo: string;
    email: string;
    websiteUrl: string;
  } | null;
  backendCall: boolean;
};

function EmployerProfileInfoCard(props: props) {

  const { handleClickOpenEditProfile, profileData, backendCall } = props;

  const [formData, setFormData] = useState<IFormData["file"]>({ file: null });
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle dropped files here
    if (acceptedFiles[0]?.size < 3599999) {
      setFormData(acceptedFiles[0]);
    } else {
      setAlert({
        show: true,
        message: `Please upload a picture smaller than 3MB, Uploaded File is ${(
          acceptedFiles[0]?.size / 1000000
        ).toFixed(3)}MB`,
        severity: "error",
      });
      setTimeout(() => {
        setAlert({
          show: false,
          message: "",
          severity: "error",
        });
      }, 6000);
    }
  }, []);

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
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                R
              </Avatar>

              <Button
                variant="text"
                style={{ pointerEvents: backendCall ? "none" : "auto" }}
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
                    Mr. {profileData && profileData?.name}
                  </b>{" "}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {" "}
                  Company Email: <b>{profileData && profileData?.email}</b>{" "}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {" "}
                  User Type: <b>{profileData && profileData?.userType}</b>{" "}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {" "}
                  Company Contact No:{" "}
                  <b>{profileData && profileData?.contactNo}</b>{" "}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {" "}
                  Company Details:{" "}
                  <b>{profileData && profileData?.companyDetails}</b>{" "}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {" "}
                  Company Website URL:{" "}
                  <b>{profileData && profileData?.websiteUrl}</b>{" "}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {" "}
                  Location: <b>{profileData && profileData?.location}</b>{" "}
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
