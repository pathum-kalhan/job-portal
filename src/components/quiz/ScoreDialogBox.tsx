import React from "react";
import {
  Dialog,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
// import EmployerEditProfileForm from "@/components/forms/Employer/EmployerEditProfileForm";

type props = {
  openEditProfile: boolean;
  handleCloseEditProfile: () => void;
};

function ScoreDialogBox(props: props) {
  const { openEditProfile, handleCloseEditProfile } = props;
  return (
    <Dialog
      fullScreen={false}
      fullWidth
      maxWidth="sm"
      open={openEditProfile}
      onClose={handleCloseEditProfile}
    >
      <Card
        sx={{ padding: { lg: "2rem", md: "2rem", sm: "2rem", xs: "1rem" } }}
      >
        <CardHeader
          title="Quiz Results"
          sx={{ textAlign: "center" }}
        />
        <CardContent  sx={{maxHeight:"20rem", overflowY:"auto"}}>
         {/* <EmployerEditProfileForm/> */}
        </CardContent>
        <CardActions>
          <Grid container>
          <Grid container item alignItems="center" justifyContent="center">
          <Grid item>
          <Button
            color="success"
            variant="contained"
          onClick={handleCloseEditProfile}
          >
            Finish
          </Button>
          </Grid>
          </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Dialog>
  );
}

export {ScoreDialogBox};
