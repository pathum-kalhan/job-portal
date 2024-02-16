"use client";
import {
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DownloadIcon from "@mui/icons-material/Download";
import Link from "next/link";

function CandidatesApplicationCard() {
  const [applicationStatus, setApplicationStatus] = React.useState("");
  const [applicantInfo, setApplicantInfo] = React.useState({
    name: "John Doe",
    email: "john@example.com",
    dateOfBirth: "1990-01-01",
    jobRole: "Software Engineer",
    skills: "Html, css",
    qualifications: "Bachelor's Degree",
    resultOfTheQuiz: "80%",
  });

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
                  <b>Applicant Name :</b> {applicantInfo.name}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  <b>Date of Birth :</b> {applicantInfo.email}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  <b>Email :</b> {applicantInfo.dateOfBirth}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  <b>Job Role :</b> {applicantInfo.jobRole}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  <b>Skills :</b> {applicantInfo.skills}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  <b>Qualification :</b> {applicantInfo.qualifications}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>
                  <b>Result of Quiz :</b> {applicantInfo.resultOfTheQuiz}
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
            justifyContent="flex-end"
            gap={2}
          >
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status of the Application</InputLabel>
                <Select
                  value={applicationStatus}
                  label="Status of the Application"
                  onChange={handleChangeApplicationStatus}
                  fullWidth
                >
                  <MenuItem value={"shortlisted"}>Shortlisted</MenuItem>
                  <MenuItem value={"received"}>Received</MenuItem>
                  <MenuItem value={"rejected"}>Rejected</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Stack direction="row" gap={1}>
                <Button
                  size="large"
                  endIcon={<DownloadIcon />}
                  variant="contained"
                  color="success"
                  sx={{ borderRadius: 2 }}
                >
                  Download
                </Button>

                <Link href="/testPDF.pdf" target="_blank">
                  <Button
                    size="large"
                    endIcon={<OpenInNewIcon />}
                    variant="contained"
                    sx={{ borderRadius: 2 }}
                  >
                    View CV
                  </Button>
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export { CandidatesApplicationCard };
