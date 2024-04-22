import React from "react";
import {
  Dialog,
  Card,
  CardHeader,
  CardContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { OverridableStringUnion } from "@mui/types";

export interface BreakpointOverrides {}

type props = {
  openDialogBox: boolean;
  handleCloseDialogBox: () => void;
  title: string;
  maxWidth?: OverridableStringUnion<
    "xs" | "sm" | "md" | "lg" | "xl",
    BreakpointOverrides
  >;
  children: React.ReactNode;
};

function DummyDialogBox(props: props) {
  const {
    openDialogBox,
    handleCloseDialogBox,
    title,
    children,
    maxWidth = "sm",
  } = props;
  return (
    <Dialog
      fullScreen={false}
      fullWidth
      maxWidth={maxWidth}
      open={openDialogBox}
      onClose={handleCloseDialogBox}
    >
      <Card
        sx={{ padding: { lg: "2rem", md: "2rem", sm: "2rem", xs: "1rem" } }}
      >
        <CardHeader
          action={
            <IconButton onClick={handleCloseDialogBox} autoFocus>
              <CloseIcon fontSize="large" sx={{ color: "black" }} />
            </IconButton>
          }
          title={title}
          sx={{ textAlign: "center" }}
        />
        <CardContent sx={{ maxHeight: "20rem", overflowY: "auto" }}>
          {children}
        </CardContent>
      </Card>
    </Dialog>
  );
}

export { DummyDialogBox };
