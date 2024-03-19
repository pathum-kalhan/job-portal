"use client";
import {
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Grid,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useCallback } from "react";
import { Field, Formik } from "formik";
import { Code } from "react-code-blocks";
import { RadioGroup } from "formik-mui";
import yup from "yup"

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

const QuestionCard = ({ questions }: Props) => {


  return (
    <>
      {questions.map((item, index) => (
        <Grid item key={item.question} xs={12}>
          <Card>
            <CardHeader title={`${index + 1}. ${item.question}`} />
            <CardContent>
              <Grid container>
                <Grid
                  container
                  item
                  alignItems="center"
                  justifyContent="center"
                >
                  {item.image && (
                    <Grid item xs={12} mb={3}>
                      <Image
                        src={item.image ?? ""}
                        alt={`${item.question} image`}
                        height={200}
                        width={200}
                      />
                    </Grid>
                  )}
                  {item.codeBlock && (
                    <Grid item xs={12} mb={3}>
                      <Code
                        text={item.codeBlock.code ?? ""}
                        language={item.codeBlock.language ?? ""}
                        showLineNumbers
                      />
                    </Grid>
                  )}

                
                        <Grid item xs={12}>
                          <Field component={RadioGroup} name={item.question}>
                            {item.answers.map((answer, answerIndex) => (
                              <FormControlLabel
                                key={answer.text}
                                value={answer.text}
                                control={<Radio />}
                                label={
                                  answer.codeBlock ? (
                                    <Code
                                      text={answer.codeBlock.code}
                                      language={answer.codeBlock.language}
                                      showLineNumbers
                                    />
                                  ) : answer.image ? (
                                    <Stack>
                                      <Typography> {answer.text}</Typography>
                                      <Image
                                        src={answer.image ?? ""}
                                        alt={`${item?.question} image`}
                                        height={100}
                                        width={100}
                                      />
                                    </Stack>
                                  ) : (
                                    answer.text
                                  )
                                }
                              />
                            ))}
                          </Field>
                        </Grid>
                 
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export { QuestionCard };
