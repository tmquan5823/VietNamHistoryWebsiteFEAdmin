import React from "react";
import { QuizSet } from "@/dataHelper/quizSet.dataHelper";
import QuizItem from "./QuizItem";

interface QuizListProps {
  quizsets: QuizSet[];
  onSortChange: (sort: "asc" | "desc") => void;
  sort: "asc" | "desc";
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  onCancelPublish: (id: number) => void;
  onPublish?: (id: number) => void;
}

const QuizList: React.FC<QuizListProps> = ({
  quizsets,
  onApprove,
  onReject,
  onCancelPublish,
  onPublish,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-4">
      {quizsets.map((quiz) => (
        <QuizItem
          key={quiz.id}
          quiz={quiz}
          onApprove={onApprove}
          onReject={onReject}
          onCancelPublish={onCancelPublish}
          onPublish={onPublish}
        />
      ))}
    </div>
  );
};

export default QuizList;
