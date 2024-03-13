"use client";

import React, { useCallback, useEffect, useState } from "react";
import { JobListCard } from "../../../../components/cards/Job/JobListCard";
import {
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import router from "next/router";
import { useSession } from "next-auth/react";

type jobPostInfo = {
  _id: string;
  websiteUrl: string;
  companyName: string;
  companyDetails: string;
  location: string;
  industry: string;
  position: string;
  jobDescription: string;
  requiredQualifications: string[];
  workingHoursPerDay: number;
  jobRole: string;
  savedJob: boolean;
  employer: string;
  alreadyApplied: boolean;
};

function Page() {

  const [backendCall, setBackendCall] = useState(true);
  const { data: session, status } = useSession();
  const [jobPostInfo, setJobPostInfo] = useState([]);


  const loadJobs = useCallback(async () => {
    try {
      setBackendCall(true);

      const response = await fetch("/api/candidate/job/getSavedJobs", {
        method: "POST",
        body: JSON.stringify({
          email: session?.user?.email,
          // @ts-ignore
          userRole: session?.user?.role,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.status !== 200) {
        setBackendCall(false);
      } else {
        const data = await response.json();
        setJobPostInfo(data.data);
        setBackendCall(false);
      }
    } catch (error) {
      setBackendCall(false);
    }

    // @ts-ignore
  }, [session?.user?.email, session?.user?.role]);

  useEffect(() => {
    if (status === "authenticated" && !jobPostInfo.length) {
      loadJobs();
    }

    if (status !== "loading" && !session) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

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
          {!backendCall ? (
            !jobPostInfo.length ? (
              <Stack alignItems="center" justifyContent="center">
                <Typography variant="h5">Jobs not available right now.</Typography>
              </Stack>
            ) : (
              jobPostInfo.map((item: jobPostInfo) => {
                return (
                  <Grid item xs={12} key={item?._id}>
                    <JobListCard jobPostInfo={item} saveJobOption loadJobs={loadJobs} allAreSavedJobs alreadyApplied={item.alreadyApplied} />
                  </Grid>
                );
              })
            )
          ) : (
            <Stack alignItems="center" justifyContent="center">
              <CircularProgress />
            </Stack>
          )}
      </Grid>
    </Grid>
  );
}

export default Page;
