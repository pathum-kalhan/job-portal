import { Grid, Typography } from "@mui/material";
import { Services } from "../components/cards/Services";
import { serviceList } from "../utils/servicesList";
import { LoginAndRegCard } from "../components/cards/LoginAndRegCard";

export default function Home() {
  return (
    <Grid container mt={10} alignContent="center" justifyContent="center">
     <Grid container item lg={6} md={9} sm={10} xs={11}>
        <LoginAndRegCard />
        </Grid>
      <Grid
        container
        item
        style={{
          padding: "5rem 2rem 8rem 2rem",
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
      </Grid>
    </Grid>
  );
}
