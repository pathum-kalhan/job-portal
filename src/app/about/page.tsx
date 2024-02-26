import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import TimelineIcon from "@mui/icons-material/Timeline";
import QuizIcon from "@mui/icons-material/Quiz";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

function Page() {
  const serviceSections = [
    {
      title: "Stay Updated about relevant roles",
      paragraph: `Receive timely updates about relevant job roles, industry
      trends, and career opportunities tailored to your
      interests and qualifications.`,
      Icon: NotificationsNoneIcon,
    },
    {
      title: "Get Matched to the right jobs",
      paragraph: `Our advanced matching algorithm connects you with the right job opportunities based on your skills, experience, and preferences.
      `,
      Icon: AutoAwesomeMotionIcon,
    },
    {
      title: "Receive Job Proposals from employers",
      paragraph: `Employers can reach out to you directly with job proposals that match your profile, saving you time and effort in your job search.`,
      Icon: CoPresentIcon,
    },
    {
      title: "Get Real-Time Updates",
      paragraph: `Stay informed with real-time notifications about new job postings, interview requests, and application status updates.`,
      Icon: TimelineIcon,
    },
    {
      title: "Participate in Quizzes",
      paragraph: `Enhance your knowledge and skills by participating in quizzes designed to assess your expertise in various areas relevant to your career path.`,
      Icon: QuizIcon,
    },
    {
      title: "Filter Your Dream Job",
      paragraph: `Easily filter job listings by industry, job role, location, and other criteria to find your dream job quickly and efficiently.`,
      Icon: AutoFixHighIcon,
    },
  ];

  return (
    <>
      <Typography component={"h2"} variant={"h5"}>
        Welcome to Career Guide Pro.
      </Typography>
      <br />
      <Typography component={"p"}>
        Career Guide Pro is a platform designed to help individuals navigate the
        complex career landscape, bridging the gap between talented
        professionals and thriving organizations. With a deep understanding of
        the evolving job market and a passion for empowering individuals, Career
        Guide Pro fosters meaningful interactions and facilitates seamless
        matches. With years of experience in recruitment, technology, and user
        experience, it&apos;s a gateway to limitless possibilities.
      </Typography>

      <Card sx={{ marginTop: 10 }}>
        <CardHeader
          title="Accelerate Your Career with Career Guide Pro"
          sx={{ textAlign: "center" }}
        />
        <CardContent>
          <Grid container>
            <Grid container item alignItems="center" justifyContent="center">
              <Grid
                container
                item
                alignItems="center"
                justifyContent="center"
                md={10}
                sm={12}
                xs={12}
                spacing={3}
              >
                {serviceSections.map((item) => {
                  const { Icon } = item;
                  return (
                    <Grid item md={6} sm={12} xs={12} key={item.title}>
                      <Grid
                        container
                        item
                        alignItems="flex-start"
                        justifyContent={{
                          md: "flex-start",
                          sm: "center",
                          xs: "center",
                        }}
                        gap={3}
                      >
                        <Grid item xs={"auto"}>
                          <Icon sx={{ fontSize: "5rem" }} />
                        </Grid>
                        <Grid item md={6} sm={10} xs={10}>
                          <Stack>
                            <Typography component={"h2"} fontWeight="bold">
                              {item.title}
                            </Typography>
                            <Typography component={"p"}>
                              {item.paragraph}
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
 
      <Typography component={"p"}  sx={{ marginTop: 5, textAlign:"center" }}>
        Take control of your career with Career Guide Pro and unlock endless
        opportunities for professional growth and development. Sign up today and
        start your journey toward success!
      </Typography>
    </>
  );
}

export default Page;
