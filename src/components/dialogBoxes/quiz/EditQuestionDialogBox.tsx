import React from "react";
import {
  Dialog,
  Card,
  CardHeader,
  CardContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditQuestionsForm from "../../forms/EditQuestionsForm";

type props = {
  openEditProfile: boolean;
  handleCloseEditQuestion: () => void;
  initialData?: any;
  userRole: string;
  getQuestions: () => void;
};

function EditQuestionDialogBox(props: props) {
  const {
    openEditProfile,
    handleCloseEditQuestion,
    initialData,
    userRole,
    getQuestions,
  } = props;

  const initialValues = {
    _id: initialData?._id,
    title: initialData?.question,
    ChoiceOne: initialData?.answers[0]?.text,
    ChoiceTwo: initialData?.answers[1]?.text,
    ChoiceThree: initialData?.answers[2]?.text,
    ChoiceFour: initialData?.answers[3]?.text,
    ChoiceOneIsTrue: initialData?.answers[0]?.isCorrect,
    ChoiceTwoIsTrue: initialData?.answers[1]?.isCorrect,
    ChoiceThreeIsTrue: initialData?.answers[2]?.isCorrect,
    ChoiceFourIsTrue: initialData?.answers[3]?.isCorrect,
  };

  return (
    <Dialog
      fullScreen={false}
      fullWidth
      maxWidth="lg"
      open={
        (userRole === "admin" || userRole === "employer") && openEditProfile
      }
      onClose={handleCloseEditQuestion}
    >
      <Card
        sx={{ padding: { lg: "2rem", md: "2rem", sm: "2rem", xs: "1rem" } }}
      >
        <CardHeader
          action={
            <IconButton onClick={handleCloseEditQuestion} autoFocus>
              <CloseIcon fontSize="large" sx={{ color: "black" }} />
            </IconButton>
          }
          title="Edit Question"
          sx={{ textAlign: "center" }}
        />
        {userRole && (
          <CardContent sx={{ maxHeight: "20rem", overflowY: "auto" }}>
            {(userRole === "admin" || userRole === "employer") && (
              <EditQuestionsForm
                getQuestions={getQuestions}
                role={userRole}
                initialValues={initialValues}
                handleCloseEditQuestion={handleCloseEditQuestion}
              />
            )}
          </CardContent>
        )}
      </Card>
    </Dialog>
  );
}

export { EditQuestionDialogBox };
