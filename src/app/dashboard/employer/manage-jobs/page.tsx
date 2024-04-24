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
  questionsSet?: any;
  workingHoursPerDay: number;
  jobRole: string;
  jobType: string;
  jobExpirationDate: string;
};

function Page() {
  const router = useRouter();
  const [backendCall, setBackendCall] = useState(true);
  const { data: session, status } = useSession();
  const [industryArray, setIndustryArray] = useState([]);
  const [skillsArray, setSkillsArray] = useState([]);
  const [quizData, setQuizData] = useState([]);

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

  const getAllSkillsAndIndustries = useCallback(async () => {
    try {
      setBackendCall(true);
      const response = await fetch("/api/candidate/getAllSkillsAndIndustries", {
        method: "POST",
        body: JSON.stringify({
          // @ts-ignore
          userRole: session?.user?.role,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setSkillsArray(data?.data?.skills);
      setIndustryArray(data?.data?.industries);
      setBackendCall(false);
    } catch (error) {
      console.log("error", error);
    }
    // @ts-ignore
  }, [session?.user?.role]);

  const getAllQuestions = useCallback(async () => {
    setBackendCall(true);
    try {
      const payload = {
        email: session?.user?.email,
      };

      const response = await fetch("/api/employer/getAllQuestions", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.status !== 200) {
        setBackendCall(false);
      } else {
        const data = await response.json();
        setQuizData(data.data);
        setBackendCall(false);
      }
    } catch (error) {
      setBackendCall(false);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (status === "authenticated") {
      if (!companyInfo.length) {
        loadCreatedJobs();
      }

      getAllSkillsAndIndustries();
      getAllQuestions();
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
                    quizData={quizData}
                    industryArray={industryArray}
                    skillsArray={skillsArray}
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
