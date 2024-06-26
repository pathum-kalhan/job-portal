"use client";
import { useSession } from "next-auth/react";
import { Chat } from "../../../../components/Chat/Chat";
import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Stack,
  Tooltip,
} from "@mui/material";
import { splitString } from "../../../../utils/splitString";
export default function Page() {
  const { data: session } = useSession();

  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [loading, setLoading] = useState(true);
  // @ts-ignore
  const id = session?.user?.id;

  useEffect(() => {
    const fetchEmployers = async () => {
      setLoading(true);
      const res = await fetch(`/api/chat/employer/candidates?employerId=${id}`);
      const data = await res.json();
      setEmployees(data.message);
      setLoading(false);
    };
    fetchEmployers();
  }, [id]);

  useEffect(() => {
    setSelectedEmployeeId(!!employees.length ? `${employees[0]._id}` : "");
  }, [setSelectedEmployeeId, employees]);

  return (
    <>
      {loading ? (
        <Stack justifyContent={"center"} alignItems={"center"}>
          <CircularProgress />
        </Stack>
      ) : (
        <>
          {employees.length ? (
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {employees.map((employee) => (
                    <Button
                      key={employee._id}
                      onClick={() => {
                        setSelectedEmployeeId(employee._id);
                      }}
                      variant={
                        selectedEmployeeId === employee._id
                          ? "contained"
                          : "outlined"
                      }
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={4}>
                          <Avatar src={employee?.profilePic?.image} />
                        </Grid>
                        <Grid item>
                          <Tooltip
                            title={employee?.name.length > 7 && employee?.name}
                            placement="bottom-start"
                          >
                            <Typography
                              sx={{
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              {splitString(employee?.name, 7)}
                            </Typography>
                          </Tooltip>
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
          ) : (
            <Stack alignItems="center" justifyContent="center">
              <Typography variant="h5">Inbox is empty.</Typography>
            </Stack>
          )}
        </>
      )}
    </>
  );
}
