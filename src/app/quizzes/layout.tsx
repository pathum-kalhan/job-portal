import { Card, Grid, IconButton, Stack, Typography } from "@mui/material";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quizzes",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Grid container gap={5}>
      <Grid container item alignItems="center" justifyContent="center" xs={12}>
        <Grid item xs={11}>
          <Card
            sx={{
              backgroundColor: "#79D7FF",
              height: "2rem",
              paddingLeft: 3,
              paddingTop: 1,
            }}
          >
            <Typography fontWeight="bold">Quizzes</Typography>
          </Card>
        </Grid>
      </Grid>

      <Grid container item alignItems="center" justifyContent="center" xs={12}>
        <Grid item xs={11}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
}
