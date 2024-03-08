import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  Button,
} from "@mui/material";
import React from "react";
import PasswordIcon from "@mui/icons-material/Password";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type props = {
  handleOpenChangePassword: () => void;
};

function PrivacyPolicy(props: props) {
  const { handleOpenChangePassword } = props;

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <Typography sx={{ fontWeight: "bold" }}>Privacy & Security</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          At Career Guide Pro, we prioritize the privacy and security of your
          personal information. In this section, you can customize your privacy
          settings and ensure that your data always remains protected.{" "}
        </Typography>
        <br></br>

        <Grid container>
          <Grid container item>
            <Grid item>
              <Typography fontWeight={"bold"} fontSize={"0.9rem"}>
                Security and Compliance
              </Typography>

              <Typography>
                <Button
                  onClick={handleOpenChangePassword}
                  color="warning"
                  startIcon={<PasswordIcon />}
                >
                  Change your password
                </Button>{" "}
                regularly to ensure the security of your account.
              </Typography>
            </Grid>
          </Grid>
          <Typography component="p" mt={2} fontWeight="bold">
            Your privacy and security are of utmost importance to us. If you
            have any questions or concerns regarding your privacy settings or
            data security, please don&apos;t hesitate to contact our support
            team.
          </Typography>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default PrivacyPolicy;
