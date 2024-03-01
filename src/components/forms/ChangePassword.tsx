import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import router from "next/router";
import { signOut } from "next-auth/react";

// Define prop types for the ChangePassword component
type ChangePasswordProps = {
  open: boolean;
  onClose: () => void;
};

type initialValues = {
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
}

type Alert = {
  show: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
};


const ChangePassword: React.FC<ChangePasswordProps> = ({ open, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  const [backendCall, setBackendCall] = useState(false);
  const [alert, setAlert] = useState<Alert>({
    show: false,
    message: "",
    severity: "success",
  });

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current Password is required"),
    newPassword: Yup.string()
      .required("New Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.newPassword === value || value === null;
      }),
  });

  const handleSubmit = async (
    values: initialValues,
    formikHelpers: FormikHelpers<initialValues>) => {
    setBackendCall(true);
    try {
      setBackendCall(true); 

      const response = await fetch("/api/change-password", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.status !== 200) {
        setBackendCall(false);
        setAlert({
          show: true,
          message: "Something went wrong!",
          severity: "error",
        });
      } else {
        
        setBackendCall(false);
        setAlert({
          show: true,
          message: "Password changed successfully!",
          severity: "success",
        });
        formikHelpers.resetForm(); 
        handleClose()
        signOut({ redirect: false, callbackUrl: "/" });
        router.replace("/login");
       
      }
 
    } catch (error) {
      setBackendCall(false);
      setAlert({
        show: true,
        message: "Server Error",
        severity: "error",
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Change Password</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ dirty, isValid }: any) => (
          <Form>
            <DialogContent>
              <Field
                name="currentPassword"
                as={TextField}
                label="Current Password"
                type="password"
                fullWidth
                margin="normal"
              />
              <ErrorMessage name="currentPassword" component="div" />

              <Field
                name="newPassword"
                as={TextField}
                label="New Password"
                type="password"
                fullWidth
                margin="normal"
              />
              <ErrorMessage name="newPassword" component="div" />

              <Field
                name="confirmPassword"
                as={TextField}
                label="Confirm Password"
                type="password"
                fullWidth
                margin="normal"
              />
              <ErrorMessage name="confirmPassword" component="div" />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <LoadingButton
                loading={backendCall}
                variant="contained"
                type="submit"
                color="success"
                disabled={!isValid || !dirty}
              >
                Change Password
              </LoadingButton>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export { ChangePassword };
