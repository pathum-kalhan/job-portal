import { Button, Grid } from "@mui/material";
import Link from "next/link";

function Page() {
  return (
    <Grid
      container
      height={"100vh"}
      alignContent="center"
      justifyContent="center"
    >
      <span
        style={{
          backgroundColor: "#e3e3e3",
          padding: "10rem 6rem 10rem 6rem",
          borderRadius: "1rem",
        }}
      >
        <Grid item xs={12} mb={5}>
          <h1
            style={{
              textAlign: "center",
              fontFamily: "sans-serif",
              fontWeight: "600",
              color: "black",
            }}
          >
            Select the Preferred User Type
          </h1>
        </Grid>

        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          gap={4}
          lg={12}
          md={12}
          sm={12}
          xs={12}
        >
          <Grid item lg={"auto"} md={"auto"} sm={"auto"} xs={"auto"}>
          <Link
            href="/create-account/create-candidate"
            >
            <Button
              variant="contained"
              sx={{
                width: "auto",
              }}
              
            >
              {" "}
              As a Job Seeker
              </Button>
              </Link>
          </Grid>
          <Grid item lg={"auto"} md={"auto"} sm={"auto"} xs={"auto"}>
            <Link
             href="/create-account/create-employer"
            >
            <Button
              variant="contained"
              sx={{
                width: "10rem",
              }}
             
            >
              {" "}
              As a Employer
              </Button>
              </Link>
          </Grid>
        </Grid>
      </span>
    </Grid>
  );
}

export default Page;
