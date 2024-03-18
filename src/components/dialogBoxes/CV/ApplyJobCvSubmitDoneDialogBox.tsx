import React from "react";
import {
  Dialog,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type props = {
  openUploadCv: boolean;
  setParticipateTheQuiz: (val:boolean) => void;
};

function ApplyJobCvSubmitDoneDialogBox(props: props) {
  const { openUploadCv, setParticipateTheQuiz } = props;

  const handleClickCloseUploadCv = () => {
    setParticipateTheQuiz(false)
   }


  return (
    <Dialog
      fullScreen={false}
      fullWidth
      maxWidth="sm"
      open={openUploadCv}
      onClose={handleClickCloseUploadCv}
    >
      <Card
        sx={{ padding: { lg: "2rem", md: "2rem", sm: "2rem", xs: "1rem" } }}
      >
        <CardHeader
          action={
            <IconButton onClick={handleClickCloseUploadCv} autoFocus>
              <CloseIcon fontSize="large" sx={{ color: "black" }} />
            </IconButton>
          }
          sx={{ textAlign: "center" }}
        />
        <CardContent>
          <Typography
            sx={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold" }}
          >
            CV SUBMIT DONE !
          </Typography>
        </CardContent>

        <CardActions>
          <Grid container>
            <Grid container item alignItems="center" justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  size="large"
                  color="success"
                  autoFocus
                  sx={{ borderRadius: 3, fontWeight: "bold" }}
                >
                  Participate the Quiz
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Dialog>
  );
}

export { ApplyJobCvSubmitDoneDialogBox };
