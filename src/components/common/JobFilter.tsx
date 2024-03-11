import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import React, { Dispatch, SetStateAction } from "react";
import * as yup from "yup";

const CustomizedSelectForFormik = (selectProps: selectProps) => {
  const { children, form, field } = selectProps;
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <Select
      label="Locations"
      name={name}
      value={value}
      fullWidth
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}
    >
      {children}
    </Select>
  );
};

type jobPostInfo = {
  _id: string;
  websiteUrl: string;
  companyName: string;
  companyDetails: string;
  location: string;
  industry: string;
  position: string;
  jobDescription: string;
  requiredQualifications: string[];
  workingHoursPerDay: number;
  jobRole: string;
  savedJob: boolean;
};

type props = {
  jobPostInfo: jobPostInfo[];
  setJobPostInfo: Dispatch<SetStateAction<never[]>>;
};

type initialValues = {
  location: string;
};

type selectProps = {
  children: React.ReactNode;
  form: FormikProps<initialValues>;
  field: {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    ref: React.Ref<HTMLInputElement>;
    type: string;
    id: string;
    placeholder: string;
    multiline: boolean;
    rows: number;
    maxRows: number;
    minRows: number;
    fullWidth: boolean;
    required: boolean;
    label: string;
    error: boolean;
  };
};

function JobFilter(props: props) {
  const { jobPostInfo, setJobPostInfo } = props;
  const initialValues = {
    location: "",
  };

  const filterValidationSchema = yup.object({
    location: yup.string().required("Location is required"),
  });

  const handleFilter = () => {};

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Formik
        initialValues={initialValues}
        onSubmit={handleFilter}
        validationSchema={filterValidationSchema}
        enableReinitialize
      >
        {(formik) => {
          const { isValid, dirty, values, errors, setFieldValue } = formik;
          return (
            <Form>
              <Grid
                container
                item
                alignItems="center"
                justifyContent="center"
                gap={10}
              >
                <Grid item>
                  <FormControl error={!!errors.location} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Locations
                    </InputLabel>
                    <Field
                      fullWidth
                      name="location"
                      component={CustomizedSelectForFormik}
                    >
                      {/* {locationsArray.map((item) => ( */}
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        // key={item}
                        // value={item}
                      >
                        {/* {item} */}
                      </MenuItem>
                      {/* ))} */}
                    </Field>

                    <FormHelperText error={!!errors.location}>
                      {errors.location}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item>
                  <FormControl error={!!errors.location} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Locations
                    </InputLabel>
                    <Field
                      fullWidth
                      name="location"
                      component={CustomizedSelectForFormik}
                    >
                      {/* {locationsArray.map((item) => ( */}
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        // key={item}
                        // value={item}
                      >
                        {/* {item} */}
                      </MenuItem>
                      {/* ))} */}
                    </Field>

                    <FormHelperText error={!!errors.location}>
                      {errors.location}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item>
                  <FormControl error={!!errors.location} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Locations
                    </InputLabel>
                    <Field
                      fullWidth
                      name="location"
                      component={CustomizedSelectForFormik}
                    >
                      {/* {locationsArray.map((item) => ( */}
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        // key={item}
                        // value={item}
                      >
                        {/* {item} */}
                      </MenuItem>
                      {/* ))} */}
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
              >
                <Grid item>
                  <Button type="submit" size="large" variant="contained">
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Grid>
  );
}

export default JobFilter;
