import React, { useEffect, useState } from "react";
import {
  Dialog,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";

type props = {
  open: boolean;
  handleClose: () => void;
};

function ScoreDialogBox(props: props) {
  const { open, handleClose } = props;
  const [score, setScore] = useState("loading");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const score = searchParams.get("score");
    setScore(score);
  }, []);

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
        <CardHeader title="Quiz Results" sx={{ textAlign: "center" }} />
        <CardContent
          sx={{ maxHeight: "20rem", overflowY: "auto" }}
        ></CardContent>
        <CardActions>
          <Grid container>
            <Grid container item alignItems="center" justifyContent="center">
              <Grid item lg={12} md={12} sm={12} xs={12} mb={5}>
                {score === "loading" ? (
                  <CircularProgress />
                ) : (
                  <Typography fontSize={50} textAlign={"center"}>
                    Score : {score}
                  </Typography>
                )}
              </Grid>

              <Grid item>
                <Button
                  disabled={score === "loading"}
                  color="success"
                  variant="contained"
                  onClick={handleClose}
                >
                  Take Quiz again
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Dialog>
  );
}

export { ScoreDialogBox };
