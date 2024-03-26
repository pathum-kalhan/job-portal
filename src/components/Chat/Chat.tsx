"use client";
import Paper from "@mui/material/Paper";
import { TextInput } from "./MessageInput";
import { MessageLeft, MessageRight } from "./Message";
import { useEffect, useState } from "react";
import { Card, CardContent, Grid } from "@mui/material";
import { ChatMediator } from "../../app/api/chat/chatClass";

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
  employerId: string;
  employeeId: string;
  role: "candidate" | "employer";
  message: string;
  timestamp: string;
  displayName: string;
  photoURL: string;
}[];

type Props = {
  employeeId: string;
  employerId: string;
};

const mediator = new ChatMediator();

export const Chat = ({ employeeId, employerId }: Props) => {
  const [messages, setMessages] = useState<Messages>([]);

  useEffect(() => {
    const getMessages = async () => {
      const response = await fetch(
        `/api/chat?employerId=${employerId}&employeeId=${employeeId}`
      );
      const data = await response.json();
      console.log(data, "data");
      setMessages(data.message);
    };

    getMessages();
  }, [employeeId, employerId]);

  const handleNewMessage = (message: Messages[0]) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    mediator.subscribe(handleNewMessage);
    return () => mediator.unsubscribe(handleNewMessage);
  }, []);

  const addMessage = (message: Messages[0]): void => {
    mediator.sendMessage(message);
  };

  return (
    <Card>
      <CardContent>
        <Grid container>
          {messages.length > 0 &&
            messages.map((message, index) => {
              if (
                message.employeeId != employeeId ||
                message.employerId != employerId
              ) {
                return (
                  <Grid
                    container
                    item
                    alignItems="center"
                    justifyContent="flex-start"
                    key={index}
                    mt={4}
                    mb={1}
                  >
                    <Grid item>
                      <Paper sx={{ width: "15rem" }} elevation={2}>
                        <MessageRight
                          key={index}
                          message={message.message}
                          timestamp={message.timestamp}
                          displayName={message.displayName}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                );
              } else {
                return (
                  <Grid
                    container
                    item
                    alignItems="center"
                    justifyContent="flex-end"
                    key={index}
                    mt={1}
                    mb={4}
                  >
                    <Grid item>
                      <Paper sx={{ width: "15rem" }} elevation={2} key={index}>
                        <MessageLeft
                          message={message.message}
                          timestamp={message.timestamp}
                          displayName={message.displayName}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                );
              }
            })}

          <TextInput
            addMessage={addMessage}
            employeeId={employeeId}
            employerId={employerId}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};
