"use client";

import React, { useState } from 'react'
import {JobListCard} from '../../components/cards/Job/JobListCard'
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function Page() {

  const [industrySelection, setIndustrySelection] = useState("");

  const [companyInfo, setCompanyInfo] = React.useState({
    companyName: "xxxxxxxxxx",
    companyDetails: "xxxxxxxxxx",
    companyWebsite: "xxxxxxxxxx",
    location: "xxxxxxxxxx",
    industry: "xxxxxxxxxx",
    position: "xxxxxxxxxx",
    jobDescription: "xxxxxxxxxx",
    requiredQualifications: "xxxxxxxxxx",
    workingHoursPerDay: "xxxxxxxxxx",
    jobRole: "xxxxxxxxxx",
  });

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
      justifyContent="center"
      xs={12}

      gap={3}
    >
      <Grid
        container
        item
        alignItems="center"
        justifyContent="space-between"
        md={"auto"}
        sm={11}
        xs={11}
        gap={{md:10, sm:3, xs:3}}
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
            <InputLabel>Location</InputLabel>
            <Select
              value={industrySelection}
              label="Location"
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
            <InputLabel>Job Role</InputLabel>
            <Select
              value={industrySelection}
              label="Job Role"
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
        md={11}
        sm={11}
        xs={11}
      >
        <Grid item xs={"auto"}>
          <Button startIcon={<SearchIcon/>} sx={{borderRadius:2}} variant="contained" >
          Search
          </Button>
        </Grid>
        </Grid>
        

    <Grid container item alignItems="center" justifyContent="center" xs={11}>
        <Grid item xs={12}>
            <JobListCard saveJobOption companyInfo={companyInfo} />
    </Grid>
    </Grid>
    </Grid>
    </Grid>
  )
}

export default Page
