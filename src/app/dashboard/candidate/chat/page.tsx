"use client";
import { useSession } from "next-auth/react";
import { Chat } from "../../../../components/Chat/Chat";
import { useEffect, useState } from "react";
import { Avatar, Button, Grid } from "@mui/material";
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
    <Grid>
      <Grid item>
        {employers.map((employer) => (
          <Button
            key={employer._id}
            onClick={() => {
              setSelectedEmployerId(employer._id);
            }}
          >
            <Avatar src={employer.profilePic.image} />
          </Button>
        ))}
      </Grid>
      <Grid item>
        <Chat employeeId={id} employerId={selectedEmployerId} />
      </Grid>
    </Grid>
  );
}
