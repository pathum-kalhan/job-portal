"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Avatar, Grid, Stack } from "@mui/material";
import Link from "next/link";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { deepPurple } from "@mui/material/colors";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

type props = {
  handleClickOpenUploadCv: () => void;
};

function CandidateProfileRightSideCard(props: props) {
  const router = useRouter();

  const { handleClickOpenUploadCv } = props;

  const logOutFunc = () => {
    signOut({ redirect: false, callbackUrl: "/" });
    router.replace("/");
  };

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
              <CalendarTodayIcon sx={{ fontSize: "4rem", cursor: "pointer" }} />
            </Grid>
            <Grid item lg="auto" md="auto" sm="auto" xs="auto">
              <Button
                color="success"
                size="small"
                variant="contained"
                sx={{ textTransform: "capitalize", height: "2.5rem" }}
                endIcon={<CloudUploadIcon />}
                onClick={handleClickOpenUploadCv}
              >
                Upload new CV
              </Button>
            </Grid>
            <Grid item lg="auto" md="auto" sm="auto" xs="auto">
              <Link href="/testPDF.pdf" target="_blank">
                <Button
                  color="info"
                  size="small"
                  variant="contained"
                  endIcon={<OpenInNewIcon />}
                  sx={{ textTransform: "capitalize", height: "2.5rem" }}
                >
                  View CV
                </Button>
              </Link>
            </Grid>

            <Grid item lg="auto" md="auto" sm="auto" xs="auto">
              <Button
                color="error"
                size="small"
                variant="contained"
                endIcon={<DeleteForeverIcon fontSize="large" />}
                sx={{ textTransform: "capitalize", height: "2.5rem" }}
              >
                Delete CV
              </Button>
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
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Avatar
                sx={{
                  padding: 1,
                  backgroundColor: "#ebe6e6",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                N/A
              </Avatar>
            </Grid>

            <Grid item>
              <Button
                size="medium"
                variant="contained"
                sx={{
                  height: "3rem",
                  borderRadius: 4,
                  textTransform: "capitalize",
                  backgroundColor: deepPurple[500],
                  "&:hover": {
                    backgroundColor: deepPurple[700],
                  },
                }}
              >
                QUIZZES
              </Button>
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
          <Button
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
          </Button>
        </CardActions>
      </Stack>
    </Card>
  );
}

export { CandidateProfileRightSideCard };
