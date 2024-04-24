"use client";
import React, { useCallback, useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as yup from "yup";
import { TextField, Stack, Radio, FormControlLabel } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { AlertType } from "../../utils/types/general-types";
import SnackBarComponent from "../common/SnackBarComponent";
import { RadioGroup } from "formik-mui";
import { stringToBoolean } from "../../utils/convert/stringToBoolean";
import { useSession } from "next-auth/react";

type initialValuesType = {
  _id: string;
  title: string;
  ChoiceOne: string;
  ChoiceTwo: string;
  ChoiceThree: string;
  ChoiceFour: string;
  ChoiceOneIsTrue: string;
  ChoiceTwoIsTrue: string;
  ChoiceThreeIsTrue: string;
  ChoiceFourIsTrue: string;
};

type props = {
  role: string
  initialValues: initialValuesType
  handleCloseEditQuestion: () => void
  getQuestions: () => void
}

function EditQuestionsForm(props: props) {
  const { data: session } = useSession();
  
  const { role, initialValues, handleCloseEditQuestion, getQuestions } = props

  const [backendCall, setBackendCall] = useState(false);

  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });
 

  const quizValidationSchema = yup.object({
    title: yup.string().required("Title is Required"),
    ChoiceOne: yup.string().required("Choice one is Required"),
    ChoiceTwo: yup.string().required("Choice two is Required"),
    ChoiceThree: yup.string().required("Choice three is Required"),
    ChoiceFour: yup.string().required("Choice four is Required"),
    ChoiceOneIsTrue: yup
      .boolean()
      .required("Choice one isTrue value is Required"),
    ChoiceTwoIsTrue: yup
      .boolean()
      .required("Choice two isTrue value is Required"),
    ChoiceThreeIsTrue: yup
      .boolean()
      .required("Choice three isTrue value is Required"),
    ChoiceFourIsTrue: yup
      .boolean()
      .required("Choice four isTrue value is Required"),
  });

  const handleSubmit = useCallback(
    async (
      values: initialValuesType,
      formikHelpers: FormikHelpers<initialValuesType>
    ) => {
      const payLoad = {
        createdUserRole: role,
        // @ts-ignore
        createdUserId:session?.user?.id,
        question: values?.title,
        id: initialValues._id,
        answers: [
          {
            text: values?.ChoiceOne,
            isCorrect: stringToBoolean(values?.ChoiceOneIsTrue),
          },
          {
            text: values?.ChoiceTwo,
            isCorrect: stringToBoolean(values?.ChoiceTwoIsTrue),
          },
          {
            text: values?.ChoiceThree,
            isCorrect: stringToBoolean(values?.ChoiceThreeIsTrue),
          },
          {
            text: values?.ChoiceFour,
            isCorrect: stringToBoolean(values?.ChoiceFourIsTrue),
          },
        ],
      };

      try {
        setBackendCall(true);

        const response = await fetch("/api/common/editQuestion", {
          method: "POST",
          body: JSON.stringify(payLoad),
        });

        if (response.status !== 200) {
          setBackendCall(false);

          const { message } = await response.json();
          setAlert({
            show: true,
            message:
              typeof message === "string"
                ? message
                : "Question adding failed due to server error, please try again!",
            severity: "error",
          });
        } else {
          setBackendCall(false);

          setAlert({
            show: true,
            message: "Question added successfully!",
            severity: "success",
          });
          await getQuestions();
          handleCloseEditQuestion();
        }
      } catch (error) {
        setAlert({
          show: true,
          message: typeof error === "string" ? error : "Server Error",
          severity: "error",
        });

        setBackendCall(false);
      }
    },
        // @ts-ignore
    [getQuestions, handleCloseEditQuestion, initialValues._id, role, session?.user?.id]
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={quizValidationSchema}
      enableReinitialize
    >
      {(formik) => {
        const { isValid, dirty, errors, touched, values } = formik;
        return (
          <Form>
            <SnackBarComponent alert={alert} setAlert={setAlert} />

            {/* Question Text start */}
            <Field
              disabled={backendCall}
              fullWidth
              name="title"
              label="title"
              as={TextField}
              margin="normal"
              error={errors?.title && touched?.title}
              helperText={errors?.title && touched?.title ? errors?.title : ""}
            />
            {/* Question Text end */}

            {/* Answer Fields Start */}
            <Stack
              direction="row"
              gap={{ lg: 2, md: 2, sm: 1, xs: 1 }}
              alignItems="center"
              justifyContent="center"
            >
              <Field
                disabled={backendCall}
                fullWidth
                name="ChoiceOne"
                label="Choice One"
                as={TextField}
                margin="normal"
                error={errors?.ChoiceOne && touched?.ChoiceOne}
                helperText={
                  errors?.ChoiceOne && touched?.ChoiceOne
                    ? errors?.ChoiceOne
                    : ""
                }
              />

              <Field component={RadioGroup} name={"ChoiceOneIsTrue"}>
                <Stack direction="row" gap={{ lg: 2, md: 2, sm: 1, xs: 1 }}>
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label={"True"}
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label={"False"}
                  />
                </Stack>
              </Field>
            </Stack>

            <Stack
              direction="row"
              gap={{ lg: 2, md: 2, sm: 1, xs: 1 }}
              alignItems="center"
              justifyContent="center"
            >
              <Field
                disabled={backendCall}
                fullWidth
                name="ChoiceTwo"
                label="Choice Two"
                as={TextField}
                margin="normal"
                error={errors?.ChoiceTwo && touched?.ChoiceTwo}
                helperText={
                  errors?.ChoiceTwo && touched?.ChoiceTwo
                    ? errors?.ChoiceTwo
                    : ""
                }
              />

              <Field component={RadioGroup} name={"ChoiceTwoIsTrue"}>
                <Stack direction="row" gap={{ lg: 2, md: 2, sm: 1, xs: 1 }}>
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label={"True"}
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label={"False"}
                  />
                </Stack>
              </Field>
            </Stack>

            <Stack
              direction="row"
              gap={{ lg: 2, md: 2, sm: 1, xs: 1 }}
              alignItems="center"
              justifyContent="center"
            >
              <Field
                disabled={backendCall}
                fullWidth
                name="ChoiceThree"
                label="Choice Three"
                as={TextField}
                margin="normal"
                error={errors?.ChoiceThree && touched?.ChoiceThree}
                helperText={
                  errors?.ChoiceThree && touched?.ChoiceThree
                    ? errors?.ChoiceThree
                    : ""
                }
              />

              <Field component={RadioGroup} name={"ChoiceThreeIsTrue"}>
                <Stack direction="row" gap={{ lg: 2, md: 2, sm: 1, xs: 1 }}>
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label={"True"}
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label={"False"}
                  />
                </Stack>
              </Field>
            </Stack>

            <Stack
              direction="row"
              gap={{ lg: 2, md: 2, sm: 1, xs: 1 }}
              alignItems="center"
              justifyContent="center"
            >
              <Field
                disabled={backendCall}
                fullWidth
                name="ChoiceFour"
                label="Choice Four"
                as={TextField}
                margin="normal"
                error={errors?.ChoiceFour && touched?.ChoiceFour}
                helperText={
                  errors?.ChoiceFour && touched?.ChoiceFour
                    ? errors?.ChoiceFour
                    : ""
                }
              />

              <Field component={RadioGroup} name={"ChoiceFourIsTrue"}>
                <Stack direction="row" gap={{ lg: 2, md: 2, sm: 1, xs: 1 }}>
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label={"True"}
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label={"False"}
                  />
                </Stack>
              </Field>
            </Stack>

            {/* Answer Fields End */}

            <LoadingButton
              loading={backendCall}
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isValid || !dirty}
            >
              Submit
            </LoadingButton>
          </Form>
        );
      }}
    </Formik>
  );
}

export default EditQuestionsForm;
