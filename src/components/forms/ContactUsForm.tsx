import React, { useCallback, useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as yup from "yup";
import {
  TextField,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SnackBarComponent from "../common/SnackBarComponent";
import { AlertType } from "../../utils/types/general-types";


type initialValuesType = {
  name: string;
  email: string;
  message: string;
};

const ContactUsForm: React.FC = () => {
  const [backendCall, setBackendCall] = useState(false);
  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });

  const initialValues: initialValuesType = {
    name: "",
    email: "",
    message: "",
  };

  const contactUsValidationSchema = yup.object({
    name: yup.string().required("Required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    message: yup.string().required("Required"),
  });

  const handleSubmit = useCallback(
    async (
      values: initialValuesType,
      formikHelpers: FormikHelpers<initialValuesType>
    ) => {
      try {
        setBackendCall(true);

        const payLoad = {
          message: values.message,
          senderEmail: values.email,
          SenderName: values.name,
        };

        const response = await fetch("/api/contactUsForm", {
          method: "POST",
          body: JSON.stringify(payLoad),
        });

        if (response.status !== 200) {
          setBackendCall(false);

          const { message } = await response.json();
          setAlert({
            show: true,
            message:
              typeof message === "string"
                ? message
                : "Message send failed due to server error, please try again!",
            severity: "error",
          });
        } else {
          setBackendCall(false);

          setAlert({
            show: true,
            message: "Message sent successfully!",
            severity: "success",
          });
          formikHelpers.resetForm();
        }
      } catch (error) {
        setAlert({
          show: true,
          message: typeof error === "string" ? error : "Server Error",
          severity: "error",
        });

        setBackendCall(false);
      }
    },

    []
  );

  return (
    <Card>
       <SnackBarComponent alert={alert} setAlert={setAlert} />
      <CardHeader
        title="Send us a message"
        sx={{ textTransform: "uppercase", textAlign: "center" }}
      />
      <CardContent>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={contactUsValidationSchema}
          enableReinitialize
        >
          {(formik) => {
            const { isValid, dirty, errors, touched } = formik;
            return (
              <Form>
                <Field
                  disabled={backendCall}
                  fullWidth
                  name="name"
                  label="Name"
                  as={TextField}
                  margin="normal"
                  error={errors.name && touched.name}
                  helperText={errors.name && touched.name ? errors.name : ""}
                />
                <Field
                  disabled={backendCall}
                  fullWidth
                  name="email"
                  label="Email"
                  as={TextField}
                  margin="normal"
                  error={errors.email && touched.email}
                  helperText={errors.email && touched.email ? errors.email : ""}
                />
                <Field
                  disabled={backendCall}
                  fullWidth
                  name="message"
                  label="Message"
                  as={TextField}
                  multiline
                  rows={4}
                  margin="normal"
                  error={errors.message && touched.message}
                  helperText={
                    errors.message && touched.message ? errors.message : ""
                  }
                />
                <LoadingButton
                  loading={backendCall}
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!isValid || !dirty}
                >
                  Submit
                </LoadingButton>
              </Form>
            );
          }}
        </Formik>
      </CardContent>
    </Card>
  );
};

export { ContactUsForm };
