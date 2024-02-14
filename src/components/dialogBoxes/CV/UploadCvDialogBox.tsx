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
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type props = {
  openUploadCv: boolean;
  handleClickCloseUploadCv: () => void;
  handleClickOpenUploadCvDone: () => void;
};

function UploadCvDialogBox(props: props) {
  const {
    openUploadCv,
    handleClickCloseUploadCv,
    handleClickOpenUploadCvDone,
  } = props;

 
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
          title="Upload The CV"
          sx={{ textAlign: "center" }}
        />
        <CardContent>
          <TextField
            type="file"
            fullWidth
            sx={{ backgroundColor: "#d9d9d9", borderRadius: 2 }}
          />
        </CardContent>

        <CardActions>
          <Grid container>
            <Grid container item alignItems="center" justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="success"
                  autoFocus
                  sx={{ borderRadius: 3, fontWeight: "bold" }}
                  onClick={() => {
                    handleClickCloseUploadCv();
                    handleClickOpenUploadCvDone();
                  }}
                >
                  Upload
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Dialog>
  );
}

export default UploadCvDialogBox;
