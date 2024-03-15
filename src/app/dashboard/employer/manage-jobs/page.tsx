"use client";

import React, { useCallback, useEffect, useState } from "react";
import { EmployerJobListCard } from "../../../../components/cards/Job/EmployerJobListCard";
import { CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type companyInfo = {
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
};

function Page() {
  const router = useRouter();
  const [backendCall, setBackendCall] = useState(true);
  const { data: session, status } = useSession();

  const [companyInfo, setCompanyInfo] = React.useState([]);

  const loadCreatedJobs = useCallback(async () => {
    try {
      setBackendCall(true);

      const response = await fetch("/api/employer/getCreatedJobs", {
        method: "POST",
        body: JSON.stringify({
          email: session?.user?.email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.status !== 200) {
        setBackendCall(false);
      } else {
        const data = await response.json();
        setCompanyInfo(data.data);
        setBackendCall(false);
      }
    } catch (error) {
      setBackendCall(false);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (status === "authenticated" && !companyInfo.length) {
      loadCreatedJobs();
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
          !companyInfo.length ? (
            <Stack alignItems="center" justifyContent="center">
              <Typography variant="h5">No Jobs Created Yet.</Typography>
            </Stack>
          ) : (
            companyInfo.map((item: companyInfo) => {
              return (
                <Grid item xs={12} key={item?._id}>
                  <EmployerJobListCard
                    companyInfo={item}
                    loadCreatedJobs={loadCreatedJobs}
                  />
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
