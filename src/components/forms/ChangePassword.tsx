import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Define prop types for the ChangePassword component
type ChangePasswordProps = {
  open: boolean;
  onClose: () => void;
};

const ChangePassword: React.FC<ChangePasswordProps> = ({ open, onClose }) => {
  const handleClose = () => {
    onClose();
  };

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

  const handleSubmit = (values: any) => {
    console.log(values);
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
              <Button
                onClick={handleClose}
                color="secondary"
                disabled={!dirty || !isValid}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                disabled={!isValid || !dirty}
              >
                Change Password
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export { ChangePassword };
