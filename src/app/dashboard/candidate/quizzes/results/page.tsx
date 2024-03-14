"use client"; 
import { ScoreDialogBox } from "../../../../../components/quiz/ScoreDialogBox";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const handleClose = () => {
    router.push("/dashboard/candidate/quizzes/start");
  };

  return <ScoreDialogBox open={true} handleClose={handleClose} />;
}

export default Page;
