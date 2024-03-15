"use client";
import React, { useCallback, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Avatar, Grid, Stack } from "@mui/material";
import Link from "next/link";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { deepPurple } from "@mui/material/colors";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LoadingButton } from "@mui/lab";
import { useDropzone } from "react-dropzone";
import SnackBarComponent from "../../../../components/common/SnackBarComponent";
import { AlertType, profileData } from "../../../../utils/types";

type props = {
  handleClickOpenUploadCv: () => void;
  profileData: profileData | null;
  getProfileData: () => void;
};
 

function CandidateProfileRightSideCard(props: props) {
  const { getProfileData, profileData } = props;
  const { data: session } = useSession();

  const [backendCall, setBackendCall] = useState(false);
  const [cvBackendCall, setCvBackendCall] = useState(false);
  const [cvDelBackendCall, setCvDelBackendCall] = useState(false);

  const router = useRouter();
  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const fileExtension = acceptedFiles[0]?.name.split(".")[1];

      try {
        if (fileExtension !== "pdf") {
          setAlert({
            show: true,
            message: "Please upload a supported document Type (pdf)",
            severity: "error",
          });
          return;
        } else if (acceptedFiles[0]?.size > 3599999) {
          setAlert({
            show: true,
            message: `Please upload a PDF smaller than 3MB, Uploaded File is ${(
              acceptedFiles[0]?.size / 1000000
            ).toFixed(3)}MB`,
            severity: "error",
          });

          return;
        }
        setCvBackendCall(true);
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append("cv", file);
        formData.append("fileName", file.name as string);
        // @ts-ignore
        formData.append("userRole", session?.user?.role as string);
        formData.append("fileLastModified", file.lastModified as any);

        const response = await fetch("/api/candidate/uploadCv", {
          method: "POST",
          body: formData,
        });

        if (response.status !== 200) {
          setCvBackendCall(false);

          const { message } = await response.json();
          setAlert({
            show: true,
            message:
              typeof message === "string"
                ? message
                : "CV upload failed due to server error, please try again!",
            severity: "error",
          });
        } else {
          setCvBackendCall(false);

          setAlert({
            show: true,
            message: "CV updated!",
            severity: "success",
          });
          getProfileData();
        }
      } catch (error) {
        setCvBackendCall(false);

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

  const deleteCv = useCallback(async () => {
    try {
      setCvDelBackendCall(true); 

      const response = await fetch("/api/candidate/deleteCv", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        setCvDelBackendCall(false);

        const { message } = await response.json();
        setAlert({
          show: true,
          message:
            typeof message === "string"
              ? message
              : "CV delete failed due to server error, please try again!",
          severity: "error",
        });
      } else {
        setCvDelBackendCall(false);

        setAlert({
          show: true,
          message: "CV deleted!",
          severity: "success",
        });
        getProfileData();
      }
    } catch (error) {
      setCvDelBackendCall(false);

      setAlert({
        show: true,
        message: "Server Error",
        severity: "error",
      });
    }
 
  }, [getProfileData]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  const logOutFunc = async () => {
    setBackendCall(true);

    await signOut({ redirect: false, callbackUrl: "/" });
    router.replace("/");
    setBackendCall(false);
  };

  return (
    <>
     <SnackBarComponent alert={alert} setAlert={setAlert} />
      <Card
        sx={{
          width: {
            lg: 500,
            md: 500,
            sm: 500,
            xs: 350,
          },
          pb: 1,
        }}
      >
        <input {...getInputProps()} />
        <CardContent
          sx={{
            maxHeight: { lg: 400, xs: 300 },
            minHeight: { lg: 400, xs: 300 },
          }}
        >
          <Grid container gap={1}>
            <Grid
              container
              item
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{
                backgroundColor: "#c9c9c9",
                padding: "1rem",
              }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item lg="auto" md="auto" sm="auto" xs="auto">
                <CalendarTodayIcon
                  sx={{ fontSize: "4rem", cursor: "pointer" }}
                />
              </Grid>
              <Grid item lg="auto" md="auto" sm="auto" xs="auto">
                <LoadingButton
                  loading={cvBackendCall}
                  disabled={cvDelBackendCall || !profileData}
                  color="success"
                  size="small"
                  variant="contained"
                  sx={{ textTransform: "capitalize", height: "2.5rem" }}
                  endIcon={<CloudUploadIcon />}
                  {...getRootProps()}
                >
                  Upload new CV
                </LoadingButton>
              </Grid>
              <Grid item lg="auto" md="auto" sm="auto" xs="auto">
                <Link href={profileData?.cvUrl ?? ""} target="_blank">
                  <Button
                    disabled={
                      !profileData?.cvUrl || cvBackendCall || cvDelBackendCall
                    }
                    color="info"
                    size="small"
                    variant="contained"
                    endIcon={<OpenInNewIcon />}
                    sx={{ textTransform: "capitalize", height: "2.5rem" }}
                  >
                    View CV
                  </Button>
                </Link>
              </Grid>

              <Grid item lg="auto" md="auto" sm="auto" xs="auto">
                <LoadingButton
                  loading={cvDelBackendCall}
                  disabled={!profileData?.cvUrl || cvBackendCall}
                  color="error"
                  size="small"
                  variant="contained"
                  endIcon={<DeleteForeverIcon fontSize="large" />}
                  sx={{ textTransform: "capitalize", height: "2.5rem" }}
                  onClick={deleteCv}
                >
                  Delete CV
                </LoadingButton>
              </Grid>
            </Grid>

            <Grid
              container
              item
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{
                backgroundColor: "#c9c9c9",
                padding: "1rem",
              }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Avatar
                  sx={{
                    padding: 1,
                    backgroundColor: "#ebe6e6",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  N/A
                </Avatar>
              </Grid>

              <Grid item>
                <Button
                  size="medium"
                  variant="contained"
                  sx={{
                    height: "3rem",
                    borderRadius: 4,
                    textTransform: "capitalize",
                    backgroundColor: deepPurple[500],
                    "&:hover": {
                      backgroundColor: deepPurple[700],
                    },
                  }}
                >
                  QUIZZES
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>

        <Stack
          gap={1}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <CardActions>
            <LoadingButton
              loading={backendCall}
              onClick={logOutFunc}
              size="large"
              variant="contained"
              sx={{
                textTransform: "capitalize",
                textAlign: "center",
                borderRadius: 10,
                backgroundColor: deepPurple[500],
                "&:hover": {
                  backgroundColor: deepPurple[700],
                },
              }}
              fullWidth
            >
              LOGOUT
            </LoadingButton>
          </CardActions>
        </Stack>
      </Card>
    </>
  );
}

export { CandidateProfileRightSideCard };
