"use client"
import React, { useState } from "react";
import CandidateLoginForm from "@/components/forms/Candidate/CandidateLoginForm";
import EmployerLoginForm from "@/components/forms/Employer/EmployerLoginForm";
import { Grid } from "@mui/material";

function Page() {

  const [loginMethod, setLoginMethod] = useState('candidate');

  const handleLoginMethod = (method: string) => {
    setLoginMethod(method);
  }

  return (
    <Grid container>

      {loginMethod === 'candidate' ? (
      
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <CandidateLoginForm handleLoginMethod={handleLoginMethod} />
        </Grid>
        
      ) : (

      <Grid item lg={12} md={12} sm={12} xs={12}>
            <EmployerLoginForm handleLoginMethod={handleLoginMethod} />
          </Grid>
        )
      }
    </Grid>
  );
}

export default Page;
