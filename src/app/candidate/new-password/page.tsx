import { Grid } from "@mui/material";
import { NewPassword } from "../../../components/forms/NewPassword";

function Page() { 

  return (
    <Grid container>
      <NewPassword userType="candidate"/>
    </Grid>
  );
}

export default Page;
