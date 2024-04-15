"use client";
import React, { useCallback, useState } from "react";
import {
  Avatar,
  Card,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import SnackBarComponent from "../../common/SnackBarComponent";
import { LoadingButton } from "@mui/lab";
import { AlertType } from "../../../utils/types/general-types";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

type userInfo = {
  _id: string;
  email: string;
  name: string;
  contactNo: string;
  profileStatus: string;
  profilePic: {
    image?: string;
    status: Boolean;
  };
};

type props = {
  loadUsers: () => void;
  allAreSavedJobs?: boolean;
  alreadyApplied?: boolean;
  userRole: string;
  showJobApplicationStatus?: boolean;
  jobPostInfo: userInfo;
};

function UserListCard(props: props) {

  const {
    allAreSavedJobs = false,
    jobPostInfo,
    loadUsers,
    userRole,
  } = props;

  const [userStatus, setUserStatus] = useState(
    jobPostInfo?.profileStatus === "blocked"
  );
  const [backendCall, setBackendCall] = useState(false);
  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });

  const changeUserStatus = useCallback(async () => {
    try {
      setBackendCall(true);

      const response = await fetch("/api/admin/changeUserStatus", {
        method: "POST",
        body: JSON.stringify({
          userId: jobPostInfo._id,
          profileStatus: userStatus ? "active" : "blocked",
          userRole,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.status !== 200) {
        setBackendCall(false);
        const { message } = await response.json();
        setAlert({
          show: true,
          message:
            typeof message === "string"
              ? message
              : `User ${
                  userStatus ? "activation" : "blocking"
                } failed due to server error, please try again!`,
          severity: "error",
        });
      } else {
        const { message } = await response.json();
        setUserStatus(!userStatus);
        setBackendCall(false);
        if (allAreSavedJobs) {
          loadUsers();
        }
        setAlert({
          show: true,
          message:
            typeof message === "string"
              ? message
              : `Job ${userStatus ? "activated" : "blocked"} successfully!`,
          severity: "success",
        });
      }
    } catch (error) {
      setBackendCall(false);
      setAlert({
        show: true,
        message: "Server Error",
        severity: "error",
      });
    }
  }, [jobPostInfo._id, userStatus, userRole, allAreSavedJobs, loadUsers]);

  return (
    <Card sx={{ backgroundColor: "" }}>
      <SnackBarComponent alert={alert} setAlert={setAlert} /> 
      <Grid
        container
        alignItems="center"
        justifyContent={{ md: "space-between", sm: "center", xs: "center" }}
        p={3}
        gap={{ lg: 0, md: 0, xs: 2, sm: 2 }}
      >
        <Grid
          container
          item
          md="auto"
          gap={{ md: 10, xs: 1 }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            container
            item
            md="auto"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              src={
                jobPostInfo?.profilePic?.status
                  ? jobPostInfo?.profilePic?.image
                  : "/profilepic.jpeg"
              }
              sx={{ width: "100px", height: "100px" }}
              variant="square"
            />
          </Grid>

          <Grid
            container
            item
            md="auto"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item md={12}>
              <Stack direction="column">
                <Typography sx={{ textAlign: "left" }}>
                  <b>Name :</b> {!jobPostInfo ? "" : jobPostInfo?.name}
                </Typography>

                <Typography sx={{ textAlign: "left" }}>
                  <b>Email :</b> {!jobPostInfo ? "" : jobPostInfo?.email}
                </Typography>

                <Typography sx={{ textAlign: "left" }}>
                  <b>Contact Number :</b>{" "}
                  {!jobPostInfo ? "" : jobPostInfo?.contactNo}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          item
          md="auto"
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            container
            item
            alignItems="center"
            justifyContent={{ md: "flex-end", sm: "center", xs: "center" }}
            gap={2}
          >
            <Grid item xs={"auto"}>
              <LoadingButton
                loading={backendCall}
                size="large"
                endIcon={
                  userStatus ? <CheckOutlinedIcon /> : <BlockOutlinedIcon />
                }
                variant={"contained"}
                color={userStatus ? "success" : "error"}
                sx={{ borderRadius: 2 }}
                onClick={changeUserStatus}
              >
                {userStatus ? "Un-block" : "Block"}
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export { UserListCard };
