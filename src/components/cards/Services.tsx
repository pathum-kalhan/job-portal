import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

type props = {
  serviceSections: {
    Icon: React.ElementType;
    title: string;
    paragraph: string;
  }[];
};

function Services(props: props) {
  const { serviceSections } = props;

  return (
    <Card sx={{ marginTop: 10, paddingTop:5, paddingBottom:10, paddingLeft:1, paddingRight:1 }}>
      <CardHeader
        title="Accelerate Your Career with Career Guide Pro"
        sx={{ textAlign: "center" }}
      />
      <CardContent>
        <Grid container>
          <Grid container item alignItems="center" justifyContent="center">
            <Grid
              container
              item
              alignItems="center"
              justifyContent="center"
              md={10}
              sm={12}
              xs={12}
              spacing={3}
            >
              {serviceSections.map((item) => {
                const { Icon } = item;
                return (
                  <Grid item md={6} sm={12} xs={12} key={item.title}>
                    <Grid
                      container
                      item
                      alignItems="flex-start"
                      justifyContent={{
                        md: "flex-start",
                        sm: "center",
                        xs: "center",
                      }}
                      gap={3}
                    >
                      <Grid item xs={"auto"}>
                        <Icon sx={{ fontSize: "5rem" }} />
                      </Grid>
                      <Grid item md={6} sm={10} xs={10}>
                        <Stack>
                          <Typography component={"h2"} fontWeight="bold">
                            {item.title}
                          </Typography>
                          <Typography component={"p"}>
                            {item.paragraph}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export {Services};
