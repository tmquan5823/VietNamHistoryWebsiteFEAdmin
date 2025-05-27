import { QuizSet } from "@/dataHelper/quizSet.dataHelper";
import React from "react";
import { ROUTERS, statusMap } from "@/constant";
import { useNavigate } from "react-router-dom";
import { FaQuestion } from "react-icons/fa6";
import { CiTimer } from "react-icons/ci";

interface QuizItemProps {
  quiz: QuizSet;
  onCancelPublish: (id: number) => void;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
  onPublish?: (id: number) => void;
}

const QuizItem: React.FC<QuizItemProps> = ({
  quiz,
  onCancelPublish,
  onApprove,
  onReject,
  onPublish,
}) => {
  const navigate = useNavigate();

  const handleApproveQuiz = (id: number) => {
    onApprove && onApprove(id);
  };

  const handleRejectQuiz = (id: number) => {
    onReject && onReject(id);
  };

  const handleCancelPublishQuiz = (id: number) => {
    onCancelPublish(id);
  };

  return (
    <div className="bg-white rounded-lg shadow border border-neutral-200 p-4 flex flex-col md:flex-row gap-4 items-center">
      <img
        src={quiz.image}
        alt={quiz.title}
        className="w-40 h-40 rounded object-cover border border-neutral-300 bg-neutral-100 flex-shrink-0"
      />
      <div className="flex-1 w-full flex flex-col h-full max-w-full min-w-0">
        <div className="flex items-start justify-between w-full mb-1">
          <div className="flex flex-wrap items-center gap-2 mb-1 min-w-0">
            <h2 className="text-lg font-semibold text-[#D12827] line-clamp-1 truncate w-full max-w-full overflow-hidden break-all min-w-0">
              {quiz.title}
            </h2>
            {quiz.status && (
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium select-none
                  ${
                    quiz.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : quiz.status === "pending"
                      ? "bg-blue-100 text-blue-700"
                      : quiz.status === "inactive"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-red-100 text-red-700"
                  }`}
                style={{ cursor: "default" }}
              >
                {statusMap[quiz.status] || quiz.status}
              </span>
            )}
          </div>
        </div>
        <p className="text-sm text-neutral-700 mb-1 line-clamp-1 break-all truncate max-w-full w-full overflow-hidden">
          {quiz.description}
        </p>
        <div className="text-xs text-neutral-600 mb-1">
          Tạo bởi: {quiz.creator?.fullname || "-"}
        </div>
        <div className="flex flex-wrap gap-2 mb-1">
          {quiz.topics &&
            quiz.topics.length > 0 &&
            quiz.topics.map((topic) => (
              <span
                key={topic.id}
                className="bg-[#FDDAA7] text-[#5D4037] px-2 py-0.5 rounded text-xs font-medium"
              >
                {topic.name}
              </span>
            ))}
        </div>
        <div className="flex items-center justify-between mt-auto mb-0">
          <div className="flex items-center text-xs text-neutral-600 gap-4">
            <span className="flex items-center gap-1">
              <FaQuestion className="text-base text-[#D12827]" />
              {quiz.playerCount ?? 0} Người chơi
            </span>
            <span className="flex items-center gap-1">
              <CiTimer className="text-base text-[#D12827]" />
              {new Date(quiz.createdAt).toLocaleString("vi-VN")}
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-3 items-center mt-4 justify-end">
          <button
            className="px-4 py-2 rounded bg-neutral-200 text-[#5D4037] text-sm font-semibold hover:bg-neutral-300 transition min-w-[90px] text-center"
            onClick={() => {
              navigate(
                `${ROUTERS.QUIZ_DETAIL.replace(":id", quiz.id.toString())}`
              );
            }}
          >
            Xem
          </button>
          {quiz.status === "pending" && (
            <>
              <button
                className="px-4 py-2 rounded bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition min-w-[90px] text-center"
                onClick={() => handleApproveQuiz(quiz.id)}
              >
                Phê duyệt
              </button>
              <button
                className="px-4 py-2 rounded bg-gray-500 text-white text-sm font-semibold hover:bg-gray-600 transition min-w-[90px] text-center"
                onClick={() => handleRejectQuiz(quiz.id)}
              >
                Từ chối
              </button>
            </>
          )}
          {quiz.status === "publish" && (
            <>
              <button
                onClick={() => handleCancelPublishQuiz(quiz.id)}
                className="px-4 py-2 rounded bg-yellow-500 text-white text-sm font-semibold hover:bg-yellow-600 transition min-w-[90px] text-center"
              >
                Vô hiệu hóa
              </button>
            </>
          )}
          {(quiz.status === "unpublish" || quiz.status === "inactive") && (
            <>
              <button
                onClick={() => onPublish && onPublish(quiz.id)}
                className="px-4 py-2 rounded bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition min-w-[90px] text-center"
              >
                Kích hoạt lại
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizItem;
