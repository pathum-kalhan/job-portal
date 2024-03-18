import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SnackBarComponent from "../common/SnackBarComponent";
import { AlertType } from "../../utils/types/genaral-types";

// Define prop types for the ChangePassword component
type ChangePasswordProps = {
  open: boolean;
  onClose: () => void;
};

type initialValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
 

const ChangePassword: React.FC<ChangePasswordProps> = ({ open, onClose }) => {
  const { data: session } = useSession();

  const router = useRouter();

  const handleClose = () => {
    onClose();
  };

  const [backendCall, setBackendCall] = useState(false);

  const [oldPasswordVisibility, setOldPasswordVisibility] = useState(false);
  const [newPasswordVisibility, setNewPasswordVisibility] = useState(false);
  const [newConfirmPasswordVisibility, setNewConfirmPasswordVisibility] = useState(false);

  const [alert, setAlert] = useState<AlertType>({
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
    formikHelpers: FormikHelpers<initialValues>
  ) => {
    setBackendCall(true);
    try {
      const payload = {
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
        // @ts-ignore
        userType: session?.user?.role,
      };

      const response = await fetch("/api/change-password", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.status !== 200) {
        const errorMessage = await response.json();
        setBackendCall(false);
        setAlert({
          show: true,
          message:
            (typeof errorMessage?.message === "string" &&
              errorMessage?.message) ??
            "Something went wrong!",
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
        signOut({ redirect: false, callbackUrl: "/" });
        router.push("/login");
        handleClose();
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
                fullWidth
                margin="normal"
                type={oldPasswordVisibility ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      style={{ outline: "none", cursor: "pointer" }}
                      onClick={() =>
                        setOldPasswordVisibility(!oldPasswordVisibility)
                      }
                    >
                      {oldPasswordVisibility ? (
                        <RemoveRedEyeIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
              <ErrorMessage name="currentPassword" component="div" />

              <Field
                name="newPassword"
                as={TextField}
                label="New Password"
                fullWidth
                margin="normal"
                type={newPasswordVisibility ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      style={{ outline: "none", cursor: "pointer" }}
                      onClick={() =>
                        setNewPasswordVisibility(!newPasswordVisibility)
                      }
                    >
                      {newPasswordVisibility ? (
                        <RemoveRedEyeIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
              <ErrorMessage name="newPassword" component="div" />

              <Field
                name="confirmPassword"
                as={TextField}
                type={newConfirmPasswordVisibility ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      style={{ outline: "none", cursor: "pointer" }}
                      onClick={() =>
                        setNewConfirmPasswordVisibility(!newConfirmPasswordVisibility)
                      }
                    >
                      {newConfirmPasswordVisibility ? (
                        <RemoveRedEyeIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </InputAdornment>
                  ),
                }}
                label="Confirm Password"
                fullWidth
                margin="normal"
              />
              <ErrorMessage name="confirmPassword" component="div" />
            </DialogContent>

            <SnackBarComponent autoHideDuration={null} alert={alert} setAlert={setAlert} />

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
