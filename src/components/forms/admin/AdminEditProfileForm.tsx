"use client";

import { Grid } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import SnackBarComponent from "../../common/SnackBarComponent";
import { AlertType, adminInfo } from "../../../utils/types/general-types";

type initialData = {
  name: string;
  companyDetails?: string;
  location?: string;
  contactNo: string;
  email: string;
  websiteUrl?: string;
};

type props = {
  getProfileData: () => void;
  handleCloseEditProfile: () => void;
  initialData: initialData | null;
};

const AdminEditProfileForm = (props: props) => {
  const [backendCall, setBackendCall] = useState(false);
  const { data: session } = useSession();
  const { getProfileData, initialData, handleCloseEditProfile } = props;

  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });

  const employerAccountValidationSchema = yup.object({
    adminName: yup.string().min(1).max(80).required("Company Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const initialValues: adminInfo = {
    adminName: initialData?.name ?? "",
    email: initialData?.email ?? "",
  };

  const handleSubmit = async (values: adminInfo) => {
    setBackendCall(true);
    try {
      const payload = {
        name: values.adminName,
        // @ts-ignore
        userType: session?.user?.role,
      };

      const response = await fetch("/api/updateUserData", {
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
          message: "Company details updated successfully!",
          severity: "success",
        });
        // re load auth data
        handleCloseEditProfile();
        getProfileData();
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
    <>
      <SnackBarComponent alert={alert} setAlert={setAlert} />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={employerAccountValidationSchema}
        enableReinitialize
      >
        {(formik) => {
          const { isValid, dirty } = formik;
          return (
            <Form>
              <Grid container alignItems="center" justifyContent="center">
                <Grid
                  item
                  container
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                >
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
                      fullWidth
                      id="adminName"
                      name="adminName"
                      label="Company Name"
                      component={TextField}
                    />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
                      fullWidth
                      disabled
                      id="email"
                      name="email"
                      label="Email"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item lg={"auto"}>
                    <LoadingButton
                      loading={backendCall}
                      disabled={!isValid || !dirty}
                      color="primary"
                      variant="contained"
                      size="large"
                      type="submit"
                    >
                      Update Account
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { AdminEditProfileForm };
