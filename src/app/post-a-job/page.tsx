"use client";

import React, { useState } from "react";
import { CandidatesApplicationCard } from "../../components/cards/ApplicationAndNotificationCards/Employer/EmployerApplicationCard";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';

function Page() {

  const [industrySelection, setIndustrySelection] = useState("");

  const handleChangeIndustrySelection = (event: SelectChangeEvent) => {
    setIndustrySelection(event.target.value as string);
  };

  return (
    <Grid container gap={10}>
      {/* Filter Section */}

      <Grid
        container
        item
        alignItems="center"
        justifyContent="space-between"
        xs={12}

        gap={3}
      >
        <Grid
          container
          item
          alignItems="center"
          justifyContent="center"
          md={"auto"}
          sm={12}
          xs={12}
          gap={3}
        >
          <Grid item
           md={"auto"}
           sm={12}
           xs={12}
          >
            <FormControl fullWidth sx={{ width: {md:"15rem", sm:"100%", xs:"100%"} }}>
              <InputLabel>Industry Selection</InputLabel>
              <Select
                value={industrySelection}
                label="Industry Selection"
                onChange={handleChangeIndustrySelection}
                fullWidth
              >
                <MenuItem value={"industrySelection1"}>
                  Industry Selection1
                </MenuItem>
                <MenuItem value={"industrySelection2"}>
                  Industry Selection2
                </MenuItem>
                <MenuItem value={"industrySelection3"}>
                  Industry Selection3
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item
           md={"auto"}
           sm={12}
           xs={12}>
            <FormControl fullWidth sx={{ width: {md:"15rem", sm:"100%", xs:"100%"} }}>
              <InputLabel>Industry Selection</InputLabel>
              <Select
                value={industrySelection}
                label="Industry Selection"
                onChange={handleChangeIndustrySelection}
                fullWidth
              >
                <MenuItem value={"industrySelection1"}>
                  Industry Selection1
                </MenuItem>
                <MenuItem value={"industrySelection2"}>
                  Industry Selection2
                </MenuItem>
                <MenuItem value={"industrySelection3"}>
                  Industry Selection3
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid
          container
          item
          alignItems="center"
          justifyContent="center"
          md={"auto"}
          sm={12}
          xs={12}
          gap={3}
        >
          <Grid item md={"auto"} sm={12} xs={12}>
            <Button startIcon={<CalendarMonthIcon/>} sx={{borderRadius:2}} variant="contained" fullWidth>
            Scheduled Interviews
            </Button>
          </Grid>

          <Grid item md={"auto"} sm={12} xs={12}>
            <Button startIcon={<SearchIcon/>} sx={{borderRadius:2}} variant="contained" fullWidth>
            Search Applications
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid container item alignItems="center" justifyContent="center" xs={12}>
        <Grid item xs={12}>
          <CandidatesApplicationCard />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Page;
