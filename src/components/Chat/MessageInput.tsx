"use client";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const WrapForm = styled("form")({
  display: "flex",
  justifyContent: "center",
  width: "95%",
  margin: "0 auto",
  padding: "10px",
});

const WrapText = styled("div")({
  width: "100%",
});

type Message = {
  employeeId: string;
  employerId: string;
  role: "candidate" | "employer";
  message: string;
  timestamp: string;
  displayName: string;
  photoURL: string;
};

type Props = {
  employerId: string;
  employeeId: string;
  addMessage: (message: Message) => void;
};

export const TextInput = ({ employeeId, employerId, addMessage }: Props) => {
  const { data: session } = useSession();
  const [textValue, setTextValue] = useState("");

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!textValue.trim()) return;
    const message: Message = {
      employeeId,
      employerId,
      // @ts-ignore
      role: session?.user?.role!,
      message: textValue,
      timestamp: new Date().toLocaleString(),
      displayName: session?.user?.name!,
      // @ts-ignore
      photoURL: session?.user?.profileImage!,
    };

    addMessage(message);
    setTextValue("");
  };

  return (
    <>
      <WrapForm noValidate autoComplete="off" onSubmit={sendMessage}>
        <WrapText>
          <TextField
            id="standard-text"
            label="Send message"
            fullWidth
            value={textValue}
            disabled={
              employerId === ""
                ? true
                : false && employeeId === ""
                ? true
                : false
            }
            onChange={(e) => setTextValue(e.target.value)}
          />
        </WrapText>
        <Button variant="contained" color="primary" type="submit">
          <SendIcon />
        </Button>
      </WrapForm>
    </>
  );
};
