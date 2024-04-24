"use client";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import {Grid, Stack} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import InsertChartOutlinedOutlinedIcon from "@mui/icons-material/InsertChartOutlinedOutlined";
import PostAddIcon from "@mui/icons-material/PostAdd";

type props = {};

function AdminProfileRightSideCard(props: props) {
  const [backendCall, setBackendCall] = useState(false);

  const router = useRouter();
  const {} = props;

  const logOutFunc = async () => {
    setBackendCall(true);

    await signOut({ redirect: false, callbackUrl: "/" });
    router.replace("/");
    setBackendCall(false);
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
              <Link href="/dashboard/admin/list-candidates">
                <Button
                  color="secondary"
                  size="small"
                  variant="contained"
                  sx={{ textTransform: "capitalize", height: "2.5rem" }}
                  endIcon={<FormatListBulletedIcon />}
                >
                  CANDIDATES
                </Button>
              </Link>
            </Grid>
            <Grid item lg="auto" md="auto" sm="auto" xs="auto">
              <Link href="/dashboard/admin/list-employers">
                <Button
                  color="success"
                  size="small"
                  variant="contained"
                  endIcon={<FormatListBulletedIcon />}
                  sx={{ textTransform: "capitalize", height: "2.5rem" }}
                >
                  EMPLOYERS
                </Button>
              </Link>
            </Grid>

            <Grid item lg="auto" md="auto" sm="auto" xs="auto">
              <Link href="/dashboard/admin/analytics">
                <Button
                  color="info"
                  size="small"
                  variant="contained"
                  endIcon={<InsertChartOutlinedOutlinedIcon />}
                  sx={{ height: "2.5rem" }}
                >
                  Analytics
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
              <Link href="/dashboard/admin/add-questions">
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
              <Link href="/dashboard/admin/manage-questions">
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
    </Card>
  );
}

export { AdminProfileRightSideCard };
