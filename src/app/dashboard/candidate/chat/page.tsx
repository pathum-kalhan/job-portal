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
                      variant={
                        selectedEmployerId === employer._id
                          ? "contained"
                          : "outlined"
                      }
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={4}>
                          <Avatar src={employer?.profilePic?.image} />
                        </Grid>
                        <Grid item>
                          <Tooltip
                            title={employer?.name.length > 7 && employer?.name}
                            placement="bottom-start"
                          >
                            <Typography
                              sx={{
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              {splitString(employer?.name, 7)}
                            </Typography>
                          </Tooltip>
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
