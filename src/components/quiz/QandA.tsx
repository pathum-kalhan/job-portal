"use client";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Code } from "react-code-blocks";
import { CountDownTimer } from "./CountDownTimer";
import { ScoreDialogBox } from "./ScoreDialogBox";
import { StartForm } from "./StartForm";

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

type FormValues = {
  [index: number]: string;
};

type Props = {
  questions: Question[];
};

const QandA = ({ questions }: Props) => {
  const [status, setStatus] = useState("start");


  const handleStatus= (statusVal:string) => {
    setStatus(statusVal);
  };

  const handleCloseEditProfile = () => {
    setStatus("start");
  };

  const onTimeout = () => {
    console.log("Time's up!");
    setStatus("finished");
  };

  const handleSubmit = (values: {answersFormControlLabel: string[]}) => {
    console.log(values);

    const parseAnswers = values.answersFormControlLabel.map(
      (item, index) =>
        item && {
          question: questions[index].question,
          answer: JSON.parse(item).text,
        }
    );
    setStatus("finished");
    console.log("parseAnswers", parseAnswers);
  };

  return (
    <Grid container>
      {status === "start" && (
        <Grid
          container
          item
          alignItems="center"
          justifyContent="center"
          gap={3}
        >
          <Grid item sm={7} xs={12}>
            <StartForm handleStatus={handleStatus} />
          </Grid>
        </Grid>
      )}

      {status === "questions" && (
        <Grid
          container
          item
          alignItems="center"
          justifyContent="center"
          gap={3}
        >
          <Grid item xs={12}>
            <CountDownTimer minutes={10} onTimeout={onTimeout} />
          </Grid>

          <Grid item md={7} sm={10} xs={12}>
            <Formik
              initialValues={{ answersFormControlLabel: [] }}
              onSubmit={handleSubmit}
            >
              {(formik) => {
                const { isValid, dirty } = formik;
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
                        {questions.map((item, index) => (
                          <Grid item key={item.question} xs={12}>
                            <Card>
                              <CardHeader
                                title={`${index + 1}. ${item.question}`}
                              />
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
                                          language={
                                            item.codeBlock.language ?? ""
                                          }
                                          showLineNumbers
                                        />
                                      </Grid>
                                    )}
                                    <Grid item xs={12}>
                                      <FormControl component="fieldset">
                                        <RadioGroup>
                                          {item.answers.map(
                                            (answer, answerIndex) => (
                                              <FormControlLabel
                                                key={answer.text}
                                                name={`answersFormControlLabel.${index}`}
                                                value={answer}
                                                control={
                                                  <Field
                                                    type="radio"
                                                    as={Radio}
                                                    value={JSON.stringify(
                                                      answer
                                                    )}
                                                  />
                                                }
                                                label={
                                                  answer.codeBlock ? (
                                                    <Code
                                                      text={
                                                        answer.codeBlock.code
                                                      }
                                                      language={
                                                        answer.codeBlock
                                                          .language
                                                      }
                                                      showLineNumbers
                                                    />
                                                  ) : answer.image ? (
                                                    <Stack>
                                                      <Typography>
                                                        {" "}
                                                        {answer.text}
                                                      </Typography>
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
                                            )
                                          )}
                                        </RadioGroup>
                                      </FormControl>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                        <Grid item xs={"auto"}>
                          <Button
                            type="submit"
                            color="success"
                            variant="contained"
                          >
                            Finish
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Grid>
        </Grid>
      )}

      {status === "finished" && (
        <Grid
          container
          item
          alignItems="center"
          justifyContent="center"
          gap={3}
        >
          <ScoreDialogBox
            openEditProfile={status === "finished"}
            handleCloseEditProfile={handleCloseEditProfile}
          />
        </Grid>
      )}
    </Grid>
  );
};

export { QandA };
