"use client";
import { Button, Grid } from "@mui/material";
import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import { QuestionCard } from "./QuestionCard";
import { useRouter } from "next/navigation";
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
};

const Questions = ({ questions, handleSubmit, formikRef }: Props) => {
  const router = useRouter();


  // const quizValidationSchema = yup.object({

  // });

  const initialValues = {};

  return (
    <Grid container>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        // validationSchema={quizValidationSchema}
        enableReinitialize
      >
        {(formik) => {
          const { isValid, dirty, errors, touched, values } = formik;
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
                  <Button type="submit" color="success" variant="contained">
                    Finish
                  </Button>
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
