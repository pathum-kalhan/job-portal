"use client";
import {
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { Field } from "formik";
import { Code } from "react-code-blocks";
import { RadioGroup } from "formik-mui";
import CreateIcon from "@mui/icons-material/Create";
import { EditQuestionDialogBox } from "../dialogBoxes/quiz/EditQuestionDialogBox";
import { useSession } from "next-auth/react";

type CodeBlock = {
  code: string;
  language: string;
};

type Answer = {
  _id: string;
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
  editQuestion?: boolean;
  getQuestions?: () => void;
};

const QuestionCard = (props: Props) => {
  const { data: session } = useSession();
  const { questions, editQuestion: editQuestion = false, getQuestions } = props;
  const [openEditQuestion, setOpenEditQuestion] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question>({
    _id: "",
    question: "",
    answers: [],
    image: "",
    codeBlock: {
      code: "",
      language: "",
    },
  });

  const handleCloseEditQuestion = () => {
    setOpenEditQuestion(false);
  };

  const handleOpenEditQuestion = () => {
    setOpenEditQuestion(true);
  };

  return (
    <>
      <EditQuestionDialogBox
        openEditProfile={openEditQuestion}
        handleCloseEditQuestion={handleCloseEditQuestion}
        // @ts-ignore
        userRole={session?.user?.role}
        initialData={selectedQuestion}
        getQuestions={getQuestions}
      />
      {questions.map((item:Question, index) => (
        <Grid item key={item._id} xs={12}>
          <Card>
            <CardHeader
              title={
                !editQuestion
                  ? `${index + 1}. ${item.question}`
                  : `Question ${index + 1}: ${item.question}`
              }
              action={
                editQuestion ? (
                  <IconButton
                    aria-label="settings"
                    onClick={() => {
                      handleOpenEditQuestion();
                      setSelectedQuestion(item);
                    }}
                  >
                    <CreateIcon />
                  </IconButton>
                ) : (
                  ""
                )
              }
            />
            {editQuestion ? (
              <CardContent>
                <List>
                  <Typography variant="h6" mb={1}>Answers:</Typography>
                  {item.answers.map((answer, index) => (
                    <ListItem key={answer._id} disablePadding>
                      <Typography>
                        {index + 1}. {answer.text}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            ) : (
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
                    {!editQuestion && (
                      <Grid item xs={12}>
                        <Field component={RadioGroup} name={item.question}>
                          {item.answers.map((answer) => (
                            <FormControlLabel
                              key={answer._id}
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
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            )}
          </Card>
        </Grid>
      ))}
    </>
  );
};

export { QuestionCard };
