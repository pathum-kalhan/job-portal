"use client";

import React from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { deepOrange, blue, green } from "@mui/material/colors";

const MessageRow = styled("div")({
  display: "flex",
});

const MessageRowRight = styled(MessageRow)({
  justifyContent: "flex-end",
});

const MessageBubbleRight = styled("div")(({ theme }) => ({
  position: "relative",
  marginBottom: "10px",
  padding: "10px",
  width: "60%",
  textAlign: "left",
  font: '400 .9em "Open Sans", sans-serif',
  borderRadius: "10px",
  backgroundColor: blue[300],
}));

const MessageBubbleLeft = styled("div")(({ theme }) => ({
  position: "relative",
  marginBottom: "10px",
  padding: "10px",
  width: "60%",
  textAlign: "left",
  font: '400 .9em "Open Sans", sans-serif',
  borderRadius: "10px",
  backgroundColor: green[300],
}));

const OrangeAvatar = styled(Avatar)(({ theme }) => ({
  color: theme.palette.getContrastText(deepOrange[500]),
  backgroundColor: deepOrange[500],
  width: theme.spacing(4),
  height: theme.spacing(4),
}));

const DisplayName = styled("div")({
  marginLeft: "20px",
});

export const MessageLeft = (props: any) => {
  const { message, timestamp, photoURL, displayName } = props;

  return (
    <>
      <MessageRow>
        <OrangeAvatar alt={displayName} src={photoURL}></OrangeAvatar>
        <div>
          <DisplayName>{displayName}</DisplayName>
          <MessageBubbleLeft>
            <p>{message}</p>
            <div>{timestamp}</div>
          </MessageBubbleLeft>
        </div>
      </MessageRow>
    </>
  );
};

export const MessageRight = (props: any) => {
  const { message = "no message", timestamp = "" } = props;

  return (
    <MessageRowRight>
      <MessageBubbleRight>
        <p>{message}</p>
        <div>{timestamp}</div>
      </MessageBubbleRight>
    </MessageRowRight>
  );
};
