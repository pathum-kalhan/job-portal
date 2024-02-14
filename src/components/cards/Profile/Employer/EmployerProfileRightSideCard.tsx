"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Grid, Stack } from "@mui/material";
import Link from "next/link";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { deepPurple } from "@mui/material/colors";
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';

type props = {
  
}

function EmployerProfileRightSideCard(props: props) {
  
  const {  } = props
 
  return (
    <Card sx={{ width: {
        lg:500,
        md:500,
        sm:500,
        xs:350,
      }, pb: 1 }}>
      <CardContent sx={{ maxHeight: {lg:400, xs:300}, minHeight: {lg:400, xs:300} }}>
        <Grid container gap={1}>
          <Grid
            container
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={{
              backgroundColor: "#c9c9c9",
              padding: "1rem",
            }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item lg='auto' md='auto' sm='auto' xs='auto'>
            <CalendarTodayIcon sx={{ fontSize: "4rem", cursor: "pointer" }} />
            </Grid>
            <Grid item lg='auto' md='auto' sm='auto' xs='auto'> 
            <Button
              color="success"
              size="small"
              variant="contained"
                sx={{ textTransform: "capitalize", height: "2.5rem" }}
                endIcon={<AddIcon/>}
            >
              POST JOb
              </Button>
            </Grid>
            <Grid item lg='auto' md='auto' sm='auto' xs='auto'>  
            <Button
              color="info"
              size="small"
                  variant="contained"
                  endIcon={<CreateIcon/>}
                sx={{ textTransform: "capitalize", height: "2.5rem" }}
            >
              EDIT JOB
                </Button> 
            </Grid>

            <Grid item lg='auto' md='auto' sm='auto' xs='auto'> 
            <Button
              color="error"
              size="small"
                variant="contained"
                endIcon={<DeleteForeverIcon fontSize="large"/>}
              sx={{ textTransform: "capitalize", height: "2.5rem" }}
            >
             DELETE JOB
            </Button>
            </Grid>
          </Grid>

        </Grid>
      </CardContent>

      <Stack
        gap={1}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <CardActions>
          <Link href="/reset-password">
            <Button
              size="large"
              variant="contained"
              sx={{
                textTransform: "capitalize",
                textAlign: "center",
                borderRadius: 10,
                backgroundColor: deepPurple[500],
                "&:hover": {
                  backgroundColor: deepPurple[700],
                },
              }}
              fullWidth
            >
              LOGOUT
            </Button>
          </Link>
        </CardActions>
      </Stack>
    </Card>
  );
}

export { EmployerProfileRightSideCard };
