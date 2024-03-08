"use client";
import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CircularProgress, Stack } from "@mui/material";
import { ChangePassword } from "../../../components/forms/ChangePassword";
import { useSession } from "next-auth/react";
import SnackBarComponent from "@/components/common/SnackBarComponent";
import AccountSettings from "@/components/Accordions/AccountSettings";
import PrivacyPolicy from "@/components/Accordions/PrivacyPolicy";
import NotificationPreferences from "@/components/Accordions/NotificationPreferences";

type AlertType = {
  show: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
};

function Page() {
  const { data: session, status } = useSession();
  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });

  // backend call status
  const [backendCall, setBackendCall] = useState(false);
  const [optInDataBackendCall, setOptInDataBackendCall] = useState(false);

  // opt in status
  const [optInData, setOptInData] = useState({
    jobAlerts: false,
    jobApplicationStatus: false,
    featureUpdatesOptIn: false,
    suspiciousActivitiesOptIn: false,
    promoAndNewsLetterOptIn: false,
  });

  // change password
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
  };
  const handleOpenChangePassword = () => {
    setOpenChangePassword(true);
  };

  // load Database OptIn data
  const getOtpInData = useCallback(async () => {
    try {
      setOptInDataBackendCall(true);

      const response = await fetch("/api/getOPtInData", {
        method: "POST",
        body: JSON.stringify({
          email: session?.user?.email,
          // @ts-ignore
          userRole: session?.user?.role,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.status !== 200) {
        setOptInDataBackendCall(false);
      } else {
        const { data } = await response.json();

        setOptInData(data);

        setOptInDataBackendCall(false);
      }
    } catch (error) {
      setOptInDataBackendCall(false);
      setAlert({
        show: true,
        message: "Server Error",
        severity: "error",
      });
    }

    // @ts-ignore
  }, [session?.user?.email, session?.user?.role]);

  // load Database OptIn data on page load
  useEffect(() => {
    if (status === "authenticated") {
      getOtpInData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <>
      <SnackBarComponent alert={alert} setAlert={setAlert} />
      {status === "loading" || optInDataBackendCall ? (
        <Card>
          <CardContent>
            <Stack alignItems="center" justifyContent="center">
              <CircularProgress />
            </Stack>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Account settings */}
          <AccountSettings
            backendCall={backendCall}
            optInDataBackendCall={optInDataBackendCall}
            alert={alert}
            setAlert={setAlert}
            setBackendCall={setBackendCall}
            isOptInNewsLetterData={optInData?.promoAndNewsLetterOptIn}
          />

          {/* Privacy policy */}
          <PrivacyPolicy handleOpenChangePassword={handleOpenChangePassword} />

          {/* Notification preferences */}
          <NotificationPreferences
            backendCall={backendCall}
            setAlert={setAlert}
            optInDataBackendCall={optInDataBackendCall}
            optInData={optInData}
          />

          {/* Change Password */}
          <ChangePassword
            open={openChangePassword}
            onClose={handleCloseChangePassword}
          />
        </>
      )}
    </>
  );
}

export default Page;
