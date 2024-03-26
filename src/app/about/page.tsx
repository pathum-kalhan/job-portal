import {
  Stack,
  Typography,
} from "@mui/material";
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

      <Stack mt={4} direction="column" alignItems="center" justifyContent="center">
      <Image
              src={"/bg_images/about_us_body_image.webp"}
              alt="Welcome to Career Guide Pro"
              priority={true} 
              objectFit="contain"
              objectPosition="center"
              width={1000}
              height={550}
            />
            </Stack>
    </>
  );
}

export default Page;
