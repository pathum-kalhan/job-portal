"use client";
import { Grid, Stack, Typography } from "@mui/material";
import { Services } from "../components/cards/Services";
import { serviceList } from "../utils/servicesList";
import { LoginAndRegCard } from "../components/cards/LoginAndRegCard";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <Grid container alignContent="center" justifyContent="center">
      {/* @ts-ignore */}
      {session?.user?.role === "candidate" && (
        <Grid
          container
          item
          mt={5}
          lg={6}
          md={9}
          sm={10}
          xs={11}
          alignSelf="center"
          alignItems="center"
          justifyContent="center"
        >
          <h1
            style={{
              textAlign: "center",
              fontFamily: "sans-serif",
              fontWeight: "600",
            }}
          >
            Get matched with a job you love. ❤️
          </h1>
        </Grid>
      )}
      <Grid
        container
        item
        alignContent="center"
        justifyContent="center"
        style={{
          padding: "3rem 2rem 3rem 2rem",
          borderRadius: "1rem",
        }}
      >
        <Grid
          item
          xs={12}
          alignItems="center"
          justifyContent="center"
          pl={{ lg: 15, md: 10, sm: 5, xs: 1 }}
          pr={{ lg: 15, md: 10, sm: 5, xs: 1 }}
        >
          <Typography component={"h2"} variant={"h5"} textAlign={"center"}>
            Welcome to Career Guide Pro
          </Typography>
          <br />
          <Typography component={"p"} textAlign={"center"}>
            Your ultimate destination for navigating the ever-evolving job
            market with confidence and clarity. Our platform empowers job
            seekers and employers alike, offering intuitive tools and resources
            to streamline the hiring process. From personalized job
            recommendations to skill assessments and industry insights,
            we&apos;re dedicated to helping you accelerate your career journey.
            Join us today and discover a world of opportunities tailored to your
            unique ambitions and qualifications.
          </Typography>
        </Grid>

        {/* @ts-ignore */}
        {!session?.user && (
          <Grid container item lg={6} md={9} sm={10} xs={11} mt={5}>
            <LoginAndRegCard />
          </Grid>
        )}
      </Grid>

   
        <Grid
          item
          xs={12}
          alignItems="center"
          justifyContent="center"
          pl={{ lg: 15, md: 10, sm: 5, xs: 1 }}
          pr={{ lg: 15, md: 10, sm: 5, xs: 1 }}
        >
          <Stack
            alignItems="center"
            justifyContent="center"
            pl={{ lg: 28, md: 5, sm: 2, xs: 0 }}
            pr={{ lg: 28, md: 5, sm: 2, xs: 0 }}
          >
            <Image
              src={
                // @ts-ignore
                session?.user?.role === "employer"
                  ? "/bg_images/employer_welcome_page.webp"
                  : // @ts-ignore
                  session?.user?.role === "candidate"
                  ? "/bg_images/welcome_to_career_guide_pro_login_candidate.webp"
                  : "/bg_images/welcome_to_career_guide_pro.webp"
              }
              alt="Welcome to Career Guide Pro"
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
              width={1000}
              height={400}
            />
          </Stack>
        </Grid>

        {/* @ts-ignore */}
        {session?.user?.role !== "employer" && (
          <Grid
            item
            xs={12}
            alignItems="center"
            justifyContent="center"
            pl={{ lg: 15, md: 10, sm: 2, xs: 0 }}
            pr={{ lg: 15, md: 10, sm: 2, xs: 0 }}
          >
            <Services serviceSections={serviceList} />
          </Grid>
        )}
    </Grid>
  );
}
