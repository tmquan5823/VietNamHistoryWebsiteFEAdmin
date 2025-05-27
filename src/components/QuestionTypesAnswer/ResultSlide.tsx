import React, { useRef, useEffect } from "react";
import QuizHeader from "../common/QuizHeader";
import { AnswerChecked } from "@/utils/type";
import { QuizResults } from "@/dataHelper/quizSet.dataHelper";

interface ResultSlideProps {
  answerResults: { [questionNumber: number]: AnswerChecked };
  onRestart?: () => void;
  onClose?: () => void;
  fullscreen?: boolean;
  handleFullscreen?: () => void;
  quizResults?: QuizResults;
  leaderBoardLoading?: boolean;
}

const ResultSlide: React.FC<ResultSlideProps> = ({
  answerResults,
  onRestart,
  onClose,
  fullscreen = false,
  handleFullscreen = () => {},
  quizResults,
  leaderBoardLoading,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLarge = fullscreen;
  console.log(quizResults);
  useEffect(() => {
    if (fullscreen && containerRef.current && !document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
    } else if (!fullscreen && document.fullscreenElement) {
      document.exitFullscreen?.();
    }
  }, [fullscreen]);

  // Tính tổng điểm
  const totalScore = Object.values(answerResults).reduce(
    (sum, result) => sum + (result?.score ?? 0),
    0
  );

  // Lấy dữ liệu quizResults nếu có
  const hasQuizResults =
    !!quizResults && Array.isArray(quizResults.quizResults);
  const quizResultList = hasQuizResults ? quizResults.quizResults : [];
  const leaderboard = quizResults?.leaderboard;
  const totalQuizResultScore = quizResultList.reduce(
    (sum, r) => sum + (r.score ?? 0),
    0
  );

  return (
    <div
      ref={containerRef}
      className={`relative bg-[#FEE9C3] flex flex-col items-center justify-center ${
        fullscreen ? "w-screen h-screen" : "w-[90vw] h-[90vh]"
      }`}
    >
      <QuizHeader fullscreen={fullscreen} handleFullscreen={handleFullscreen} />
      <div className="flex-1 w-full flex flex-col items-center justify-center px-4 pb-8">
        <div
          className={`flex flex-col md:flex-row items-stretch justify-center w-full mx-auto gap-8 max-h-[80vh]`}
        >
          {/* Bảng kết quả hiện tại */}
          <div className="flex-1 flex flex-col items-center max-w-xl bg-white rounded-2xl shadow-lg p-6 mb-6 h-full min-h-[370px] max-h-[80vh] mt-6">
            <div
              className={`font-bold text-center mb-6 mt-2 text-[#5D4037] ${
                isLarge ? "text-4xl" : "text-2xl"
              } leading-tight break-words`}
              style={{ wordBreak: "break-word", maxWidth: "60%" }}
            >
              Kết quả của bạn
            </div>
            {/* Tổng điểm */}
            <div className="mb-4 text-xl font-bold text-[#D4A017] drop-shadow-sm text-center">
              Tổng điểm:{" "}
              <span className="text-2xl text-[#D12827]">{totalScore}</span>
            </div>
            <div className="w-full flex-1 overflow-y-auto max-h-[35vh]">
              <table className="w-full text-center border-separate border-spacing-y-1">
                <thead>
                  <tr className="bg-yellow-100 text-yellow-800 rounded-lg">
                    <th className="py-2 rounded-l-lg">Câu số</th>
                    <th className="py-2">Kết quả</th>
                    <th className="py-2 rounded-r-lg">Điểm</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(answerResults).map(
                    ([number, result], idx) => (
                      <tr
                        key={number}
                        className={
                          idx % 2 === 0 ? "bg-[#FFF6E3]" : "bg-[#FEE9C3]"
                        }
                      >
                        <td className="py-2 font-bold rounded-l-lg">
                          {number}
                        </td>
                        <td className="py-2">
                          {result?.is_correct ? (
                            <span className="text-green-600 font-semibold">
                              Đúng
                            </span>
                          ) : (
                            <span className="text-red-600 font-semibold">
                              Sai
                            </span>
                          )}
                        </td>
                        <td className="py-2 rounded-r-lg">
                          {result?.score ?? 0}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* Bảng quizResults nếu có */}
          {hasQuizResults && (
            <div className="flex-1 flex flex-col items-center max-w-xl bg-white rounded-2xl shadow-lg p-6 mb-6 h-full min-h-[370px] max-h-[80vh] mt-6">
              <div className="font-bold text-center mb-6 mt-2 text-[#5D4037] text-2xl leading-tight break-words">
                Kết quả lần đầu (xếp hạng)
              </div>
              <div className="mb-4 text-xl font-bold text-[#D4A017] drop-shadow-sm text-center">
                Tổng điểm:{" "}
                <span className="text-2xl text-[#D12827]">
                  {totalQuizResultScore}
                </span>
              </div>
              {leaderBoardLoading ? (
                <div className="w-full flex justify-center items-center py-8">
                  <span className="text-yellow-600 text-lg font-semibold">
                    Đang tải bảng xếp hạng...
                  </span>
                </div>
              ) : (
                <>
                  {leaderboard && (
                    <div className="mb-2 text-lg text-[#5D4037] text-center">
                      Xếp hạng:{" "}
                      <span className="font-bold text-[#D12827]">
                        {leaderboard.ranking}
                      </span>
                    </div>
                  )}
                  <div className="w-full flex-1 overflow-y-auto max-h-[35vh]">
                    <table className="w-full text-center border-separate border-spacing-y-1">
                      <thead>
                        <tr className="bg-yellow-100 text-yellow-800 rounded-lg">
                          <th className="py-2 rounded-l-lg">Câu số</th>
                          <th className="py-2">Kết quả</th>
                          <th className="py-2">Điểm</th>
                          <th className="py-2 rounded-r-lg">Nộp lúc</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quizResultList.map((r, idx) => (
                          <tr
                            key={r.id}
                            className={
                              idx % 2 === 0 ? "bg-[#FFF6E3]" : "bg-[#FEE9C3]"
                            }
                          >
                            <td className="py-2 font-bold rounded-l-lg">
                              {r.number}
                            </td>
                            <td className="py-2">
                              {r.is_correct ? (
                                <span className="text-green-600 font-semibold">
                                  Đúng
                                </span>
                              ) : (
                                <span className="text-red-600 font-semibold">
                                  Sai
                                </span>
                              )}
                            </td>
                            <td className="py-2">{r.score}</td>
                            <td className="py-2 rounded-r-lg">
                              {r.submitted_at
                                ? new Date(r.submitted_at).toLocaleString()
                                : ""}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        {/* Nút căn giữa */}
        <div className="flex flex-row justify-center gap-4 mt-8 w-full">
          {onRestart && (
            <button
              className="bg-yellow-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow hover:bg-yellow-600 transition-all"
              onClick={onRestart}
            >
              Chơi lại từ đầu
            </button>
          )}
          {onClose && (
            <button
              className="bg-gray-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow hover:bg-gray-600 transition-all"
              onClick={onClose}
            >
              Đóng
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultSlide;
