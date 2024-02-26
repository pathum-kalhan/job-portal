import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function page() {
  const termsPoints = [
    "You are specifically restricted from all of the following:",
    "Publishing any Career Guide Pro material in any other media.",
    "Selling, sublicensing, and/or otherwise commercializing any Career Guide Pro material.",
    "Using Career Guide Pro in any way that is or may be damaging to this website.",
    "Engaging in any data mining, data harvesting, data extracting, or any other similar activity in relation to Career Guide Pro.",
    "Using Career Guide Pro in any way that impacts user access to this website.",
  ];
  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>Privacy Policy</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ marginLeft: 3, marginRight: 3 }}>
          <Typography>
            At Career Guide Pro, we take your privacy seriously. This Privacy
            Policy outlines how we collect, use, disclose, and manage your
            personal information when you use our website and services.
          </Typography>

          <br></br>
          <Typography>
            We may collect personal information such as your name, email
            address, contact information, educational background, work
            experience, and other relevant details when you register an account
            or interact with our platform.
          </Typography>
          <br></br>
          <Typography>
            We use the information we collect to personalize your experience,
            improve our services, communicate with you, provide job
            recommendations, and facilitate the recruitment process between job
            seekers and employers.
          </Typography>
          <br></br>
          <Typography>
            We employ industry-standard security measures to protect your
            personal information from unauthorized access, disclosure,
            alteration, and destruction.
          </Typography>
          <br></br>
          <Typography>
            By using Career Guide Pro, you agree to the terms outlined in this
            Privacy Policy.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Terms & Conditions
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={"p"}>
            Welcome to Career Guide Pro! These terms and conditions outline the
            rules and regulations for the use of our website.
          </Typography>
          <br></br>

          <Typography component={"p"}>
            By accessing this website, we assume you accept these terms and
            conditions. Do not continue to use Career Guide Pro if you do not
            agree to take all of the terms and conditions stated on this page.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>Cookie Policy</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            At Career Guide Pro, we respect your concerns about privacy and
            value the relationship we have with you. Like many websites, we use
            technology on our website to collect information that helps us
            enhance your experience and our products and services. The cookies
            that we use at Career Guide Pro allow our website to work and help
            us to understand what information and advertising is most useful to
            visitors.{" "}
          </Typography>
          <br></br>
          {termsPoints.map((item) => (
            <li key={item} style={{fontSize:"1rem", fontFamily: 'Roboto, sans-serif', marginBottom:"0.4rem"}}> {item} </li>
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default page;
