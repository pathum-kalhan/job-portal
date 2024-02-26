import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  Grid,
} from "@mui/material";

const validationSchema = Yup.object({
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
  priorityLevel: Yup.string().required("Priority level is required"),
  attachment: Yup.mixed(),
});

const priorityLevels = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const SupportTicketForm = () => {
  const initialValues = {
    subject: "",
    message: "",
    priorityLevel: "",
    attachment: null,
  };

  const handleSubmit = (values: any) => {
    console.log(values);
    // Here you can handle form submission
  };

  return (
    <Grid container>
      <Grid container item xs={12} alignItems="center" justifyContent="center" gap={5}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Grid item xs={12} mb={2}>
                <Field
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
                <Field
                  as={TextField}
                  type="file"
                  name="attachment"
                  label="Attachment"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export { SupportTicketForm };
