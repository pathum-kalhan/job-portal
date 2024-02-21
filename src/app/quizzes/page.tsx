import { questions } from "@/utils/quiz/questions";
import { QandA } from "@/components/quiz/QandA";

function page() {
  return (
    <>
      <QandA questions={questions} />
      
    </>
  );
}

export default page;
