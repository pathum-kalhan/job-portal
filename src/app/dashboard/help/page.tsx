"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import { SupportTicketForm } from "../../../components/forms/SupportTicketForm";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FaxIcon from "@mui/icons-material/Fax";

function Page() {

  const contactInfo = [
    {
      Icon: EmailIcon,
      title: "careerguidpro@gmail.com",
      link: "mailto:careerguidpro@gmail.com",
    },
    {
      Icon: PhoneIcon,
      title: "0112 980 958",
      link: "tel:0112980958",
    },
    {
      Icon: FaxIcon,
      title: "0112 958 980",
      link: "tel:0112 958 980",
    },
  ];

  const fAq = [
    {
      question: "What does matching for jobs mean?",
      answer: `When you are matched to a job, it means that the job has met all your career preferences! If you see a match on your dashboard, you can choose to apply or reject the role.`,
    },
    {
      question: "How does an incomplete profile affect me?",
      answer: `The algorithm can only start matching you against jobs when you have a complete profile. There are 4 segments on the left panel after you login, “Experience, Job Preferences, CV and Quiz”. Once you complete four segments, the algorithm will work its magic and start matching you to suitable roles!`,
    },
    {
      question:
        "I am a Fresh Graduate with no professional experience. What do I fill in for “Total Work Experience”?",
      answer: `Welcome to the workforce! We are happy to be part of your journey. You may no need to fill this segment. If you have any internship experiences, feel free to include them under “Experience”.
      `,
    },
    {
      question: "There are no jobs matched to me.",
      answer: `Don't worry if you do not see any matching jobs. We will continue to match you with all new jobs, as they are created. You will be notified via email as soon as a new job matching your profile is available. Meanwhile, do visit our job advice forum to get insights and further job search support!.
      `,
    },
    {
      question:
        "Why does it still show “0 Applications” on my dashboard when I have submitted my CV a few times successfully?",
      answer: `Once your profile is complete, you are automatically matched against all open roles and notified when a suitable role comes up. You do not need to resubmit your CV every time! The “Applications” you see on the dashboard are the ones you apply to after you have been matched by our algorithms to a specific open role.
      `,
    },
    {
      question: "Are there any humans doing the matching?",
      answer: `Hiring on our platform is fully automated and data driven. Our algorithms are based on decades of specialist recruitment experience and use data driven insights to remove bias in the recruiting process and match you to roles where you have a high chance of securing an interview.
      `,
    },
  ];

  return (
    <>
      <Card sx={{ backgroundColor: "#d6d6d6" }}>
        <CardContent>
          <Grid container>
            <Grid
              container
              item
              justifyContent="space-between"
              alignItems="center"
              gap={2}
            >
              <Grid item md={"auto"} sm={12} xs={12}>
                {" "}
                <Typography component={"h2"} variant={"h5"}>
                  Frequently Asked Questions.
                </Typography>
                <Typography component={"p"}>
                  Find your answers in our frequently asked questions or contact
                  us.
                </Typography>
              </Grid>
              <Grid item md={"auto"} sm={12} xs={12}>
                {" "}
                <Link href="/contact-us">
                  <Button variant="contained">Contact Us</Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <br />
      <br />

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>FAQ Section</Typography>
        </AccordionSummary>
        {fAq.map((item, index) => (
          <AccordionDetails key={item.question}>
            <Typography component={"h1"} fontWeight="bold">
              {index + 1}. {item.question}
            </Typography>

            <Typography component={"p"}>{item.answer}</Typography>
          </AccordionDetails>
        ))}
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Support Ticket Submission Form
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <SupportTicketForm />
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Contact Information
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ textAlign: "center", fontSize: "1.2rem" }}>
            If you have any questions or concerns about our website or data
            practices, please contact us at
          </Typography>

          {contactInfo.map((item) => {
            const { title, Icon, link } = item;
            return (
              <List key={title}>
                <ListItem disablePadding>
                  <Link
                    href={link}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                      <ListItemText primary={title} />
                    </ListItemButton>
                  </Link>
                </ListItem>
              </List>
            );
          })}
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default Page;
