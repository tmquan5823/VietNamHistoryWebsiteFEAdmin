import React, { useRef, useState, useEffect } from "react";
import {
  QuizQuestionParams,
  QuizQuestionPlay,
} from "@/dataHelper/quizQuestion.datahelper";
import Timer from "@/components/ui/timer";
import QuizHeader from "@/components/common/QuizHeader";

interface InfoSlideProps {
  question: QuizQuestionParams | QuizQuestionPlay;
  onClose?: () => void;
  slides: QuizQuestionParams[] | QuizQuestionPlay[];
  onNextSlide?: () => void;
  nextDisabled?: boolean;
  fullscreen?: boolean;
  handleFullscreen?: () => void;
}

const InfoSlide: React.FC<InfoSlideProps> = ({
  question,
  onClose,
  slides,
  onNextSlide,
  nextDisabled,
  fullscreen = false,
  handleFullscreen = () => {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLarge = fullscreen;
  const [visibleChars, setVisibleChars] = useState(0);
  const [progress, setProgress] = useState(100);
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    setVisibleChars(0);
    setShowTimer(false);
    if (question.info) {
      let i = 0;
      const totalDuration = 4000; // 4 giây
      const len = question.info.length;
      const charDelay = len > 0 ? totalDuration / len : 0;
      const interval = setInterval(() => {
        i++;
        setVisibleChars(i);
        if (i >= len) {
          clearInterval(interval);
          setTimeout(() => setShowTimer(true), 300); // Hiện timer sau khi info hiện xong, delay nhẹ cho mượt
        }
      }, charDelay);
      return () => clearInterval(interval);
    }
  }, [question.info]);

  useEffect(() => {
    if (!showTimer) {
      setProgress(100);
      return;
    }
    setProgress(100);
    const timeLimit = Number(question.time_limit_seconds) || 30;
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const percent = Math.max(0, 100 - (elapsed / timeLimit) * 100);
      setProgress(percent);
      if (elapsed >= timeLimit) {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [question.number, question.time_limit_seconds, showTimer]);

  useEffect(() => {
    if (fullscreen && containerRef.current && !document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
    } else if (!fullscreen && document.fullscreenElement) {
      document.exitFullscreen?.();
    }
  }, [fullscreen]);

  return (
    <div
      ref={containerRef}
      className={`relative bg-[#FEE9C3] flex flex-col ${
        fullscreen ? "w-screen h-screen" : "w-[90vw] h-[90vh]"
      }`}
    >
      <QuizHeader
        fullscreen={fullscreen}
        handleFullscreen={handleFullscreen}
        currentSlide={question.number}
        totalSlides={slides.length}
        onNextSlide={onNextSlide}
        nextDisabled={nextDisabled}
      />
      {/* Nội dung chia 2 cột: trái (info), phải (ảnh nếu có) */}
      {question.image_url ? (
        <div className="flex-1 w-full flex flex-row px-32 pb-8 gap-8 justify-center items-center">
          {/* Cột trái: info */}
          <div className="flex-1 flex flex-col items-center justify-center mx-auto">
            <div
              className={`font-bold text-center mb-6 mt-2 drop-shadow-lg text-[#5D4037] ${
                isLarge ? "text-4xl" : "text-2xl"
              } leading-tight break-words`}
              style={{ wordBreak: "break-word", maxWidth: "100%" }}
            >
              {question.info ? question.info.slice(0, visibleChars) : ""}
            </div>
            {/* Thanh timer không hiển thị điểm */}
            {showTimer && question.info && (
              <Timer progress={progress} score={0} className="mt-6" hideScore />
            )}
          </div>
          {/* Cột phải: ảnh */}
          <div className="h-[70%] flex-1 flex flex-col items-center justify-center max-w-lg w-full mx-auto">
            <div className="flex flex-1 items-center justify-center w-full h-full">
              <div className="h-[100%] w-full bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-8 max-w-lg text-gray-800 flex items-center justify-center shadow-md mx-auto">
                <img
                  src={question.image_url}
                  alt="Thông tin minh họa"
                  className="max-h-80 max-w-full object-contain rounded mx-auto"
                  style={{ display: "block" }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 w-full flex flex-col items-center justify-center px-4 pb-8">
          <div className="flex flex-col items-center justify-center w-full mx-auto">
            <div
              className={`font-bold text-center mb-6 mt-2 drop-shadow-lg text-[#5D4037] ${
                isLarge ? "text-4xl" : "text-2xl"
              } leading-tight break-words`}
              style={{ wordBreak: "break-word", maxWidth: "60%" }}
            >
              {question.info ? question.info.slice(0, visibleChars) : ""}
            </div>
            {/* Thanh timer không hiển thị điểm */}
            {showTimer && question.info && (
              <Timer progress={progress} score={0} className="mt-6" hideScore />
            )}
          </div>
        </div>
      )}
      {/* Nút đóng xem trước ở góc dưới bên phải */}
      {onClose && (
        <button
          className="absolute right-8 bottom-8 bg-[#fdf6e3] text-black font-bold rounded-full px-6 py-3 shadow-lg text-lg hover:bg-yellow-100 transition-all z-50"
          onClick={onClose}
        >
          Đóng xem trước
        </button>
      )}
    </div>
  );
};

export default InfoSlide;
