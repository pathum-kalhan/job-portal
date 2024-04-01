import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import * as yup from "yup";
import { CustomizedSelectForFormik } from "./CustomizedSelectForFormik";
import { jobPostInfo } from "../../utils/types/general-types";

type props = {
  jobPostInfo: jobPostInfo[];
  setJobPostInfo: Dispatch<SetStateAction<any>>;
  backendCall: boolean;
  filterJobPosts: jobPostInfo[];
  setFilterJobPosts: Dispatch<SetStateAction<any>>;
};

type initialValues = {
  location: string;
  industrySelection: string;
  jobRole: string;
};

function JobFilter(props: props) {
  const { jobPostInfo, backendCall, setFilterJobPosts } = props;
  const [industrySelectionArray, setIndustrySelectionArray] = useState<
    string[] | []
  >([]);
  const [locationsArray, setLocationsArray] = useState<string[] | []>([]);
  const [jobRoleArray, setJobRoleArray] = useState<string[] | []>([]);

  const initialValues = {
    location: "",
    industrySelection: "",
    jobRole: "",
  };

  const filterValidationSchema = yup.object({
    location: yup.string(),
    industrySelection: yup.string(),
    jobRole: yup.string(),
  });

  const handleFilter = useCallback(
    (values: initialValues) => {
      const filterJobArray = jobPostInfo.filter((item) => {
        if (
          (values?.location !== "" ? item?.location?.toLowerCase() === values?.location?.toLowerCase() : true) &&
          (values?.jobRole !== "" ? item?.position?.toLowerCase() === values?.jobRole?.toLowerCase() : true) &&
          (values?.industrySelection !== ""
            ? item?.industry?.toLowerCase() === values?.industrySelection?.toLowerCase()
            : true)
        ) {
          return item;
        }
      });

      setFilterJobPosts(filterJobArray);
    },
    [jobPostInfo, setFilterJobPosts]
  );

  const handleReset = useCallback(() => {
    setFilterJobPosts(jobPostInfo);
  }, [setFilterJobPosts, jobPostInfo]);

  useEffect(() => {
    if (!backendCall && jobPostInfo) {
      const extractIndustries = Array.from(
        new Set(jobPostInfo.map((item) => item.industry.toLowerCase()))
      );
      const extractLocations = Array.from(
        new Set(jobPostInfo.map((item) => item.location.toLowerCase()))
      );
      const extractJobRoles = Array.from(
        new Set(jobPostInfo.map((item) => item.position.toLowerCase()))
      );

      setIndustrySelectionArray(extractIndustries);
      setLocationsArray(extractLocations);
      setJobRoleArray(extractJobRoles);
    }
  }, [backendCall, jobPostInfo]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleFilter}
      validationSchema={filterValidationSchema}
      enableReinitialize
    >
      {(formik) => {
        const { dirty, errors, resetForm } = formik;
        return (
          <Form style={{ width: "100%" }}>
            <Grid container alignItems="center" justifyContent="center">
              <Grid
                container
                item
                alignItems="center"
                justifyContent="space-between"
                gap={2}
              >
                <Grid item lg={3} md={3} sm={3} xs={12}>
                  <FormControl error={!!errors.location} fullWidth sx={{ textTransform: "capitalize" }}>
                    <InputLabel id="demo-simple-select-label">
                      Industry Selection
                    </InputLabel>
                    <Field
                      disabled={backendCall || !industrySelectionArray.length}
                      fullWidth
                      name="industrySelection"
                      component={CustomizedSelectForFormik}
                    >
                      {industrySelectionArray.map((item: string) => (
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

                <Grid item lg={3} md={3} sm={3} xs={12}>
                  <FormControl error={!!errors.location} fullWidth sx={{ textTransform: "capitalize" }}>
                    <InputLabel id="demo-simple-select-label">
                      Locations
                    </InputLabel>
                    <Field
                      disabled={backendCall || !locationsArray.length}
                      fullWidth
                      name="location"
                      component={CustomizedSelectForFormik}
                    >
                      {locationsArray.map((item: string) => (
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

                <Grid item lg={3} md={3} sm={3} xs={12}>
                  <FormControl error={!!errors.location} fullWidth sx={{ textTransform: "capitalize" }}>
                    <InputLabel id="demo-simple-select-label">
                      Job Role
                    </InputLabel>
                    <Field
                      disabled={backendCall || !jobRoleArray.length}
                      fullWidth
                      name="jobRole"
                      component={CustomizedSelectForFormik}
                    >
                      {jobRoleArray.map((item: string) => (
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
              </Grid>

              <Grid
                container
                item
                alignItems="center"
                justifyContent="center"
                mt={5}
                lg={12}
                gap={2}
              >
                <Grid item>
                  <Button
                    disabled={
                      !dirty ||
                      backendCall ||
                      (!industrySelectionArray.length &&
                        !locationsArray.length &&
                        !jobRoleArray.length)
                    }
                    type="submit"
                    size="large"
                    variant="contained"
                  >
                    Search
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    onClick={() => {
                      handleReset();
                      resetForm();
                    }}
                    disabled={
                      !dirty ||
                      backendCall ||
                      (!industrySelectionArray.length &&
                        !locationsArray.length &&
                        !jobRoleArray.length)
                    }
                    size="large"
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}

export default JobFilter;
