import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Card, CardContent, CardHeader } from '@mui/material';

const ContactUsForm: React.FC = () => {
  const initialValues = {
    name: '',
    email: '',
    message: '',
  };

  const accountValidationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    message: Yup.string().required('Required'),
  });

  const handleSubmit = (values: typeof initialValues, { resetForm }: any) => {
    // Handle form submission here
    console.log(values);
    resetForm();
  };

  return (
    <Card>
      <CardHeader title="Send us a message" sx={{textTransform:"uppercase", textAlign:"center"}} />
    <CardContent>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={accountValidationSchema}
        enableReinitialize
      >
        {({ isValid, dirty }) => (
          <Form>
            <Field
              fullWidth
              name="name"
              label="Name"
              component={TextField}
              margin="normal"
            />
            <Field
              fullWidth
              name="email"
              label="Email"
              component={TextField}
              margin="normal"
            />
            <Field
              fullWidth
              name="message"
              label="Message"
              component={TextField}
              multiline
              rows={4}
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isValid || !dirty}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      </CardContent>
      </Card>
  );
};

export {ContactUsForm};
