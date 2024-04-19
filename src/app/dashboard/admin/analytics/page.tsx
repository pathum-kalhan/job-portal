"use client";
import { Grid, Tooltip } from "@mui/material";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import FilterComponent from "../../../../components/analytics/FilterComponent";
import FilteredValueCard from "../../../../components/analytics/FilteredValueCard";
import SimpleValueCard from "../../../../components/analytics/SimpleValueCard";

function Page() {
  const { data: session } = useSession();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [backendCall, setBackendCall] = useState(false);
  const [resetBackendCall, setResetBackendCall] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({
    employersRegistrationCount: 0,
    candidatesRegistrationCount: 0,
    activeTotalEmployerCount: 0,
    activeJobs: 0,
    candidateOverallSuccessRateOfApplyingForJob: 0,
    candidateSuccessRateOfRecommendedJob: 0,
    EmployerSuccessRate: 0,
    candidateMonthlyAvgReg: 0,
    employerMonthlyAvgReg: 0,
    jobMatchedAndShortlisted: 0,
  });

  const loadData = useCallback(async () => {
    try {
      setBackendCall(true);

      const response = await fetch("/api/admin/analytics", {
        method: "POST",
        body: JSON.stringify({
          email: session?.user?.email,
          startDate,
          endDate,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.status !== 200) {
        setBackendCall(false);
      } else {
        const data = await response.json();
        setAnalyticsData(data.data);

        setBackendCall(false);
      }
    } catch (error) {
      setBackendCall(false);
    }
  }, [endDate, session?.user?.email, startDate]);

  const resetData = useCallback(async () => {
    try {
      setResetBackendCall(true);

      const response = await fetch("/api/admin/analytics", {
        method: "POST",
        body: JSON.stringify({
          email: session?.user?.email,
          startDate: "",
          endDate: "",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.status !== 200) {
        setResetBackendCall(false);
      } else {
        const data = await response.json();
        setAnalyticsData(data.data);
        setStartDate("");
        setEndDate("");
        setResetBackendCall(false);
      }
    } catch (error) {
      setResetBackendCall(false);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (startDate === "" && endDate === "" && !resetBackendCall) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadData]);

  return (
    <Grid container gap={3}>
      <Grid
        container
        item
        lg={12}
        md={12}
        sm={12}
        xs={12}
        gap={3}
        mb={10}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={"auto"}>
          <SimpleValueCard
            title={"Active Employer Accounts"}
            count={analyticsData?.activeTotalEmployerCount}
            backendCall={backendCall}
            curveEdge
            bgColor={"black"}
            textColor={"white"}
          />
        </Grid>
        <Tooltip
          title="Total candidates who are applied for the matched job then get shortlisted by the employer"
          placement="top"
        >
          <Grid item xs={"auto"}>
            <SimpleValueCard
              title={"Job Matched & Shortlisted"}
              count={analyticsData?.jobMatchedAndShortlisted}
              backendCall={backendCall}
              curveEdge
              bgColor={"black"}
              textColor={"white"}
            />
          </Grid>
        </Tooltip>
        <Tooltip
          title="The overall percentage of Candidates getting shortlisted by the employer if candidate applied for a job"
          placement="top"
        >
          <Grid item xs={"auto"}>
            <SimpleValueCard
              title={"Candidate Success Rate"}
              count={analyticsData?.candidateOverallSuccessRateOfApplyingForJob}
              backendCall={backendCall}
              curveEdge
              bgColor={"black"}
              textColor={"white"}
            />
          </Grid>
        </Tooltip>
        <Tooltip
          title="The percentage of Candidates getting shortlisted by the employer if candidate applied to a recommended job"
          placement="top"
        >
          <Grid item xs={"auto"}>
            <SimpleValueCard
              title={"Recommended jobs Success Rate"}
              count={analyticsData?.candidateSuccessRateOfRecommendedJob}
              backendCall={backendCall}
              curveEdge
              bgColor={"black"}
              textColor={"white"}
            />
          </Grid>
        </Tooltip>
        <Tooltip
          title="The total percentage of candidates who have been shortlisted by an employer in comparison to the total number of candidates who have applied for the job posts published by that employer."
          placement="top"
        >
          <Grid item xs={"auto"}>
            <SimpleValueCard
              title={"Employer Success Rate"}
              count={analyticsData?.EmployerSuccessRate}
              backendCall={backendCall}
              curveEdge
              bgColor={"black"}
              textColor={"white"}
            />
          </Grid>
        </Tooltip>
        <Grid item xs={"auto"}>
          <SimpleValueCard
            title={"Actively Runing Jobs"}
            count={analyticsData?.activeJobs}
            backendCall={backendCall}
            curveEdge
            bgColor={"black"}
            textColor={"white"}
          />
        </Grid>
        <Grid item xs={"auto"}>
          <SimpleValueCard
            title={"Avg. Candidates per/mo."}
            count={analyticsData?.candidateMonthlyAvgReg}
            backendCall={backendCall}
            curveEdge
            bgColor={"black"}
            textColor={"white"}
          />
        </Grid>
        <Grid item xs={"auto"}>
          <SimpleValueCard
            title={"Avg. Employers per/mo."}
            count={analyticsData?.employerMonthlyAvgReg}
            backendCall={backendCall}
            curveEdge
            bgColor={"black"}
            textColor={"white"}
          />
        </Grid>
      </Grid>

      <FilterComponent
        loadData={loadData}
        resetData={resetData}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        startDate={startDate}
        endDate={endDate}
        backendCall={backendCall}
      />

      <Grid
        container
        item
        lg={12}
        md={12}
        sm={12}
        xs={12}
        gap={3}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={"auto"}>
          <FilteredValueCard
            title={"Employers Registrations"}
            count={analyticsData?.employersRegistrationCount}
            backendCall={backendCall}
            endDate={endDate}
            startDate={startDate}
            curveEdge
          />
        </Grid>

        <Grid item xs={"auto"}>
          <FilteredValueCard
            title={"Candidates Registrations"}
            count={analyticsData?.candidatesRegistrationCount}
            backendCall={backendCall}
            endDate={endDate}
            startDate={startDate}
            curveEdge
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Page;
