import React from "react";
import { FaQuestion } from "react-icons/fa6";
import { CiTimer } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { statusMap } from "@/constant";

interface QuizSetViewProps {
  quizSetData: any; // Dùng any để nhận cả QuizSetForPlay hoặc QuizSet
  onPlay?: () => void;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
  onUnpublishQuiz?: (id: number) => void;
  onPublish?: (id: number) => void;
}

const QuizSetView: React.FC<QuizSetViewProps> = ({
  quizSetData,
  onPlay,
  onApprove,
  onReject,
  onUnpublishQuiz,
  onPublish,
}) => {
  if (!quizSetData) return null;
  return (
    <div className="w-full bg-white rounded-lg shadow-2xl border-2 border-[#D12827] p-6 mt-6 transition-transform duration-200 hover:scale-[1.01]">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <img
          src={quizSetData?.image}
          alt={quizSetData?.title}
          className="w-40 h-40 rounded object-cover border border-neutral-300 bg-neutral-100 flex-shrink-0 self-center md:self-start"
        />
        <div className="flex-1 flex flex-col gap-2 h-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h1 className="text-2xl font-bold text-[#D12827] break-words break-all md:max-w-[70%]">
              {quizSetData?.title}
            </h1>
            {quizSetData.status && (
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium select-none ml-2
                  ${
                    quizSetData.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : quizSetData.status === "pending"
                      ? "bg-blue-100 text-blue-700"
                      : quizSetData.status === "inactive"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-red-100 text-red-700"
                  }`}
                style={{ cursor: "default" }}
              >
                {statusMap[quizSetData.status] || quizSetData.status}
              </span>
            )}
          </div>
          <p className="text-sm text-neutral-700 whitespace-pre-line break-words break-all mb-2">
            {quizSetData?.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-1">
            {quizSetData?.topics?.map((topic: any) => (
              <span
                key={topic.id}
                className="bg-[#FDDAA7] text-[#5D4037] px-2 py-0.5 rounded text-xs font-medium"
              >
                {topic.name}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs text-neutral-600 justify-between mt-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <FaQuestion className="text-base text-[#D12827]" />
                {quizSetData.questionCount} Câu hỏi
              </span>
              <span className="flex items-center gap-1">
                <FaUserFriends className="text-base text-[#D12827]" />
                {quizSetData.playerCount ?? 0} người chơi
              </span>
              <span className="flex items-center gap-1">
                <CiTimer className="text-base text-[#D12827]" />
                {new Date(quizSetData.createdAt).toLocaleString("vi-VN")}
              </span>
            </div>
            <div className="flex flex-row gap-3 items-center min-w-[340px] justify-end">
              <button
                className="bg-[#2563eb] text-white font-bold text-sm px-4 py-2 rounded hover:bg-[#1d4ed8] transition min-w-[90px] text-center"
                onClick={onPlay}
              >
                Chơi thử
              </button>
              {quizSetData.status === "pending" && (
                <>
                  <button
                    className="px-4 py-2 rounded bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition min-w-[90px] text-center"
                    onClick={() => onApprove && onApprove(quizSetData.id)}
                  >
                    Phê duyệt
                  </button>
                  <button
                    className="px-4 py-2 rounded bg-gray-500 text-white text-sm font-semibold hover:bg-gray-600 transition min-w-[90px] text-center"
                    onClick={() => onReject && onReject(quizSetData.id)}
                  >
                    Từ chối
                  </button>
                </>
              )}
              {quizSetData.status === "publish" && (
                <>
                  <button
                    onClick={() =>
                      onUnpublishQuiz && onUnpublishQuiz(quizSetData.id)
                    }
                    className="px-4 py-2 rounded bg-yellow-500 text-white text-sm font-semibold hover:bg-yellow-600 transition min-w-[90px] text-center"
                  >
                    Vô hiệu hóa
                  </button>
                </>
              )}
              {(quizSetData.status === "unpublish" ||
                quizSetData.status === "inactive") && (
                <>
                  <button
                    onClick={() =>
                      onPublish
                        ? onPublish(quizSetData.id)
                        : onApprove && onApprove(quizSetData.id)
                    }
                    className="px-4 py-2 rounded bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition min-w-[90px] text-center"
                  >
                    Kích hoạt lại
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-6 border-t pt-4">
        <img
          src={quizSetData?.creator?.avatar}
          alt={quizSetData?.creator?.fullname}
          className="w-12 h-12 rounded-full object-cover border border-neutral-300"
        />
        <div>
          <div className="font-semibold text-[#5D4037]">
            {quizSetData?.creator?.fullname}
          </div>
          <div className="text-xs text-neutral-500">
            {quizSetData?.creator?.email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSetView;
