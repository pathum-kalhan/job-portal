"use client";

import React, { useState } from "react";
import { JobListCard } from "../../../../components/cards/Job/JobListCard";
import {
  Grid,
  SelectChangeEvent,
} from "@mui/material";

function Page() {
  const [industrySelection, setIndustrySelection] = useState("");
  const [companyInfo, setCompanyInfo] = React.useState({
    companyName: "xxxxxxxxxx",
    companyDetails: "xxxxxxxxxx",
    websiteUrl: "xxxxxxxxxx",
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
          justifyContent="center"
          xs={12}
        >
          <Grid item xs={12}>
            <JobListCard companyInfo={companyInfo} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Page;
