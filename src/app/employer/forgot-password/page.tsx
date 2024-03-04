import { Grid } from "@mui/material";
import { ForgotPassword } from "@/components/forms/ForgotPassword";

function Page() { 

  return (
    <Grid container>
      <ForgotPassword userType="employer" />
    </Grid>
  );
}

export default Page;
