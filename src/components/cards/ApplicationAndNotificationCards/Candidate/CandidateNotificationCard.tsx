"use client";
import {
  Button,
  Card,
  Grid,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import MessageIcon from '@mui/icons-material/Message';
 

function CandidateNotificationCard() {
  const [applicationStatus, setApplicationStatus] = React.useState("");
  const [applicantInfo, setApplicantInfo] = React.useState({
    name: "John Doe",
    email: "john@example.com",
    dateOfBirth: "1990-01-01",
    jobRole: "Software Engineer",
  });

  const handleChangeApplicationStatus = (event: SelectChangeEvent) => {
    setApplicationStatus(event.target.value as string);
  };

  return (
    <Card sx={{backgroundColor:""}}>
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
                <Typography sx={{ textAlign: "left" }}><b>Applicant Name :</b> {applicantInfo.name}</Typography>
                <Typography sx={{ textAlign: "left" }}><b>Date of Birth :</b> {applicantInfo.email}</Typography>
                <Typography sx={{ textAlign: "left" }}><b>Email :</b> {applicantInfo.dateOfBirth}</Typography>
                <Typography sx={{ textAlign: "left" }}><b>Job Role :</b> {applicantInfo.jobRole}</Typography>
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
            <Grid item>
                <Link href="/#" target="_blank">
                  <Button
                    size="large"
                    endIcon={<MessageIcon />}
                    variant="contained"
                    sx={{borderRadius:2}}
                  >
                   Message
                  </Button>
                </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export { CandidateNotificationCard };
