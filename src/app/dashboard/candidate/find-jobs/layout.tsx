import { Card, Grid, Stack, Typography } from "@mui/material";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Find job",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Grid container gap={5}>
      <Grid container item alignItems="center" justifyContent="center" xs={12}>
        <Grid item xs={11} >

          <Card sx={{ backgroundColor: "#79D7FF", height: "2rem", paddingLeft:3, paddingTop:1 }}>
            <Typography fontWeight="bold">Find job</Typography>
          </Card>
        
        </Grid>

        <Grid item xs={11} mt={2}>
        <Stack alignItems="center" justifyContent="center">
          <Image
            src={"/bg_images/job_search.webp"}
              alt="Welcome to Career Guide Pro"
              priority={true}
              layout="responsive"
              objectFit="contain"
              objectPosition="center" 
            width={1520}
            height={300}
          />
            </Stack>
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
