import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function page() {
  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary
       
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"

        >
         <Typography  sx={{fontWeight:"bold"}}>Account Settings</Typography> 
        </AccordionSummary>
        <AccordionDetails>
        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.</Typography> 
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
         <Typography  sx={{fontWeight:"bold"}}>Privacy & Security</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.</Typography> 
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
         <Typography  sx={{fontWeight:"bold"}}>Notification Preferences</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.</Typography> 
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default page;
