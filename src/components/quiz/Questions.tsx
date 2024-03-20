"use client";
import { Button, Grid } from "@mui/material";
import React from "react";
import { Formik, Form } from "formik";
import { QuestionCard } from "./QuestionCard";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";
type CodeBlock = {
  code: string;
  language: string;
};

type Answer = {
  text: string;
  isCorrect: boolean;
  image?: string; // Optional Image type
  codeBlock?: CodeBlock; // Optional CodeBlock type
};

type Question = {
  _id: string;
  question: string;
  answers: Answer[];
  image?: string; // Optional Image type
  codeBlock?: CodeBlock; // Optional CodeBlock type
};

type Props = {
  questions: Question[];
  handleSubmit: (values: {}) => void;
  formikRef: any;
  getScoreBackendCall: boolean;
};

const Questions = ({ questions, handleSubmit, formikRef, getScoreBackendCall }: Props) => {

  return (
    <Grid container>
      <Formik
        innerRef={formikRef}
        initialValues={{}}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => {
          return (
            <Form>
              <Grid
                container
                item
                gap={3}
                alignItems="center"
                justifyContent="center"
              >
                <QuestionCard questions={questions} />
                <Grid item xs={"auto"}>
                  <LoadingButton loading={getScoreBackendCall} type="submit" color="success" variant="contained">
                    Finish
                  </LoadingButton>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Grid>
  );
};

export { Questions };
