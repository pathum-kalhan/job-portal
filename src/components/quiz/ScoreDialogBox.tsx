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

type props = {
  open: boolean;
  handleClose: () => void;
};

function ScoreDialogBox(props: props) {
  const { open, handleClose } = props;
  return (
    <Dialog
      fullScreen={false}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={handleClose}
    >
      <Card
        sx={{ padding: { lg: "2rem", md: "2rem", sm: "2rem", xs: "1rem" } }}
      >
        <CardHeader
          title="Quiz Results"
          sx={{ textAlign: "center" }}
        />
        <CardContent  sx={{maxHeight:"20rem", overflowY:"auto"}}>
        </CardContent>
        <CardActions>
          <Grid container>
          <Grid container item alignItems="center" justifyContent="center">
          <Grid item>
          <Button
            color="success"
            variant="contained"
          onClick={handleClose}
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
