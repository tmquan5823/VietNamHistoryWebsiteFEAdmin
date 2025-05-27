import React, { useRef, useEffect } from "react";
import QuizHeader from "@/components/common/QuizHeader";

interface StartSlideProps {
  onStart: () => void;
  onContinue?: () => void;
  onRestart?: () => void;
  canContinue?: boolean;
  isLoading?: boolean;
  fullscreen?: boolean;
  handleFullscreen?: () => void;
}

const StartSlide: React.FC<StartSlideProps> = ({
  onStart,
  onContinue,
  canContinue,
  isLoading = false,
  fullscreen = false,
  handleFullscreen = () => {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLarge = fullscreen;

  useEffect(() => {
    if (fullscreen && containerRef.current && !document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
    } else if (!fullscreen && document.fullscreenElement) {
      document.exitFullscreen?.();
    }
  }, [fullscreen]);

  if (isLoading) {
    return (
      <div
        ref={containerRef}
        className={`relative bg-[#FEE9C3] flex flex-col items-center justify-center ${
          fullscreen ? "w-screen h-screen" : "w-[90vw] h-[90vh]"
        }`}
      >
        <QuizHeader
          fullscreen={fullscreen}
          handleFullscreen={handleFullscreen}
        />
        <div className="flex-1 w-full flex flex-col items-center justify-center px-4 pb-8">
          <div className="flex flex-col items-center justify-center w-full mx-auto">
            <div
              className={`font-bold text-center mb-6 mt-2 drop-shadow-lg text-[#5D4037] ${
                isLarge ? "text-4xl" : "text-2xl"
              } leading-tight break-words animate-pulse`}
              style={{ wordBreak: "break-word", maxWidth: "60%" }}
            >
              Đang tải câu hỏi...
            </div>
            <div className="flex items-center justify-center mt-8">
              <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative bg-[#FEE9C3] flex flex-col items-center justify-center ${
        fullscreen ? "w-screen h-screen" : "w-[90vw] h-[90vh]"
      }`}
    >
      <QuizHeader fullscreen={fullscreen} handleFullscreen={handleFullscreen} />
      <div className="flex-1 w-full flex flex-col items-center justify-center px-4 pb-8">
        <div className="flex flex-col items-center justify-center w-full mx-auto">
          <div
            className={`font-bold text-center mb-6 mt-2 drop-shadow-lg text-[#5D4037] ${
              isLarge ? "text-4xl" : "text-2xl"
            } leading-tight break-words`}
            style={{ wordBreak: "break-word", maxWidth: "60%" }}
          >
            Bạn đã sẵn sàng chơi chưa?
          </div>
          <div className="text-center text-sm text-red-600 font-semibold mb-4">
            Lưu ý: Kết quả cho mỗi câu hỏi để xếp hạng chỉ tính cho lần đầu trả
            lời.
          </div>
          <div className="flex flex-row gap-4 mt-8">
            {canContinue && onContinue && (
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-[#5D4037] px-6 py-3 rounded-full font-bold text-lg shadow transition-all"
                onClick={onContinue}
              >
                Chơi tiếp
              </button>
            )}
            <button
              className="bg-orange-400 hover:bg-orange-500 text-[#5D4037] px-6 py-3 rounded-full font-bold text-lg shadow transition-all"
              onClick={onStart}
            >
              {canContinue ? "Chơi lại từ đầu" : "Bắt đầu chơi"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartSlide;
