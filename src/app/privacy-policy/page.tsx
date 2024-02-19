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
          <Typography sx={{ fontWeight: "bold" }}>Privacy Policy</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ marginLeft: 3, marginRight: 3 }}>
          <Typography>
          <Typography>
            Career Guide Pro respects your privacy and is committed to
            protecting it through our compliance with this policy. This policy
            describes:
          </Typography>

          <br></br>
            <ul>
          <Typography>
              <li>
                The types of information we may collect from you or that you may
                provide when you visit the
                <a href="https://job-portal-jet.vercel.app/">
                  {" "}
                  Career Guide Pro website{" "}
                </a>
                and our practices for collecting, using, maintaining,
                protecting, and disclosing that information.
              </li>
              <br></br>
              </Typography>
              <Typography>
              <li>
                This policy applies to information we collect:
                <ul style={{ marginLeft: "1rem" }}>
                  <li> On this website. </li>
                  <li>
                    {" "}
                    In email, text, and other electronic messages between you
                    and this website.
                  </li>
                  <li>
                    {" "}
                    Through mobile and desktop applications you download from
                    this website, which provide dedicated non-browser-based
                    interaction between you and this website.{" "}
                  </li>
                </ul>
              </li>
              <br></br>
          </Typography>

              <li>
                Please read this policy carefully to understand our policies and
                practices regarding your information and how we will treat it.
                If you do not agree with our policies and practices, your choice
                is not to use our website. By accessing or using this website,
                you agree to this privacy policy. This policy may change from
                time to time. Your continued use of this website after we make
                changes is deemed to be acceptance of those changes, so please
                check the policy periodically for updates.
              </li>
            </ul>
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
            rules and regulations for the use of Career Guide Pro&apos;s
            Website, located at{" "}
            <a href="https://job-portal-jet.vercel.app/">
              {" "}
              Career Guide Pro website{" "}
            </a>
            .
          </Typography>
          <br></br>
          <Typography component={"p"}>
            By accessing this website, we assume you accept these terms and
            conditions. Do not continue to use Career Guide Pro if you do not
            agree to take all of the terms and conditions stated on this page.
          </Typography>
          <br></br>

          <Typography component={"p"}>
            The following terminology applies to these Terms and Conditions,
            Privacy Statement, and Disclaimer Notice and all agreements:
            &quot;Client,&quot; &quot;You,&quot; and &quot;Your&quot; refer to
            you, the person log on this website and compliant to the
            Company&apos;s terms and conditions. &quot;The Company,&quot;
            &quot;Ourselves,&quot; &quot;We,&quot; &quot;Our,&quot; and
            &quot;Us,&quot; refer to our Company. &quot;Party,&quot;
            &quot;Parties,&quot; or &quot;Us,&quot; refer to both the Client and
            ourselves. All terms refer to the offer, acceptance, and
            consideration of payment necessary to undertake the process of our
            assistance to the Client in the most appropriate manner for the
            express purpose of meeting the Client&apos;s needs in respect of the
            provision of the Company&apos;s stated services, in accordance with
            and subject to, prevailing law of the United States. Any use of the
            above terminology or other words in the singular, plural,
            capitalization, and/or he/she or they, are taken as interchangeable
            and therefore as referring to the same.
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
            At Career Guide Pro, we respect your concerns about privacy and value
            the relationship we have with you. Like many websites, we use
            technology on our website to collect information that helps us
            enhance your experience and our products and services. The cookies
            that we use at Career Guide Pro allow our website to work and help us
            to understand what information and advertising is most useful to
            visitors. </Typography>
          <br></br>
          <Typography>
            By continuing to use our website, you agree to our use of
            cookies as described in this Cookie Policy. If you do not agree to
            the use of cookies as described in this Cookie Policy, you may block
            or disable them using your browser settings, as described below.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default page;
