"use client";
import React, { useCallback, useEffect, useState } from "react";
import { UserListCard } from "../../../../components/cards/admin/UserListCard";
import { CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type userInfo = {
  _id: string;
  email: string;
  name: string;
  contactNo: string;
  profileStatus: string;

  profilePic: {
    image?: string;
    status: Boolean;
  };
};

function Page() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [usersInfo, setUsersInfo] = useState<userInfo[]>([]);
  const [backendCall, setBackendCall] = useState<any>(true);

  const loadUsers = useCallback(async () => {
    try {
      setBackendCall(true);

      const response = await fetch("/api/admin/getCandidates", {
        method: "POST",
        body: JSON.stringify({
          email: session?.user?.email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.status !== 200) {
        setBackendCall(false);
      } else {
        const data = await response.json();
        setUsersInfo(data.data);

        setBackendCall(false);
      }
    } catch (error) {
      setBackendCall(false);
    }
    // @ts-ignore
  }, [session?.user?.email]);

  useEffect(() => {
    if (status === "authenticated" && !usersInfo.length) {
      loadUsers();
    }

    if (status !== "loading" && !session) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <Grid container gap={10}>
      {/* Filter Section */}

      <Grid
        container
        item
        alignItems="center"
        justifyContent="center"
        xs={12}
        gap={3}
      >
        {!backendCall ? (
          !usersInfo.length ? (
            <Stack alignItems="center" justifyContent="center">
              <Typography variant="h5">
                Candidates not available Yet.
              </Typography>
            </Stack>
          ) : (
            usersInfo.map((item: userInfo) => {
              return (
                <Grid item xs={12} key={item?._id}>
                  <UserListCard userRole={"candidate"} jobPostInfo={item} loadUsers={loadUsers} />
                </Grid>
              );
            })
          )
        ) : (
          <Stack alignItems="center" justifyContent="center">
            <CircularProgress />
          </Stack>
        )}
      </Grid>
    </Grid>
  );
}

export default Page;
