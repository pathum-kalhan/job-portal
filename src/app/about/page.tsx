import { Stack, Typography } from "@mui/material";
import Image from "next/image";
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

      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        pl={{lg:28, md:5, sm:2, xs:0}}
        pr={{ lg: 28, md: 5, sm: 2, xs: 0 }}
        mt={4}
      >
        <Image
          src={"/bg_images/about_us_body_image.webp"}
          alt="Welcome to Career Guide Pro"
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
          width={1000}
          height={400}
        />
      </Stack>
    </>
  );
}

export default Page;
