import React from "react";
import {
  Dialog,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Typography,
} from "@mui/material";

type props = {
  openUploadCv: boolean;
  handleClickCloseUploadCv: () => void;
};

function UploadCvDoneDialogBox(props: props) {
  const { openUploadCv, handleClickCloseUploadCv } = props;

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
          sx={{ textAlign: "center" }}
        />
        <CardContent>
          <Typography
            sx={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold" }}
          >
            CV submit done!
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
                  onClick={handleClickCloseUploadCv}
                >
                 Done
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Dialog>
  );
}

export  {UploadCvDoneDialogBox};
