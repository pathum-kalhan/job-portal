import { LoadingButton } from "@mui/lab";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  Button,
} from "@mui/material";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReviewsIcon from "@mui/icons-material/Reviews";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SnackBarComponent from "../common/SnackBarComponent";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AlertType } from "../../utils/types/genaral-types";

type props = {
  backendCall: boolean;
  optInDataBackendCall: boolean;
  alert: AlertType
  setAlert: (alert: AlertType) => void;
  setBackendCall: (backendCall: boolean) => void;
  isOptInNewsLetterData: boolean;
};

function AccountSettings(props: props) {
  const { backendCall, optInDataBackendCall, alert, setAlert, setBackendCall, isOptInNewsLetterData } =
    props;
  
  const router = useRouter();
  const { data: session } = useSession();
  const [isOptInNewsLetter, setIsOptInNewsLetter] = useState(isOptInNewsLetterData);

  const [ backendCallPromoAndNewsLetterOptIn, setBackendCallPromoAndNewsLetterOptIn ] = useState(false);

  const handelChangeNewsLetterOpt = useCallback(async () => {
    setBackendCallPromoAndNewsLetterOptIn(true);
    try {
      const response = await fetch(
        "/api/notifications/promoAndNewsLetterOptIn",
        {
          method: "POST",
          body: JSON.stringify({
            // @ts-ignore
            userRole: session?.user?.role,
            promoAndNewsLetterOptIn: !isOptInNewsLetter,
          }),
        }
      );

      if (response.status !== 200) {
        setBackendCallPromoAndNewsLetterOptIn(false);
        setAlert({
          show: true,
          message: "Failed to update newsletter Opt-in status",
          severity: "error",
        });
      } else {
        setAlert({
          show: true,
          message: "Newsletter Opt-in status updated successfully",
          severity: "success",
        });
        setIsOptInNewsLetter(!isOptInNewsLetter);
        setBackendCallPromoAndNewsLetterOptIn(false);
      }
    } catch (error) {
      setBackendCallPromoAndNewsLetterOptIn(false);
    }

    // @ts-ignore
    //eslint-disable-next-line
  }, [isOptInNewsLetter, session?.user?.role]);

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
    // eslint-disable-next-line
  }, [router, session?.user?.role]);

  return (
    <>
      <SnackBarComponent alert={alert} setAlert={setAlert} />

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
                  <LoadingButton
                    disabled={backendCall || optInDataBackendCall}
                    loading={backendCallPromoAndNewsLetterOptIn}
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
                  </LoadingButton>{" "}
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
                    disabled={backendCall || optInDataBackendCall}
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
                  <Link href="/dashboard/help">
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
    </>
  );
}

export default AccountSettings;
