"use client";
import Paper from "@mui/material/Paper";
import { TextInput } from "./MessageInput";
import { MessageLeft, MessageRight } from "./Message";
import { useEffect, useState } from "react";
import { Card, CardContent, Grid } from "@mui/material";
import { ChatMediator } from "../../app/api/chat/chatClass";

const paperStyles = {
  width: "100vw",
  height: "85vh",
  maxWidth: "1000px",
  maxHeight: "700px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  position: "relative",
  padding: "10px",
};

const containerStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const messagesBodyStyles = {
  width: "calc(100% - 20px)",
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
    <div style={containerStyles}>
      <Paper sx={paperStyles} elevation={2}>
        <Paper sx={messagesBodyStyles}>
          {messages.length > 0 &&
            messages.map((message, index) => {
              if (
                message.employeeId === employeeId ||
                message.employerId === employerId
              ) {
                return (
                  <MessageRight
                    key={index}
                    message={message.message}
                    timestamp={message.timestamp}
                    displayName={message.displayName}
                  />
                );
              } else {
                return (
                  <MessageLeft
                    key={index}
                    message={message.message}
                    timestamp={message.timestamp}
                    displayName={message.displayName}
                    photoURL={message.photoURL}
                  />
                );
              }
            })}
        </Paper>

        <TextInput
          addMessage={addMessage}
          employeeId={employeeId}
          employerId={employerId}
        />
      </Paper>
    </div>
  );
};
