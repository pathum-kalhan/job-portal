"use client";

import React, { useCallback, useEffect, useState } from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { applicationType } from "../../../../utils/types/general-types";
import { EmployerInterviewScheduleCard } from "../../../../components/cards/ApplicationAndNotificationCards/Employer/EmployerInterviewScheduleCard";

function Page() {
  const router = useRouter();
  const [backendCall, setBackendCall] = useState(true);
  const { data: session, status } = useSession();
  const [applicationsList, setApplicationsList] = useState<applicationType[]>(
    []
  );

  const loadApplications = useCallback(async () => {
    try {
      setBackendCall(true);
      const response = await fetch(
        "/api/employer/applications/getCompanyShortListedApplications",
        {
          method: "POST",
          body: JSON.stringify({
            email: session?.user?.email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.status !== 200) {
        setBackendCall(false);
      } else {
        const data = await response.json();
        setApplicationsList(data.data);
        setBackendCall(false);
      }
    } catch (error) {
      setBackendCall(false);
    }
    // @ts-ignore
  }, [session?.user?.email]);

  useEffect(() => {
    if (status === "authenticated") {
      loadApplications();
    }

    if (status !== "loading" && !session) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <Grid container gap={2}>
      {!backendCall ? (
        !applicationsList.length ? (
          <Grid
            container
            item
            alignItems="center"
            justifyContent="center"
            xs={12}
          >
            <Typography variant="h5">Applications not available.</Typography>
          </Grid>
        ) : (
          applicationsList.map((applicationItem: applicationType) => {
            return (
              <Grid item xs={12} key={applicationItem?._id}>
                <EmployerInterviewScheduleCard
                  applicantInfo={applicationItem}
                  loadApplications={loadApplications}
                />
              </Grid>
            );
          })
        )
      ) : (
        <Grid
          container
          item
          alignItems="center"
          justifyContent="center"
          xs={12}
        >
          <CircularProgress />
        </Grid>
      )}
    </Grid>
  );
}

export default Page;
