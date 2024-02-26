"use client";
import { Grid, Typography } from "@mui/material";
import React from "react";
import { ContactUsForm } from "../../components/forms/ContactUsForm";

function Page() {
  return (
    <Grid
      container
      spacing={3}
      alignItems="center"
      justifyContent={{
        lg: "flex-start",
        md: "center",
        sm: "center",
        xs: "center",
      }}
    >
      <Grid
        container
        item
        alignItems="center"
        justifyContent="flex-start"
        md={6}
        sm={12}
        xs={12}
      >
        <Grid item xs={12}>
          <Typography component="h2" fontWeight="bold" fontSize="2rem">
            Contact Us
          </Typography>

          <Typography component="p">
            If you have any questions, comments or requests please email us at{" "}
            <a href="mailto:careerguidepro@gmail.com">
              careerguidepro@gmail.com
            </a>
            . Alternatively you can submit your query via this form and we will
            get back to you as soon as we can.
          </Typography>
        </Grid>
      </Grid>

      <Grid container item md={6} sm={12} xs={12} mt={3}>
        <ContactUsForm />
      </Grid>
    </Grid>
  );
}

export default Page;
