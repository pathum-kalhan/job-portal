"use client";
import { LoadingButton } from "@mui/lab";
import { Grid, Card } from "@mui/material";
import { useSession } from "next-auth/react";

function LoginAndRegCard() {
  const { data: session, status } = useSession();

  return (
    <Card
      style={{
        backgroundColor: "#fff",
        padding: "8rem 2rem 8rem 2rem",
        borderRadius: "1rem",
      }}
    >
      <Grid container alignContent="center" justifyContent="center">
        <Grid container item gap={8}>
          <Grid
            item
            xs={12}
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
          {session?.user?.email ? (
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
                <LoadingButton
                  loading={status === "loading"}
                  href="/dashboard/profile"
                  variant="contained"
                  sx={{
                    width: "auto",
                  }}
                >
                  {" "}
                  Go to Dashboard
                </LoadingButton>
              </Grid>
            </Grid>
          ) : (
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
                <LoadingButton
                  loading={status === "loading"}
                  href="/create-account"
                  variant="contained"
                  sx={{
                    width: "auto",
                  }}
                >
                  {" "}
                  Create Account
                </LoadingButton>
              </Grid>
              <Grid item lg={"auto"} md={"auto"} sm={"auto"} xs={"auto"}>
                <LoadingButton
                  loading={status === "loading"}
                  href="/login"
                  variant="contained"
                  sx={{
                    width: "10rem",
                  }}
                >
                  {" "}
                  Login
                </LoadingButton>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Card>
  );
}

export { LoginAndRegCard };
