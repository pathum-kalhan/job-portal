"use client";
import { useSession } from "next-auth/react";
import { Chat } from "../../../../components/Chat/Chat";
import { useEffect, useState } from "react";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
export default function Page() {
  const { data: session } = useSession();

  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  // @ts-ignore
  const id = session?.user?.id;

  useEffect(() => {
    const fetchEmployers = async () => {
      const res = await fetch(`/api/chat/employer/candidates?employerId=${id}`);
      const data = await res.json();
      setEmployees(data.message);
    };
    fetchEmployers();
  }, [id]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {employees.map((employee) => (
            <Button
              key={employee._id}
              onClick={() => {
                setSelectedEmployeeId(employee._id);
              }}
            >
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Avatar src={employee?.profilePic?.image} />
                </Grid>
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {employee?.name}
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          ))}
        </Box>
      </Grid>

      <Grid item xs={10}>
        <Chat employerId={id} employeeId={selectedEmployeeId} />
      </Grid>
    </Grid>
  );
}
