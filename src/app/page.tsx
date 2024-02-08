import { Button, Grid } from "@mui/material";

export default function Home() {
  return (
    <Grid container height={"100vh"} alignContent="center" gap={14}>
      <Grid item xs={12}>
        <h1
          style={{
            textAlign: "center",
            fontFamily: "sans-serif",
            fontWeight: "600",
          }}
        >
          Get matched with a job you love.
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
          <Button
            href="/create-account"
            variant="contained"
            sx={{
              width: "auto",
            }}
          >
            {" "}
            Create Account
          </Button>
        </Grid>
        <Grid item lg={"auto"} md={"auto"} sm={"auto"} xs={"auto"}>
          <Button
            href="/login"
            variant="contained"
            sx={{
              width: "10rem",
            }}
          >
            {" "}
            Login
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
