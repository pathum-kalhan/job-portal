import { IconButton, Stack } from "@mui/material";
import React from "react";
import Link from "next/link";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import TuneIcon from "@mui/icons-material/Tune";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";

function RightSideAttachedMenu() {
  return (
    <Stack
      direction={{
        lg: "column",
        md: "column",
        sm: "column",
        xs: "row",
      }}
      gap={0}
    >
      <Link
        href="/dashboard/candidate/chat"
        style={{
          textDecoration: "none",
          color: "black",
        }}
      >
        <IconButton color="inherit">
          <ForwardToInboxIcon fontSize="medium" />
        </IconButton>
      </Link>

      <Link
        href="/dashboard/settings"
        style={{
          textDecoration: "none",
          color: "black",
        }}
      >
        <IconButton color="inherit">
          <TuneIcon fontSize="medium" />
        </IconButton>
      </Link>

      <Link
        href="/dashboard/help"
        style={{
          textDecoration: "none",
          color: "black",
        }}
      >
        <IconButton color="inherit">
          <HelpCenterOutlinedIcon fontSize="medium" />
        </IconButton>
      </Link>
    </Stack>
  );
}

export { RightSideAttachedMenu };
