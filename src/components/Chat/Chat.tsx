"use client";
import Paper from "@mui/material/Paper";
import { TextInput } from "./MessageInput";
import { MessageLeft, MessageRight } from "./Message";
import { useState } from "react";
import { Card, CardContent, Grid } from "@mui/material";

const paperStyles = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  position: "relative",
};

const containerStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const messagesBodyStyles = {
  margin: 10,
  overflowY: "scroll",
  height: "calc(100% - 80px)",
};

type Messages = {
  type: "left" | "right";
  message: string;
  timestamp: string;
  displayName: string;
  avatarDisp: boolean;
}[];

const chatMessages: Messages = [
  {
    type: "left",
    message: "Hi",
    timestamp: "MM/DD 00:00",
    displayName: "new",
    avatarDisp: true,
  },
  {
    type: "right",
    message: "Hidasdada ad ad ada d adad d ada d a Hidasdada ad ad ada d adad d ada d a Hidasdada ad ad ada d adad d ada d a Hidasdada ad ad ada d adad d ada d a",
    timestamp: "MM/DD 00:00",
    displayName: "Sasiru",
    avatarDisp: true,
  },
  
];

export const Chat = () => {
  const [messages, setMessages] = useState<Messages>(chatMessages);

  const addMessage = (message: Messages[0]) => {
    setMessages([...messages, message]);
  };

  return (
    <Card>
      <CardContent>
        <Grid container >
          
            {messages.map((message, index) => {
              if (message.type === "left") {
                return (
                  <Grid container item alignItems="center" justifyContent="flex-start"  key={index} mt={4} mb={1}>
                  <Grid item>
                    <Paper sx={{ width: "15rem" }} elevation={2}>
                      <MessageLeft
                        message={message.message}
                        timestamp={message.timestamp}
                        displayName={message.displayName}
                        avatarDisp={message.avatarDisp}
                      />
                    </Paper>
                  </Grid>
                  </Grid>
                );
              } else {
                return (
                  <Grid container item alignItems="center" justifyContent="flex-end"  key={index} mt={1} mb={4}>
                  <Grid item>
                    <Paper sx={{ width: "15rem" }} elevation={2} key={index}>
                      <MessageRight
                        key={index}
                        message={message.message}
                        timestamp={message.timestamp}
                        displayName={message.displayName}
                        avatarDisp={message.avatarDisp}
                      />
                    </Paper>
                  </Grid>
                  </Grid>
                );
              }
            })}

            <TextInput addMessage={addMessage} />
          </Grid>
      </CardContent>
    </Card>
  );
};
