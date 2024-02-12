import { Button, Grid, Stack } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Home() {
  return (
    <Grid container height={"100vh"} alignContent="center" justifyContent="center" >
      <Grid container item
        lg={5}
        md={7}
        sm={9}
        xs={11}
        style={{
          backgroundColor: "#fff",
          padding: "8rem 2rem 8rem 2rem",
          borderRadius: "1rem",
        }}
        gap={10}
      >
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="center">
          <h1
          style={{
            textAlign: "center",
            fontFamily: "sans-serif",
            fontWeight: "600",
          }}
        >
            Get matched with a job you love.
          </h1>
          <FavoriteIcon sx={{color:"red", fontSize:"2rem", margin:"0"}} />
          </Stack>
     
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
    </Grid>
  );
}
