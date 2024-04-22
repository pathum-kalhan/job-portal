import React, { useCallback, useEffect, useState } from "react";
import { DummyDialogBox } from "../../../dialogBoxes/DummyDialogBox";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSession } from "next-auth/react";
import { CircularProgress, Stack, Typography } from "@mui/material";

type props = {
  openDialogBox: boolean;
  handleCloseDialogBox: () => void;
};

function CandidateInterviewCalender(props: props) {
  const { openDialogBox, handleCloseDialogBox } = props;
  const localizer = momentLocalizer(moment);
  const { data: session } = useSession();
  const [backendCall, setBackendCall] = useState(true);
  const [eventsList, setEventsList] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      setBackendCall(true);

      const response = await fetch("/api/candidate/getInterviewSchedules", {
        method: "POST",
        body: JSON.stringify({
          email: session?.user?.email,
          // @ts-ignore
          userRole: session?.user?.role,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.status !== 200) {
        setBackendCall(false);
      } else {
        const data = await response.json();

        const reMapSchedules = data.data.map(
          (item: {
            interview: { scheduleDate: moment.MomentInput; notes: string };
          }) => {
            return {
              start: moment(item.interview.scheduleDate).toDate(),
              end: moment(item.interview.scheduleDate).add(2, "hours"),
              title: item.interview.notes,
            };
          }
        );

        setEventsList(reMapSchedules);
        setBackendCall(false);
      }
    } catch (error) {
      setBackendCall(false);
    }
    // @ts-ignore
  }, [session?.user?.email, session?.user?.role]);

  useEffect(() => {
    if (openDialogBox) {
      fetchData();
    }
  }, [fetchData, openDialogBox]);

  return (
    <>
      <DummyDialogBox
        handleCloseDialogBox={handleCloseDialogBox}
        openDialogBox={openDialogBox}
        title="Interview Schedules"
        maxWidth="xl"
      >
        {backendCall ? (
          <Stack alignItems={"center"} justifyContent={"center"}>
            <CircularProgress sx={{ color: "black" }} />
          </Stack>
        ) : !backendCall && eventsList.length ? (
          <Calendar
            views={["month"]}
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={eventsList}
            style={{ height: "100vh" }}
            onSelectEvent={(event) =>
              alert(`Meeting Start at: ${event.start} and End at: ${event.end}`)
            }
          />
        ) : (
          <Typography textAlign="center" variant="h4">
            Events not available right now!
          </Typography>
        )}
      </DummyDialogBox>
    </>
  );
}

export default CandidateInterviewCalender;
