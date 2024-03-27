"use client";
import { useSession } from "next-auth/react";
import { Chat } from "../../../../components/Chat/Chat";
import { useEffect, useState } from "react";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
export default function Page() {
  const { data: session } = useSession();

  const [employers, setEmployers] = useState([]);
  const [selectedEmployerId, setSelectedEmployerId] = useState("");
  // @ts-ignore
  const id = session?.user?.id;

  useEffect(() => {
    const fetchEmployers = async () => {
      const res = await fetch(`/api/chat/candidate/employers?employeeId=${id}`);
      const data = await res.json();

      console.log(data);
      setEmployers(data.message);
    };
    fetchEmployers();
  }, [id]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {employers.map((employer) => (
            <Button
              key={employer._id}
              onClick={() => {
                setSelectedEmployerId(employer._id);
              }}
            >
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Avatar src={employer?.profilePic?.image} />
                </Grid>
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {employer?.name}
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          ))}
        </Box>
      </Grid>

      <Grid item xs={10}>
        <Chat employeeId={id} employerId={selectedEmployerId} />
      </Grid>
    </Grid>
  );
}
