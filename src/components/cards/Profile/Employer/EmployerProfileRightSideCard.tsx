"use client";
import React, { useCallback, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Badge, Grid, Stack, Tooltip } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { deepPurple } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmployerInterviewCalender from "./EmployerInterviewCalender";
import PostAddIcon from "@mui/icons-material/PostAdd";

function EmployerProfileRightSideCard() {
  const [backendCall, setBackendCall] = useState(false);
  const [hasRecentMeetings, setHasRecentMeetings] = useState(0);
  const { data: session } = useSession();

  const [openDialogBox, setOpenDialogBox] = useState(false);

  const handleCloseDialogBox = () => {
    setOpenDialogBox(false);
  };

  const router = useRouter();

  const logOutFunc = async () => {
    setBackendCall(true);

    await signOut({ redirect: false, callbackUrl: "/" });
    router.replace("/");
    setBackendCall(false);
  };

  const getRecentMeetings = useCallback(async () => {
    try {
      setBackendCall(true);

      const response = await fetch("/api/employer/recentInterviewSchedules", {
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
        setHasRecentMeetings(data.data);
        setBackendCall(false);
      }
    } catch (error) {
      setBackendCall(false);
    }
    // @ts-ignore
  }, [session?.user?.email, session?.user?.role]);

  useEffect(() => {
    getRecentMeetings();
  }, [getRecentMeetings]);

  return (
    <Card
      sx={{
        width: {
          lg: 500,
          md: 500,
          sm: 500,
          xs: 350,
        },
        pb: 1,
        backgroundImage: `url("/bg_images/profileBg.jpg")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        boxShadow: "inset white 0px 0px 500px 110px",
      }}
    >
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
              <Link href={"/dashboard/employer/interview-schedule"}>
                <CalendarTodayIcon
                  sx={{ fontSize: "4rem", cursor: "pointer" }}
                />
              </Link>
            </Grid>
            <Grid item lg="auto" md="auto" sm="auto" xs="auto">
              <Link href="/dashboard/employer/post-a-job">
                <Button
                  color="success"
                  size="small"
                  variant="contained"
                  sx={{ textTransform: "capitalize", height: "2.5rem" }}
                  endIcon={<AddIcon />}
                >
                  POST JOB
                </Button>
              </Link>
            </Grid>
            <Grid item lg="auto" md="auto" sm="auto" xs="auto">
              <Link href="/dashboard/employer/manage-jobs">
                <Button
                  color="info"
                  size="small"
                  variant="contained"
                  endIcon={<FormatListBulletedIcon />}
                  sx={{ textTransform: "capitalize", height: "2.5rem" }}
                >
                  JOBS
                </Button>
              </Link>
            </Grid>

            <Grid item lg="auto" md="auto" sm="auto" xs="auto">
              <Link href="/dashboard/employer/applicants-view">
                <Button
                  color="warning"
                  size="small"
                  variant="contained"
                  endIcon={<FormatListBulletedIcon />}
                  sx={{ height: "2.5rem" }}
                >
                  Applications
                </Button>
              </Link>
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
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <Grid item xs={"auto"}>
              <Tooltip
                title={
                  hasRecentMeetings > 0 ? "You have upcoming meetings" : ""
                }
              >
                <Badge
                  color="error"
                  badgeContent={hasRecentMeetings > 0 ? "!" : null}
                >
                  <Button
                    color="primary"
                    size="large"
                    variant="contained"
                    sx={{ textTransform: "capitalize", height: "2.5rem" }}
                    endIcon={<CalendarMonthIcon />}
                    onClick={() => {
                      setOpenDialogBox(true);
                    }}
                  >
                    Schedules
                  </Button>
                </Badge>
              </Tooltip>
            </Grid>

            <Grid item xs={"auto"}>
              <Link href="/dashboard/employer/add-questions">
                <Button
                  color="secondary"
                  size="large"
                  variant="contained"
                  sx={{ textTransform: "capitalize", height: "2.5rem" }}
                  endIcon={<PostAddIcon />}
                >
                  Add Questions
                </Button>
              </Link>
            </Grid>

            <Grid item xs={"auto"}>
              <Link href="/dashboard/employer/manage-questions">
                <Button
                  color="secondary"
                  size="large"
                  variant="contained"
                  sx={{ textTransform: "capitalize", height: "2.5rem" }}
                  endIcon={<FormatListBulletedIcon />}
                >
                  Manage Questions
                </Button>
              </Link>
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

      <EmployerInterviewCalender
        openDialogBox={openDialogBox}
        handleCloseDialogBox={handleCloseDialogBox}
      />
    </Card>
  );
}

export { EmployerProfileRightSideCard };
