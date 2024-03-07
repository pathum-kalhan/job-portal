"use client";
import { useCallback, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Grid,
  Link,
  Snackbar,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReviewsIcon from "@mui/icons-material/Reviews";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PasswordIcon from "@mui/icons-material/Password";
import { ChangePassword } from "../../../components/forms/ChangePassword";
import { signOut, useSession } from "next-auth/react";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";

type AlertType = {
  show: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
};

function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const [backendCall, setBackendCall] = useState(false);

  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });
  const [isOptInNewsLetter, setIsOptInNewsLetter] = useState(false);
  const [isOptInJobAlert, setIsOptInJobAlert] = useState(false);
  const [isOptInApplicationStatus, setIsOptInApplicationStatus] =
    useState(false);
  const [isOptInPlatformUpdate, setIsOptInPlatformUpdate] = useState(false);
  const [isOptInSecurityAlerts, setIsOptInSecurityAlerts] = useState(false);

  const [openChangePassword, setOpenChangePassword] = useState(false);

  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
  };

  const handelDeleteAccount = useCallback(async () => {
    try {
      setBackendCall(true);

      const response = await fetch("/api/deleteAccount", {
        method: "DELETE",
        body: JSON.stringify({
          // @ts-ignore
          userRole: session?.user?.role,
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
              : "Account deletion failed due to server error, please try again!",
          severity: "error",
        });
      } else {
        setBackendCall(false);

        setAlert({
          show: true,
          message: "Account deleted successfully!",
          severity: "success",
        });
        
        await signOut({ redirect: false, callbackUrl: "/" });

        setTimeout(() => {
          router.replace("/login");
        }, 2000);
      }
    } catch (error) {
      setBackendCall(false);
      setAlert({
        show: true,
        message: "Server Error",
        severity: "error",
      });
    }

    // @ts-ignore
  }, [router, session?.user?.role]);

  const handleOpenChangePassword = () => {
    setOpenChangePassword(true);
  };

  const handelChangeNewsLetterOpt = () => {
    setIsOptInNewsLetter((oldVal) => !oldVal);
  };

  const handelChangeJobAlert = () => {
    setIsOptInJobAlert((oldVal) => !oldVal);
  };

  const handelChangeApplicationStatus = () => {
    setIsOptInApplicationStatus((oldVal) => !oldVal);
  };
  const handelChangePlatformUpdate = () => {
    setIsOptInPlatformUpdate((oldVal) => !oldVal);
  };
  const handelChangeSecurityAlerts = () => {
    setIsOptInSecurityAlerts((oldVal) => !oldVal);
  };

  return (
    <>
      <Snackbar
        open={!!alert?.show}
        autoHideDuration={3000}
        onClose={() =>
          setAlert({
            show: false,
            message: "",
            severity: "success",
          })
        }
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() =>
            setAlert({
              show: false,
              message: "",
              severity: "success",
            })
          }
          severity={alert?.severity}
        >
          {alert?.message}
        </Alert>
      </Snackbar>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>Account Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Welcome to your Account Settings page! Here, you can manage and
            personalize your Career Guide Pro account to suit your preferences
            and needs.{" "}
          </Typography>
          <br></br>

          <Grid container>
            <Grid container item>
              <Grid item>
                <Typography fontWeight={"bold"} fontSize={"0.9rem"}>
                  Profile Information
                </Typography>

                <Typography>
                  <Link href="/dashboard/profile">
                    <Button startIcon={<ManageAccountsIcon />}>Update</Button>
                  </Link>{" "}
                  name, email address, contact information, and profile picture.
                </Typography>
              </Grid>

              <Grid item xs={12} mt={2}>
                <Typography fontWeight={"bold"} fontSize={"0.9rem"}>
                  Communication Preferences
                </Typography>
                <Typography>
                  <Button
                    color={isOptInNewsLetter ? "error" : "success"}
                    startIcon={
                      isOptInNewsLetter ? (
                        <RemoveCircleOutlineIcon />
                      ) : (
                        <AddCircleOutlineIcon />
                      )
                    }
                    onClick={handelChangeNewsLetterOpt}
                  >
                    {isOptInNewsLetter ? "opt-out" : "Opt-in"}
                  </Button>{" "}
                  of promotional emails and newsletters as per your preference.
                </Typography>
              </Grid>

              <Grid item xs={12} mt={2}>
                <Typography fontWeight={"bold"} fontSize={"0.9rem"}>
                  Account management
                </Typography>
                <Typography>
                  <LoadingButton
                    loading={backendCall}
                    disabled={backendCall}
                    color={"error"}
                    startIcon={<DeleteForeverIcon />}
                    onClick={handelDeleteAccount}
                  >
                    Delete
                  </LoadingButton>{" "}
                  account permanently.
                </Typography>
              </Grid>

              <Grid item xs={12} mt={2}>
                <Typography fontWeight={"bold"} fontSize={"0.9rem"}>
                  Feedback and Support
                </Typography>
                <Typography>
                  <Link href="/help">
                    <Button color="success" startIcon={<ReviewsIcon />}>
                      Provide feedback
                    </Button>
                  </Link>{" "}
                  to help us improve your experience on Career Guide Pro.
                </Typography>

                <Typography>
                  <Link href="/contact-us">
                    <Button color="secondary" startIcon={<SupportAgentIcon />}>
                      Contact our support
                    </Button>
                  </Link>{" "}
                  team for assistance with any account-related queries or
                  issues.
                </Typography>
                <br />
              </Grid>
            </Grid>

            <Typography component="p" mt={2}>
              Thank you for choosing Career Guide Pro! We&apos;re here to help
              you navigate your career journey with ease and confidence.
            </Typography>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Privacy & Security
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            At Career Guide Pro, we prioritize the privacy and security of your
            personal information. In this section, you can customize your
            privacy settings and ensure that your data always remains protected.{" "}
          </Typography>
          <br></br>

          <Grid container>
            <Grid container item>
              <Grid item>
                <Typography fontWeight={"bold"} fontSize={"0.9rem"}>
                  Security and Compliance
                </Typography>

                <Typography>
                  <Button
                    onClick={handleOpenChangePassword}
                    color="warning"
                    startIcon={<PasswordIcon />}
                  >
                    Change your password
                  </Button>{" "}
                  regularly to ensure the security of your account.
                </Typography>
              </Grid>
            </Grid>
            <Typography component="p" mt={2} fontWeight="bold">
              Your privacy and security are of utmost importance to us. If you
              have any questions or concerns regarding your privacy settings or
              data security, please don&apos;t hesitate to contact our support
              team.
            </Typography>
          </Grid>
        </AccordionDetails>
      </Accordion>

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
            receive timely alerts about job opportunities, application status,
            and platform updates.{" "}
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
                      <Button
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
                      </Button>{" "}
                      Receive notifications about new job postings that match
                      your preferences and qualifications.
                    </Typography>
                  </>
                )}

                {/* @ts-ignore */}
                {session && session?.user?.role === "candidate" && (
                  <>
                    {" "}
                    <br />
                    <Typography>
                      <Button
                        color={isOptInApplicationStatus ? "error" : "success"}
                        startIcon={
                          isOptInApplicationStatus ? (
                            <RemoveCircleOutlineIcon />
                          ) : (
                            <AddCircleOutlineIcon />
                          )
                        }
                        onClick={handelChangeJobAlert}
                      >
                        {isOptInApplicationStatus
                          ? "opt-out for Status Updates:"
                          : "Opt-in for Status Updates:"}
                      </Button>{" "}
                      Stay informed about the status of your job applications,
                      including when they&apos;re viewed by employers or if
                      there are any changes in the hiring process.
                    </Typography>
                  </>
                )}

                <br />
                <Typography>
                  <Button
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
                  </Button>{" "}
                  Be the first to know about new features, improvements, and
                  announcements on Career Guide Pro.
                </Typography>
                <br />
                <Typography>
                  <Button
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
                  </Button>{" "}
                  Receive alerts about any suspicious activity or unauthorized
                  access attempts on your account for enhanced security.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <ChangePassword
        open={openChangePassword}
        onClose={handleCloseChangePassword}
      />
    </>
  );
}

export default Page;
