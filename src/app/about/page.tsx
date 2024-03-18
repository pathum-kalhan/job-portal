import {
  Typography,
} from "@mui/material";
import React from "react"; 

function Page() { 

  return (
    <>
      <Typography component={"h2"} variant={"h5"}>
        Career Guide Pro.
      </Typography>
      <br />
      <Typography component={"p"}>
        Career Guide Pro is a platform designed to help individuals navigate the
        complex career landscape, bridging the gap between talented
        professionals and thriving organizations. With a deep understanding of
        the evolving job market and a passion for empowering individuals, Career
        Guide Pro fosters meaningful interactions and facilitates seamless
        matches. With years of experience in recruitment, technology, and user
        experience, it&apos;s a gateway to limitless possibilities.
      </Typography>

      <Typography component={"p"} sx={{ marginTop: 5, textAlign: "center" }}>
        Take control of your career with Career Guide Pro and unlock endless
        opportunities for professional growth and development. Sign up today and
        start your journey toward success!
      </Typography>
    </>
  );
}

export default Page;
