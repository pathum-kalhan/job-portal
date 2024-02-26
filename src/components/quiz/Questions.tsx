"use client";
import { Button, Grid } from "@mui/material";
import React from "react";
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
  question: string;
  answers: Answer[];
  image?: string; // Optional Image type
  codeBlock?: CodeBlock; // Optional CodeBlock type
};

type Props = {
  questions: Question[];
};

const Questions = ({ questions }: Props) => {

  const router = useRouter();
  const handleSubmit = (values: {}) => {
    console.log(values);
    router.push("/quizzes/results");
  };


  return (
    <Formik initialValues={{}} onSubmit={handleSubmit}>
      {() => {
        return (
          <Form>
            <Grid container>
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
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export { Questions };
