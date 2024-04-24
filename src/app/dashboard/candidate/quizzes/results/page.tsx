"use client";
import { ScoreDialogBox } from "../../../../../components/quiz/ScoreDialogBox";
import { useRouter } from "next/navigation";

function Page() {
  const searchParams = new URLSearchParams(window.location.search);
  const jobId = searchParams.get("jobId");
  const router = useRouter();

  const handleClose = (location: string) => {
    if (location === "/dashboard/profile") {
      router.push(location);
    } else if (location === "/dashboard/candidate/quizzes/start?jobId=") {
      router.push(`${location}${jobId}`);
    } else {
      return;
    }
  };

  return <ScoreDialogBox open={true} handleClose={handleClose} />;
}

export default Page;
