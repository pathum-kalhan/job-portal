"use client";

import React, { useCallback, useEffect, useState } from "react";
import { CandidatesApplicationCard } from "../../../../components/cards/ApplicationAndNotificationCards/Employer/CandidatesApplicationCard";
import {
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ApplicationsFilter from "../../../../components/cards/ApplicationAndNotificationCards/Employer/ApplicationsFilter";
import { applicationType } from "../../../../utils/types/genaral-types";


function Page() {
    const router = useRouter();
  const [backendCall, setBackendCall] = useState(true);
  const { data: session, status } = useSession();
  const [applicationsList, setApplicationsList] = useState<applicationType[]>(
    []
  );
  const [applicationsListFilter, setApplicationsListFilter] = useState<
    applicationType[]
  >([]);

  const loadApplications = useCallback(async () => {
    try {
      setBackendCall(true);
      const response = await fetch(
        "/api/employer/applications/getCompanyApplications",
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
        setApplicationsListFilter(data.data);
        setBackendCall(false);
      }
    } catch (error) {
      setBackendCall(false);
    }
    // @ts-ignore
  }, [session?.user?.email]);

  useEffect(() => {
    if (status === "authenticated" && !applicationsListFilter.length) {
      loadApplications();
    }

    if (status !== "loading" && !session) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <Grid container gap={2}>
      {/* Filter Section */}

      <Grid
        container
        item
        alignItems="center"
        justifyContent="space-between"
        xs={12}
        gap={3}
        mb={8}
      >
        <Grid
          container
          item
          alignItems="center"
          justifyContent="flex-end"
          gap={3}
        >
          <Grid item md={"auto"} sm={12} xs={12}>
            <Button
              startIcon={<CalendarMonthIcon />}
              sx={{ borderRadius: 2 }}
              variant="contained"
              fullWidth
            >
              Scheduled Interviews
            </Button>
          </Grid>
        </Grid>

        <ApplicationsFilter
          applicationsList={applicationsList}
          backendCall={backendCall}
          setApplicationsListFilter={setApplicationsListFilter}
        />
      </Grid>

      {!backendCall ? (
        !applicationsListFilter.length ? (
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
          applicationsListFilter.map((applicationItem: applicationType) => {
            return (
              <Grid item xs={12} key={applicationItem?._id}>
                <CandidatesApplicationCard
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
