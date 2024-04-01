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
} from "@mui/material";

export default function Page() {
  const { data: session } = useSession();

  const [employers, setEmployers] = useState([]);
  const [selectedEmployerId, setSelectedEmployerId] = useState("");
  const [loading, setLoading] = useState(true);
  // @ts-ignore
  const id = session?.user?.id;

  useEffect(() => {
    const fetchEmployers = async () => {
      setLoading(true);
      const res = await fetch(`/api/chat/candidate/employers?employeeId=${id}`);
      const data = await res.json();

      setEmployers(data.message);
      setLoading(false);
    };
    fetchEmployers();
  }, [id]);

  useEffect(() => {
    setSelectedEmployerId(!!employers.length ? `${employers[0]._id}` : "");
  }, [setSelectedEmployerId, employers]);

  return (
    <>
      {loading ? (
        <Stack justifyContent={"center"} alignItems={"center"}>
          <CircularProgress />
        </Stack>
      ) : (
        <>
          {employers.length ? (
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
                            {employer?.name?.split(" ")[0]}
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
