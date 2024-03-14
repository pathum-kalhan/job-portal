"use client";

import { 
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  FormHelperText,
} from "@mui/material";
import { Formik, Form, Field, FormikProps } from "formik";
import { TextField } from "formik-mui";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import SnackBarComponent from "../../../components/common/SnackBarComponent";
import { CustomizedSelectForFormik } from "../../../components/common/CustomizedSelectForFormik";
import { AlertType, companyInfo } from "../../../utils/types";

 

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


const EmployerEditProfileForm = (props: props) => {
  const [backendCall, setBackendCall] = useState(false);
  const { data: session } = useSession();
  const { getProfileData, initialData, handleCloseEditProfile } = props;

  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });

  const locationsArray = ["colombo", "kandy"];
  const phoneNumberRegex = /^07\d{8}$/;

  const accountValidationSchema = yup.object({
    companyName: yup
      .string()
      .min(1)
      .max(30)
      .required("Company Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    companyContactNo: yup
      .string()
      .matches(phoneNumberRegex, "Please enter a valid mobile number")
      .required("Company Contact No is required"),
    companyDetails: yup
      .string()
      .min(1)
      .max(300)
      .required("Company Details are required"),
    location: yup.string().required("Location is required"),
    websiteUrl: yup
      .string()
      .url("Invalid URL format")
      .required("Website URL is required"),
  });

  const initialValues: companyInfo = {
    companyName: initialData?.name ?? "",
    companyDetails: initialData?.companyDetails ?? "",
    location: initialData?.location ?? "",
    websiteUrl: initialData?.websiteUrl ?? "",
    email: initialData?.email ?? "",
    companyContactNo: initialData?.contactNo ?? "",
  };

  const handleSubmit = async (values: companyInfo) => {
    setBackendCall(true);
    try {
      const payload = {
        name: values.companyName,
        companyDetails: values.companyDetails,
        location: values.location,
        contactNo: values.companyContactNo,
        websiteUrl: values.websiteUrl,
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
        validationSchema={accountValidationSchema}
        enableReinitialize
      >
        {(formik) => {
          const { isValid, dirty, errors } = formik;
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
                      id="companyName"
                      name="companyName"
                      label="Company Name"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
                      id="companyDetails"
                      name="companyDetails"
                      maxRows={3}
                      minRows={3}
                      fullWidth
                      placeholder="Company Details"
                      multiline
                      component={TextField}
                    />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <FormControl error={!!errors.location} fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Locations
                      </InputLabel>
                      <Field
                        fullWidth
                        name="location"
                        component={CustomizedSelectForFormik}
                      >
                        {locationsArray.map((item) => (
                          <MenuItem
                            sx={{ textTransform: "capitalize" }}
                            key={item}
                            value={item}
                          >
                            {item}
                          </MenuItem>
                        ))}
                      </Field>
                      <FormHelperText error={!!errors.location}>
                        {errors.location}
                      </FormHelperText>
                    </FormControl>
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

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
                      fullWidth
                      id="websiteUrl"
                      name="websiteUrl"
                      label="Website Url"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
                      fullWidth
                      id="companyContactNo"
                      name="companyContactNo"
                      label="Company Contact No"
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
                      Create Account
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

export { EmployerEditProfileForm };
