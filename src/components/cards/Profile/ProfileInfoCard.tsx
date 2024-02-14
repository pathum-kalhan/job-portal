"use client";
import React, { useState, useCallback } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useDropzone } from "react-dropzone";
import Link from "next/link";

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

type Alert = {
  show: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
};

function ProfileInfoCard() {
  const [formData, setFormData] = useState<IFormData["file"]>({ file: null });
  const [backendCall, setBackendCall] = useState(false);
  const [alert, setAlert] = useState<Alert>({
    show: false,
    message: "",
    severity: "success",
  });

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

  return (
    <Card sx={{
      width: {
        lg:300,
        md:300,
        sm:500,
        xs:350,
      }, pb: 1
    }}>
      <input {...getInputProps()} />
      <CardContent  sx={{ maxHeight:410, minHeight:410 }}>
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

            <Button
              startIcon={<EditIcon />}
              size="small"
              variant="contained"
              sx={{ textTransform: "capitalize" }}
            >
              Edit Profile
            </Button>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            {" "}
            Name: <b>Mr. xxxxx xxxxx</b>{" "}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {" "}
            Email: <b>xxxxx@xxxx.com</b>{" "}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {" "}
            User Type: <b>Job Seeker</b>{" "}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {" "}
            Contact No: <b>071 123 1234</b>{" "}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {" "}
            Date Of Birth: <b>09/12/1998</b>{" "}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {" "}
            Educational Background: <b>xxxxxxxx</b>{" "}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {" "}
            Work Experience: <b>xxxxxxxx</b>{" "}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {" "}
            Skills and Certifications: <b>xxxxxxxx</b>{" "}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {" "}
            LinkedIn Profile URL: <b>xxxxxxxx</b>{" "}
          </Typography>
        </Stack>
      </CardContent>
      <Stack
        gap={1}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <CardActions>
          <Link href="/reset-password">
            <Button
              size="small"
              sx={{ textTransform: "capitalize", textAlign: "center" }}
              fullWidth
            >
              Change Password or Reset Password
            </Button>
          </Link>
        </CardActions>
      </Stack>
    </Card>
  );
}

export { ProfileInfoCard };
