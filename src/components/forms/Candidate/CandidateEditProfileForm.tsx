"use client";

import SnackBarComponent from "@/components/common/SnackBarComponent";
import { LoadingButton } from "@mui/lab";
import {
  Chip,
  Grid,
  TextField as MUITextField,
  Autocomplete,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import * as yup from "yup";

type initialValues = {
  name: string;
  linkedInProfileUrl: string;
  contactNo: string;
  email: string;
  educationalBackground: string;
  workExperience: string;
  skillsAndCertifications: string[];
};

type initialData = {
  name?: string;
  linkedInProfileUrl?: string;
  contactNo?: string;
  email?: string;
  education?: string;
  experience?: string;
  skills?: string[];
};

type AlertType = {
  show: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
};

type props = {
  getProfileData: () => void;
  handleCloseEditProfile: () => void;
  initialData: initialData | null;
};

const CandidateEditProfileForm = (props: props) => {
  const { getProfileData, initialData, handleCloseEditProfile } = props;

  const [skillsArray, setSkillsArray] = useState([]);
  const phoneNumberRegex = /^07\d{8}$/;
  const { data: session } = useSession();

  const [backendCall, setBackendCall] = useState(false);
  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });

  const accountValidationSchema = yup.object({
    name: yup.string().min(1).max(30).required("Name is required"),
    linkedInProfileUrl: yup.string().url("Invalid URL format"),
    email: yup.string().email("Invalid email format"),
    contactNo: yup
      .string()
      .matches(phoneNumberRegex, "Please enter a valid mobile number"),
    educationalBackground: yup.string(),
    workExperience: yup.string(),
    skillsAndCertifications: yup
      .array()
      .min(1, "Please select at least one skill"),
  });

  const initialValues: initialValues = {
    name: initialData?.name ?? "",
    linkedInProfileUrl: initialData?.linkedInProfileUrl ?? "",
    contactNo: initialData?.contactNo ?? "",
    email: initialData?.email ?? "",
    educationalBackground: initialData?.education ?? "",
    workExperience: initialData?.experience ?? "",
    skillsAndCertifications: initialData?.skills ?? [],
  };

  const handleSubmit = async (values: initialValues) => {
    setBackendCall(true);
    try {
      const payload = {
        name: values.name,
        linkedInProfileUrl: values.linkedInProfileUrl,
        contactNo: values.contactNo,
        education: values.educationalBackground,
        experience: values.workExperience,
        skills: values.skillsAndCertifications,

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
          message: (typeof errorMessage?.message === "string" && errorMessage?.message) ?? "Something went wrong!",
          severity: "error",
        });
      } else {
        setBackendCall(false);
        setAlert({
          show: true,
          message: "User details updated successfully!",
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

  const getSkills = useCallback(async () => {
    try {
      const response = await fetch("/api/candidate/getAllSkills", {
        method: "POST",
        body: JSON.stringify({
          // @ts-ignore
          userRole: session?.user?.role,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setSkillsArray(data.data);
    } catch (error) {
      console.log("error", error);
    }
          // @ts-ignore
  }, [session?.user?.role]);

  useEffect(() => {
    getSkills();
  }, [getSkills]);

  return (
    <>
      <SnackBarComponent autoHideDuration={null} alert={alert} setAlert={setAlert} />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={accountValidationSchema}
        enableReinitialize
      >
        {(formik) => {
          const { errors, isValid, dirty, values, setFieldValue } = formik;
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
                      id="name"
                      name="name"
                      label="Name"
                      component={TextField}
                    />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      disabled
                      component={TextField}
                    />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
                      fullWidth
                      id="linkedInProfileUrl"
                      name="linkedInProfileUrl"
                      label="LinkedIn Profile URL"
                      component={TextField}
                    />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
                      fullWidth
                      id="contactNo"
                      name="contactNo"
                      label="Contact Number"
                      component={TextField}
                    />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
                      id="educationalBackground"
                      name="educationalBackground"
                      maxRows={3}
                      minRows={3}
                      fullWidth
                      placeholder="Educational Background"
                      multiline
                      component={TextField}
                    />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Field
                      id="workExperience"
                      name="workExperience"
                      maxRows={3}
                      minRows={3}
                      fullWidth
                      placeholder="Work Experience"
                      multiline
                      component={TextField}
                    />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Autocomplete
                      multiple
                      freeSolo
                      options={skillsArray}
                      value={values.skillsAndCertifications}
                      onChange={(event, value) => {
                        setFieldValue("skillsAndCertifications", value);
                      }}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            label={option}
                            {...getTagProps({ index })}
                            key={option}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <Field
                          {...params}
                          variant="outlined"
                          value={values.skillsAndCertifications}
                          label="Skills and Certifications"
                          placeholder="+ Add Skills"
                          component={MUITextField}
                          name="skillsAndCertifications"
                          error={!!errors.skillsAndCertifications}
                          helperText={errors.skillsAndCertifications}
                        />
                      )}
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
                      Edit Profile
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

export { CandidateEditProfileForm };
