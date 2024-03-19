import { LoadingButton } from "@mui/lab";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useSession } from "next-auth/react";
import { AlertType } from "../../utils/types/genaral-types";

type props = {
  backendCall: boolean;
  optInDataBackendCall: boolean;
  setAlert: (alert:AlertType) => void;
  optInData: {
    jobAlerts: boolean;
    jobApplicationStatus: boolean;
    featureUpdatesOptIn: boolean;
    suspiciousActivitiesOptIn: boolean;
  };
};

function NotificationPreferences(props: props) {
  const { data: session } = useSession();

  const { backendCall, optInDataBackendCall, setAlert, optInData } = props;

  // opt-in api call status
  const [backendCallJobALert, setBackendCallJobALert] = useState(false);
  const [backendCallFeatureUpdatesOptIn, setBackendCallFeatureUpdatesOptIn] = useState(false);
  const [backendCallJobApplicationStatus, setBackendCallJobApplicationStatus] = useState(false);
  const [ backendCallSuspiciousActivitiesOptIn, setBackendCallSuspiciousActivitiesOptIn ] = useState(false);

  // opt-in status
  const [isOptInJobAlert, setIsOptInJobAlert] = useState(optInData?.jobAlerts);
  const [isOptInApplicationStatus, setIsOptInApplicationStatus] = useState( optInData?.jobApplicationStatus);
  const [isOptInPlatformUpdate, setIsOptInPlatformUpdate] = useState( optInData?.featureUpdatesOptIn);
  const [isOptInSecurityAlerts, setIsOptInSecurityAlerts] = useState( optInData?.suspiciousActivitiesOptIn);

  // Api calls for change OptIn Data
  const handelChangeJobAlert = useCallback(async () => {
    setBackendCallJobALert(true);
    try {
      const response = await fetch("/api/notifications/jobAlerts", {
        method: "POST",
        body: JSON.stringify({
          // @ts-ignore
          userRole: session?.user?.role,
          jobAlerts: !isOptInJobAlert,
        }),
      });

      if (response.status !== 200) {
        setBackendCallJobALert(false);
        setAlert({
          show: true,
          message: "Failed to update job alert Opt-in status",
          severity: "error",
        });
      } else {
        setAlert({
          show: true,
          message: "Job alert Opt-in status updated successfully",
          severity: "success",
        });
        setIsOptInJobAlert(!isOptInJobAlert);
        setBackendCallJobALert(false);
      }
    } catch (error) {
      setBackendCallJobALert(false);
    }
  }, [
    isOptInJobAlert,
    // @ts-ignore
    session?.user?.role,
    setAlert,
    setBackendCallJobALert,
    setIsOptInJobAlert,
  ]);

  const handelChangeApplicationStatus = useCallback(async () => {
    setBackendCallJobApplicationStatus(true);
    try {
      const response = await fetch("/api/notifications/jobApplicationStatus", {
        method: "POST",
        body: JSON.stringify({
          // @ts-ignore
          userRole: session?.user?.role,
          jobApplicationStatus: !isOptInApplicationStatus,
        }),
      });

      if (response.status !== 200) {
        setBackendCallJobApplicationStatus(false);
        setAlert({
          show: true,
          message: "Failed to update job application status Opt-in",
          severity: "error",
        });
      } else {
        setAlert({
          show: true,
          message: "Job application Opt-in status updated successfully",
          severity: "success",
        });
        setIsOptInApplicationStatus(!isOptInApplicationStatus);
        setBackendCallJobApplicationStatus(false);
      }
    } catch (error) {
      setBackendCallJobApplicationStatus(false);
      setAlert({
        show: true,
        message: "Server Error",
        severity: "error",
      });
    }
  }, [
    isOptInApplicationStatus,
    // @ts-ignore
    session?.user?.role,
    setAlert,
    setBackendCallJobApplicationStatus,
    setIsOptInApplicationStatus,
  ]);

  const handelChangePlatformUpdate = useCallback(async () => {
    setBackendCallFeatureUpdatesOptIn(true);
    try {
      const response = await fetch("/api/notifications/featureUpdatesOptIn", {
        method: "POST",
        body: JSON.stringify({
          // @ts-ignore
          userRole: session?.user?.role,
          featureUpdatesOptIn: !isOptInPlatformUpdate,
        }),
      });

      if (response.status !== 200) {
        setBackendCallFeatureUpdatesOptIn(false);
        setAlert({
          show: true,
          message: "Failed to update, platform updates Opt-in",
          severity: "error",
        });
      } else {
        setAlert({
          show: true,
          message: "Successfully updated, platform updates Opt-in",
          severity: "success",
        });
        setIsOptInPlatformUpdate(!isOptInPlatformUpdate);
        setBackendCallFeatureUpdatesOptIn(false);
      }
    } catch (error) {
      setBackendCallFeatureUpdatesOptIn(false);
      setAlert({
        show: true,
        message: "Server Error",
        severity: "error",
      });
    }
  }, [
    isOptInPlatformUpdate,
    // @ts-ignore
    session?.user?.role,
    setAlert,
    setBackendCallFeatureUpdatesOptIn,
    setIsOptInPlatformUpdate,
  ]);

  const handelChangeSecurityAlerts = useCallback(async () => {
    setBackendCallSuspiciousActivitiesOptIn(true);
    try {
      const response = await fetch(
        "/api/notifications/suspiciousActivitiesOptIn",
        {
          method: "POST",
          body: JSON.stringify({
            // @ts-ignore
            userRole: session?.user?.role,
            suspiciousActivitiesOptIn: !isOptInSecurityAlerts,
          }),
        }
      );

      if (response.status !== 200) {
        setBackendCallSuspiciousActivitiesOptIn(false);
        setAlert({
          show: true,
          message: "Failed to update, suspicious activities Opt-in",
          severity: "error",
        });
      } else {
        setAlert({
          show: true,
          message: "Successfully updated, suspicious activities Opt-in",
          severity: "success",
        });
        setIsOptInSecurityAlerts(!isOptInSecurityAlerts);
        setBackendCallSuspiciousActivitiesOptIn(false);
      }
    } catch (error) {
      setBackendCallSuspiciousActivitiesOptIn(false);
      setAlert({
        show: true,
        message: "Server Error",
        severity: "error",
      });
    }
  }, [
    isOptInSecurityAlerts,
    // @ts-ignore
    session?.user?.role,
    setAlert,
    setBackendCallSuspiciousActivitiesOptIn,
    setIsOptInSecurityAlerts,
  ]);

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <Typography sx={{ fontWeight: "bold" }}>
          Notification Preferences
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Stay informed and up-to-date with relevant updates and notifications
          from Career Guide Pro. Customize your notification preferences to
          receive timely alerts about job opportunities, application status, and
          platform updates.{" "}
        </Typography>
        <br></br>

        <Grid container>
          <Grid container item>
            <Grid item>
              <Typography fontWeight={"bold"} fontSize={"0.9rem"}>
                Types of Notifications
              </Typography>
              {/* @ts-ignore */}
              {session && session?.user?.role === "candidate" && (
                <>
                  <br />
                  <Typography>
                    <LoadingButton
                      loading={backendCallJobALert}
                      disabled={backendCall || optInDataBackendCall}
                      color={isOptInJobAlert ? "error" : "success"}
                      startIcon={
                        isOptInJobAlert ? (
                          <RemoveCircleOutlineIcon />
                        ) : (
                          <AddCircleOutlineIcon />
                        )
                      }
                      onClick={handelChangeJobAlert}
                    >
                      {isOptInJobAlert
                        ? "opt-out for Job Alerts:"
                        : "Opt-in for Job Alerts:"}
                    </LoadingButton>{" "}
                    Receive notifications about new job postings that match your
                    preferences and qualifications.
                  </Typography>
                </>
              )}

              {/* @ts-ignore */}
              {session && session?.user?.role === "candidate" && (
                <>
                  {" "}
                  <br />
                  <Typography>
                    <LoadingButton
                      loading={backendCallJobApplicationStatus}
                      disabled={backendCall || optInDataBackendCall}
                      color={isOptInApplicationStatus ? "error" : "success"}
                      startIcon={
                        isOptInApplicationStatus ? (
                          <RemoveCircleOutlineIcon />
                        ) : (
                          <AddCircleOutlineIcon />
                        )
                      }
                      onClick={handelChangeApplicationStatus}
                    >
                      {isOptInApplicationStatus
                        ? "opt-out for Status Updates:"
                        : "Opt-in for Status Updates:"}
                    </LoadingButton>{" "}
                    Stay informed about the status of your job applications,
                    including when they&apos;re viewed by employers or if there
                    are any changes in the hiring process.
                  </Typography>
                </>
              )}

              <br />
              <Typography>
                <LoadingButton
                  loading={backendCallFeatureUpdatesOptIn}
                  disabled={backendCall || optInDataBackendCall}
                  color={isOptInPlatformUpdate ? "error" : "success"}
                  startIcon={
                    isOptInPlatformUpdate ? (
                      <RemoveCircleOutlineIcon />
                    ) : (
                      <AddCircleOutlineIcon />
                    )
                  }
                  onClick={handelChangePlatformUpdate}
                >
                  {isOptInPlatformUpdate
                    ? "opt-out for Platform Updates:"
                    : "Opt-in for Platform Updates:"}
                </LoadingButton>{" "}
                Be the first to know about new features, improvements, and
                announcements on Career Guide Pro.
              </Typography>
              <br />
              <Typography>
                <LoadingButton
                  loading={backendCallSuspiciousActivitiesOptIn}
                  disabled={backendCall || optInDataBackendCall}
                  color={isOptInSecurityAlerts ? "error" : "success"}
                  startIcon={
                    isOptInSecurityAlerts ? (
                      <RemoveCircleOutlineIcon />
                    ) : (
                      <AddCircleOutlineIcon />
                    )
                  }
                  onClick={handelChangeSecurityAlerts}
                >
                  {isOptInSecurityAlerts
                    ? "opt-out for Security Alerts:"
                    : "Opt-in for Security Alerts:"}
                </LoadingButton>{" "}
                Receive alerts about any suspicious activity or unauthorized
                access attempts on your account for enhanced security.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default NotificationPreferences;
