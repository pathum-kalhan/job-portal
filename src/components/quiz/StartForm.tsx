"use client";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import SportsScoreIcon from "@mui/icons-material/SportsScore";

type Props = {
  handleStatus?: (val:string)=>void;
};

const StartForm = ({ handleStatus }: Props) => {
  const [initialValues, setInitialValues] = useState({
    name: "",
  });
  const handleSubmit = (value: {name:string}) => {
    console.log("value", value);
    if(handleStatus){
      handleStatus('questions')
    }
  };

  return (
    <Card>
      <CardHeader title="Welcome to the Quiz" sx={{ textAlign: "center" }} />
      <CardContent>
        <Grid container>
          <Grid container item alignItems="center" justifyContent="center">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {(formik) => {
                const { isValid, dirty } = formik;
                return (
                  <Form>
                    <Grid item>
                      <Button
                        type="submit"
                        variant="contained"
                        endIcon={<SportsScoreIcon />}
                      >
                        Start
                      </Button>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export { StartForm };
