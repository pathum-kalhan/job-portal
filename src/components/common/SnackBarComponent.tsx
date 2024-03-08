import { Alert, Snackbar } from "@mui/material";
import React from "react";

type props = {
  alert: {
    show: boolean;
    message: string;
    severity: "success" | "error" | "warning" | "info";
  };
  setAlert: (alert: {
    show: boolean;
    message: string;
    severity: "success" | "error" | "warning" | "info";
  }) => void;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "right" | "center";
  };
  autoHideDuration?: number | null | undefined
};

function SnackBarComponent(props: props) {
  const {
    alert,
    setAlert,
    anchorOrigin = { vertical: "top", horizontal: "center" },
    autoHideDuration= 3000
  } = props;
  return (
    <Snackbar
      open={!!alert?.show}
      autoHideDuration={autoHideDuration}
      onClose={() =>
        setAlert({
          show: false,
          message: "",
          severity: "success",
        })
      }
      anchorOrigin={{
        vertical: anchorOrigin.vertical,
        horizontal: anchorOrigin.horizontal,
      }}
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
  );
}

export default SnackBarComponent;