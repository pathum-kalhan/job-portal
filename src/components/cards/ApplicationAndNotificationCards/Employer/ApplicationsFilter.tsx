import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Button,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import SearchIcon from "@mui/icons-material/Search";
import { applicationType } from "../../../../utils/types/general-types";
import { CustomizedSelectForFormik } from "../../../../components/common/CustomizedSelectForFormik";

type props = {
  applicationsList: applicationType[];
  setApplicationsListFilter: React.Dispatch<
    React.SetStateAction<applicationType[]>
  >;
  backendCall: boolean;
};

type initialValuesProps = {
  industry: "";
  jobRole: "";
};

function ApplicationsFilter(props: props) {
  const { applicationsList, setApplicationsListFilter, backendCall } = props;

  const [industrySelectionArray, setIndustrySelectionArray] = useState<
    string[] | []
  >([]);
  const [jobRoleSelectionArray, setJobRoleSelectionArray] = useState<
    string[] | []
  >([]);

  const initialValues: initialValuesProps = {
    industry: "",
    jobRole: "",
  };

  const handleReset = useCallback(() => {
    setApplicationsListFilter(applicationsList);
  }, [applicationsList, setApplicationsListFilter]);

  const filterValidationSchema = yup.object({
    industry: yup.string(),
    jobRole: yup.string(),
  });

  const filterApplications = useCallback(
    async (values: initialValuesProps) => {
      const filteredApplications = applicationsList.filter((item) => {
        if (
          (values?.industry !== "" ? item?.industry?.toLowerCase() === (`${values?.industry}`).toLowerCase() : true) &&
          (values?.jobRole !== "" ? item?.jobRole?.toLowerCase() === (`${values?.jobRole}`)?.toLowerCase() : true)
        ) {
          return item;
        }
      });

      setApplicationsListFilter(filteredApplications);
    },
    [applicationsList, setApplicationsListFilter]
  );

  useEffect(() => {
    if (!backendCall && applicationsList) {
      const extractIndustries = Array.from(
        new Set(applicationsList.map((item) => item.industry.toLowerCase()))
      );
      const extractJobRoles = Array.from(
        new Set(applicationsList.map((item) => item.jobRole.toLowerCase()))
      );

      setJobRoleSelectionArray(extractJobRoles);
      setIndustrySelectionArray(extractIndustries);
    }
  }, [backendCall, applicationsList]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={filterApplications}
      validationSchema={filterValidationSchema}
      enableReinitialize
    >
      {(formik) => {
        const { dirty, errors, resetForm } = formik;
        return (
          <Form style={{ width: "100%" }}>
            <Grid
              container
              item
              alignItems="center"
              justifyContent="center"
              xs={12}
              gap={3}
            >
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <FormControl error={!!errors.industry} fullWidth sx={{ textTransform: "capitalize" }}>
                  <InputLabel id="demo-simple-select-label">
                    Industry Selection
                  </InputLabel>
                  <Field
                    disabled={backendCall}
                    fullWidth
                    name="industry"
                    component={CustomizedSelectForFormik}
                  >
                    {industrySelectionArray.map((item: string) => (
                      <MenuItem key={item} value={item} sx={{ textTransform: "capitalize" }}>
                        {item}
                      </MenuItem>
                    ))}
                  </Field>

                  <FormHelperText error={!!errors.industry}>
                    {errors.industry}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item lg={3} md={3} sm={12} xs={12}>
                <FormControl error={!!errors.jobRole} fullWidth sx={{ textTransform: "capitalize" }}>
                  <InputLabel id="demo-simple-select-label">
                    Job Role
                  </InputLabel>
                  <Field
                    disabled={backendCall}
                    fullWidth
                    name="jobRole"
                    component={CustomizedSelectForFormik}
                  >
                    {jobRoleSelectionArray.map((item: string) => (
                      <MenuItem key={item} value={item} sx={{ textTransform: "capitalize" }}>
                        {item}
                      </MenuItem>
                    ))}
                  </Field>

                  <FormHelperText error={!!errors.jobRole}>
                    {errors.jobRole}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item>
                <Button
                  disabled={
                    !dirty ||
                    backendCall ||
                    (!industrySelectionArray.length &&
                      !jobRoleSelectionArray.length)
                  }
                  type="submit"
                  startIcon={<SearchIcon />}
                  sx={{ borderRadius: 2 }}
                  variant="contained"
                  fullWidth
                >
                  Search Applications
                </Button>
              </Grid>

              <Grid item>
                <Button
                  disabled={
                    !dirty ||
                    backendCall ||
                    (!industrySelectionArray.length &&
                      !jobRoleSelectionArray.length)
                  }
                  onClick={() => {
                    handleReset();
                    resetForm();
                  }}
                  sx={{ borderRadius: 2 }}
                  fullWidth
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ApplicationsFilter;
