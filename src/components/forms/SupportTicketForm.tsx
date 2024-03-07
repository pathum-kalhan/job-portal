import React, { useCallback, useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import {
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Typography,
  IconButton,
  Stack,
  Alert,
  Snackbar,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSession } from "next-auth/react";

const priorityLevels = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

type AlertType = {
  show: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
};

type initialValues = {
  subject: string;
  message: string;
  priorityLevel: string;
};

const SupportTicketForm = () => {
  const [payloadFormData, setPayloadFormData] = useState<FormData | null>();
  const [imageData, setImageData] = useState<FormData | null>();
  const [backendCall, setBackendCall] = useState(false);
  const { data: session } = useSession();
  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });

  const validationSchema = Yup.object({
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
    priorityLevel: Yup.string().required("Priority level is required"),
  });

  const initialValues: initialValues = {
    subject: "",
    message: "",
    priorityLevel: "",
  };

  const handleSubmit = useCallback(
    async (values: any, formikHelpers: FormikHelpers<initialValues>) => {
      if (payloadFormData) {
        payloadFormData.append("subject", values.subject as string);
        payloadFormData.append("message", values.message as string);
        // @ts-ignore
        payloadFormData.append("userRole", session?.user?.role as string);
        payloadFormData.append("priorityLevel", values.priorityLevel as string);
        payloadFormData.append(
          "fileExtension",
          // @ts-ignore
          imageData?.name.split(".")[1] as string
        );
        payloadFormData.append(
          "fileType",
          // @ts-ignore
          imageData?.type ?? ("image/jpeg" as string)
        );

        try {
          setBackendCall(true);

          const response = await fetch("/api/sendFeedback", {
            method: "POST",
            body: payloadFormData,
          });

          if (response.status !== 200) {
            setBackendCall(false);

            const { message } = await response.json();
            setAlert({
              show: true,
              message:
                typeof message === "string"
                  ? message
                  : "Ticket creation failed due to server error, please try again!",
              severity: "error",
            });
          } else {
            setBackendCall(false);

            setAlert({
              show: true,
              message: "Ticket created successfully!",
              severity: "success",
            });
            formikHelpers.resetForm();
            setPayloadFormData(null);
            setImageData(null);
          }
        } catch (error) {
          setAlert({
            show: true,
            message: typeof error === "string" ? error : "Server Error",
            severity: "error",
          });

          setBackendCall(false);
        }
      } else {
        setAlert({
          show: true,
          message: "Please upload a picture",
          severity: "error",
        });
      }
    },
    // @ts-ignore
    [imageData?.name, imageData?.type, payloadFormData, session?.user?.role]
  );

  const onDrop = (acceptedFiles: any) => {
    const fileExtension = acceptedFiles[0]?.name.split(".")[1];

    if (
      !(
        fileExtension === "jpg" ||
        fileExtension === "jpeg" ||
        fileExtension === "png" ||
        fileExtension === "svg"
      )
    ) {
      setAlert({
        show: true,
        message: "Please upload a supported picture Type (jpg ,jpeg ,png ,svg)",
        severity: "error",
      });
      return;
    } else if (acceptedFiles[0]?.size > 3599999) {
      setAlert({
        show: true,
        message: `Please upload a picture smaller than 3MB, Uploaded File is ${(
          acceptedFiles[0]?.size / 1000000
        ).toFixed(3)}MB`,
        severity: "error",
      });

      return;
    }
    const file = acceptedFiles[0];

    const imageBlob = new Image();
    imageBlob.src = URL.createObjectURL(file);
    imageBlob.onload = async () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      const maxWidth = 800;
      const maxHeight = 800;

      let width = imageBlob.width;
      let height = imageBlob.height;

      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      context?.drawImage(imageBlob, 0, 0, width, height);

      canvas.toBlob(
        async (blob) => {
          const formData = new FormData();
          formData.append("image", blob as Blob);
          setPayloadFormData(formData);
          setImageData(acceptedFiles[0]);
        },
        "image/jpeg",
        0.8
      );
    };
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
  });

  return (
    <Grid container>
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

      <Grid
        container
        item
        xs={12}
        alignItems="center"
        justifyContent="center"
        gap={5}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            const { errors, touched, isValid, dirty } =
              formik;
            return (
              <Form>
                <Grid item xs={12} mb={2}>
                  <Field
                    disabled={backendCall}
                    as={TextField}
                    name="subject"
                    label="Subject"
                    fullWidth
                    error={errors.subject && touched.subject}
                    helperText={
                      errors.subject && touched.subject ? errors.subject : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} mb={2}>
                  <Field
                    disabled={backendCall}
                    as={TextField}
                    name="message"
                    label="Message"
                    multiline
                    rows={4}
                    fullWidth
                    error={errors.message && touched.message}
                    helperText={
                      errors.message && touched.message ? errors.message : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} mb={2}>
                  <FormControl fullWidth>
                    <InputLabel id="priorityLevelLabel">
                      Priority Level
                    </InputLabel>
                    <Field
                      disabled={backendCall}
                      as={Select}
                      name="priorityLevel"
                      labelId="priorityLevelLabel"
                      label="Priority Level"
                      defaultValue=""
                    >
                      {priorityLevels.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                  {errors.priorityLevel && touched.priorityLevel && (
                    <div>{errors.priorityLevel}</div>
                  )}
                </Grid>
                <Grid item xs={12} mb={2}>
                  <input {...getInputProps()} />
                  <Button
                    variant="contained"
                    disabled={backendCall}
                    color="secondary"
                    endIcon={<AttachFileIcon />}
                    style={{
                      pointerEvents: backendCall ? "none" : "auto",
                    }}
                    {...getRootProps()}
                    className={`dropzone ${isDragActive ? "active" : ""}`}
                  >
                    Select a Attachment
                  </Button>
                  {/* @ts-ignore */}
                  {imageData?.name && (
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {/* @ts-ignore */}
                      <Typography>{imageData?.name}</Typography>
                      <IconButton
                        onClick={() => {
                          setPayloadFormData(null);
                          setImageData(null);
                        }}
                      >
                        <RemoveCircleIcon color="error" />
                      </IconButton>
                    </Stack>
                  )}
                </Grid>
                <LoadingButton
                  loading={backendCall}
                  disabled={!isValid || !dirty}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </LoadingButton>
              </Form>
            );
          }}
        </Formik>
      </Grid>
    </Grid>
  );
};

export { SupportTicketForm };
