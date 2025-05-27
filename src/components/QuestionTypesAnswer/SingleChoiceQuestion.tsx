import React, { useState, useRef, useEffect } from "react";
import {
  QuizQuestionParams,
  QuizQuestionPlay,
} from "@/dataHelper/quizQuestion.datahelper";
import { AnswerCheck, AnswerChecked } from "@/utils/type";
import Timer from "@/components/ui/timer";
import QuizHeader from "@/components/common/QuizHeader";

interface SingleChoiceQuestionProps {
  question: QuizQuestionParams | QuizQuestionPlay;
  slides: QuizQuestionParams[] | QuizQuestionPlay[];
  showAnswer?: boolean;
  checkAnswer?: (ansCheck: AnswerCheck) => void;
  answerChecked?: AnswerChecked;
  onResetAnswer?: () => void;
  onClose?: () => void;
  onNextSlide?: () => void;
  nextDisabled?: boolean;
  fullscreen: boolean;
  handleFullscreen: () => void;
}

// Màu option nổi bật hơn
const optionDefault =
  "bg-yellow-200 hover:bg-yellow-300 text-[#5D4037] font-bold";

const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({
  question,
  slides,
  showAnswer = false,
  checkAnswer,
  answerChecked,
  onResetAnswer,
  onClose,
  onNextSlide,
  nextDisabled,
  fullscreen,
  handleFullscreen,
}) => {
  let options: string[] = [];
  try {
    options = question.options ? JSON.parse(question.options) : [];
  } catch {
    options = [];
  }
  let correctIdx = -1;
  if (
    Array.isArray(answerChecked?.correct_answer) &&
    answerChecked.correct_answer.length === 1
  ) {
    correctIdx = options.findIndex(
      (opt) => opt === answerChecked.correct_answer[0]
    );
  } else if (!isNaN(Number(answerChecked?.correct_answer))) {
    correctIdx = Number(answerChecked?.correct_answer);
  }
  const [selected, setSelected] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isLarge = fullscreen;
  // Score bar state
  const [score, setScore] = useState(() => Number(question.max_score) || 1000);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [showedOptions, setShowedOptions] = useState(0); // số đáp án đã hiện
  const [showTimer, setShowTimer] = useState(false);
  const [visibleChars, setVisibleChars] = useState(0);
  const [questionDone, setQuestionDone] = useState(false);

  useEffect(() => {
    setSelected(null);
    setShowedOptions(0);
    setShowTimer(false);
    setVisibleChars(0);
    setQuestionDone(false);
    if (onResetAnswer) {
      onResetAnswer();
    }
  }, [question.number]);

  useEffect(() => {
    if (question.question) {
      let i = 0;
      const totalDuration = 2000; // 2 giây
      const len = question.question.length;
      const charDelay = len > 0 ? totalDuration / len : 0;
      const interval = setInterval(() => {
        i++;
        setVisibleChars(i);
        if (i >= len) {
          clearInterval(interval);
          setQuestionDone(true);
        }
      }, charDelay);
      return () => clearInterval(interval);
    }
  }, [question.number, question.question]);

  useEffect(() => {
    if (options.length > 0 && questionDone) {
      let i = 0;
      const reveal = () => {
        setShowedOptions(i + 1);
        i++;
        if (i < options.length) {
          setTimeout(reveal, 200);
        } else {
          setTimeout(() => setShowTimer(true), 100);
        }
      };
      setTimeout(reveal, 100);
    }
  }, [questionDone]);

  useEffect(() => {
    if (!showAnswer && showTimer) {
      const maxScore = Number(question.max_score) || 1000;
      const timeLimit = Number(question.time_limit_seconds) || 30;
      setScore(maxScore);
      setProgress(100);
      if (timerRef.current) clearInterval(timerRef.current);
      const start = Date.now();
      timerRef.current = setInterval(() => {
        const elapsed = (Date.now() - start) / 1000;
        const percent = Math.max(0, 100 - (elapsed / timeLimit) * 100);
        setProgress(percent);
        setScore(Math.max(0, Math.round(maxScore * (percent / 100))));
        if (elapsed >= timeLimit) {
          setProgress(0);
          setScore(0);
          if (timerRef.current) clearInterval(timerRef.current);
          // Nếu chưa chọn đáp án thì tự động checkAnswer với []
          if (selected === null && checkAnswer) {
            checkAnswer({
              number: question.number,
              answer: [],
              score: 0,
              is_end_time: true,
            });
          }
        }
      }, 50);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [question.max_score, question.time_limit_seconds, showAnswer, showTimer]);

  useEffect(() => {
    if (fullscreen && containerRef.current && !document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
    } else if (!fullscreen && document.fullscreenElement) {
      document.exitFullscreen?.();
    }
  }, [fullscreen]);

  // Parse correct answers from answerChecked (now string[])
  const correctAnswers: string[] = answerChecked?.correct_answer ?? [];

  // nextDisabled logic: nếu chưa có answerChecked hoặc chưa có correct_answer thì nextDisabled = true
  const isNextDisabled =
    nextDisabled || !answerChecked || !answerChecked.correct_answer;

  const handleSelect = (idx: number) => {
    if (selected !== null) return; // Đã chọn rồi thì không cho chọn lại
    setSelected(idx);
    if (timerRef.current) clearInterval(timerRef.current);
    if (checkAnswer) {
      checkAnswer({
        number: question.number,
        answer: [options[idx]],
        score: score,
        is_multi_answer: false,
      });
    }
  };

  const hasFunfact = answerChecked && answerChecked.funfact;

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
        onNextSlide={answerChecked ? onNextSlide : undefined}
        nextDisabled={isNextDisabled}
      />
      {/* Nội dung chia 2 cột: trái (câu hỏi + đáp án), phải (funfact) */}
      {hasFunfact ? (
        <div className="flex-1 w-full flex flex-row px-32 pb-8 gap-8 justify-center items-center">
          {/* Cột trái: câu hỏi + đáp án */}
          <div className="flex-1 flex flex-col items-center justify-center mx-auto">
            <div
              className={`font-bold text-center mb-6 mt-2 drop-shadow-lg text-[#5D4037] ${
                isLarge ? "text-4xl" : "text-2xl"
              } leading-tight break-words`}
              style={{ wordBreak: "break-word", maxWidth: "100%" }}
            >
              {question.question.slice(0, visibleChars)}
            </div>
            <div
              className={`flex flex-col gap-4 w-full max-w-md mx-auto items-center`}
            >
              {options.map((opt, idx) =>
                idx < showedOptions ? (
                  <button
                    key={idx}
                    className={`w-full font-semibold rounded-full transition-all duration-150 shadow relative flex items-center justify-between px-6 ${(() => {
                      // Trạng thái đáp án
                      if (answerChecked) {
                        if (correctAnswers.includes(opt)) {
                          return "bg-green-200 border-2 border-green-500 text-[#183135]";
                        } else if (selected === idx) {
                          return "bg-red-200 border-2 border-red-500 text-[#183135]";
                        } else {
                          return "bg-gray-200 border-2 border-transparent text-gray-400 opacity-60";
                        }
                      } else if (showAnswer && idx === correctIdx) {
                        return "bg-green-200 border-2 border-green-500 text-[#183135]";
                      } else if (selected === idx) {
                        return "bg-blue-200 border-2 border-blue-500 text-[#183135]";
                      } else {
                        return optionDefault + " border-2 border-transparent";
                      }
                    })()} focus:outline-none ${
                      isLarge ? "py-6 text-xl" : "py-3 text-lg"
                    }`}
                    style={{ minWidth: isLarge ? 400 : 280, paddingRight: 56 }}
                    disabled={
                      showAnswer || selected !== null || !!answerChecked
                    }
                    onClick={() => handleSelect(idx)}
                  >
                    <span className="flex-1 text-left font-bold">{opt}</span>
                    {/* Icon đúng/sai */}
                    {answerChecked &&
                      ((correctAnswers.includes(opt) &&
                        (selected === idx || answerChecked.is_correct)) ||
                        (!correctAnswers.includes(opt) &&
                          selected === idx)) && (
                        <span
                          className={`absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border flex items-center justify-center shadow-lg ${
                            correctAnswers.includes(opt)
                              ? "border-green-500"
                              : "border-red-500"
                          }`}
                        >
                          {correctAnswers.includes(opt) ? (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-green-500"
                            >
                              <polyline points="5 11 9 15 15 7" />
                            </svg>
                          ) : (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              className="text-red-500"
                            >
                              <line x1="7" y1="7" x2="13" y2="13" />
                              <line x1="13" y1="7" x2="7" y2="13" />
                            </svg>
                          )}
                        </span>
                      )}
                  </button>
                ) : null
              )}
              {/* Score bar dưới đáp án */}
              {showTimer && (
                <Timer progress={progress} score={score} className="mt-6" />
              )}
            </div>
          </div>
          {/* Cột phải: funfact */}
          <div className="h-[70%] flex-1 flex flex-col items-center justify-center max-w-lg w-full mx-auto">
            <div className="flex flex-1 items-center justify-center w-full h-full">
              <div className="h-[100%] w-full bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-8 max-w-lg text-gray-800 flex items-center justify-center shadow-md mx-auto">
                <span className="text-2xl mr-2">💡</span>
                <span className="font-semibold text-base text-center">
                  {answerChecked!.funfact}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : question.image_url ? (
        <div className="flex-1 w-full flex flex-row px-32 pb-8 gap-8 justify-center items-center">
          {/* Cột trái: câu hỏi + đáp án */}
          <div className="flex-1 flex flex-col items-center justify-center mx-auto">
            <div
              className={`font-bold text-center mb-6 mt-2 drop-shadow-lg text-[#5D4037] ${
                isLarge ? "text-4xl" : "text-2xl"
              } leading-tight break-words`}
              style={{ wordBreak: "break-word", maxWidth: "100%" }}
            >
              {question.question.slice(0, visibleChars)}
            </div>
            <div
              className={`flex flex-col gap-4 w-full max-w-md mx-auto items-center`}
            >
              {options.map((opt, idx) =>
                idx < showedOptions ? (
                  <button
                    key={idx}
                    className={`w-full font-semibold rounded-full transition-all duration-150 shadow relative flex items-center justify-between px-6 ${(() => {
                      // Trạng thái đáp án
                      if (answerChecked) {
                        if (correctAnswers.includes(opt)) {
                          return "bg-green-200 border-2 border-green-500 text-[#183135]";
                        } else if (selected === idx) {
                          return "bg-red-200 border-2 border-red-500 text-[#183135]";
                        } else {
                          return "bg-gray-200 border-2 border-transparent text-gray-400 opacity-60";
                        }
                      } else if (showAnswer && idx === correctIdx) {
                        return "bg-green-200 border-2 border-green-500 text-[#183135]";
                      } else if (selected === idx) {
                        return "bg-blue-200 border-2 border-blue-500 text-[#183135]";
                      } else {
                        return optionDefault + " border-2 border-transparent";
                      }
                    })()} focus:outline-none ${
                      isLarge ? "py-6 text-xl" : "py-3 text-lg"
                    }`}
                    style={{ minWidth: isLarge ? 400 : 280, paddingRight: 56 }}
                    disabled={
                      showAnswer || selected !== null || !!answerChecked
                    }
                    onClick={() => handleSelect(idx)}
                  >
                    <span className="flex-1 text-left font-bold">{opt}</span>
                    {/* Icon đúng/sai */}
                    {answerChecked &&
                      ((correctAnswers.includes(opt) &&
                        (selected === idx || answerChecked.is_correct)) ||
                        (!correctAnswers.includes(opt) &&
                          selected === idx)) && (
                        <span
                          className={`absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border flex items-center justify-center shadow-lg ${
                            correctAnswers.includes(opt)
                              ? "border-green-500"
                              : "border-red-500"
                          }`}
                        >
                          {correctAnswers.includes(opt) ? (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-green-500"
                            >
                              <polyline points="5 11 9 15 15 7" />
                            </svg>
                          ) : (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              className="text-red-500"
                            >
                              <line x1="7" y1="7" x2="13" y2="13" />
                              <line x1="13" y1="7" x2="7" y2="13" />
                            </svg>
                          )}
                        </span>
                      )}
                  </button>
                ) : null
              )}
              {/* Score bar dưới đáp án */}
              {showTimer && (
                <Timer progress={progress} score={score} className="mt-6" />
              )}
            </div>
          </div>
          {/* Cột phải: ảnh hoặc funfact */}
          <div className="h-[70%] flex-1 flex flex-col items-center justify-center max-w-lg w-full mx-auto">
            <div className="flex flex-1 items-center justify-center w-full h-full">
              <div className="h-[100%] w-full bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-4 max-w-lg text-gray-800 flex items-center justify-center shadow-md mx-auto">
                {hasFunfact ? (
                  <>
                    <span className="text-2xl mr-2">💡</span>
                    <span className="font-semibold text-base text-center">
                      {answerChecked!.funfact}
                    </span>
                  </>
                ) : (
                  <img
                    src={question.image_url}
                    alt="question"
                    className="h-full max-w-full object-contain rounded mx-auto"
                    style={{ display: "block" }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 w-full flex flex-col items-center justify-center px-4 pb-8">
          <div className="flex flex-col items-center justify-center w-full max-w-[60%] mx-auto">
            <div
              className={`font-bold text-center mb-6 mt-2 drop-shadow-lg text-[#5D4037] ${
                isLarge ? "text-4xl" : "text-2xl"
              } leading-tight break-words`}
              style={{ wordBreak: "break-word", maxWidth: "100%" }}
            >
              {question.question.slice(0, visibleChars)}
            </div>
            <div
              className={`flex flex-col gap-4 w-full max-w-md mx-auto items-center`}
            >
              {options.map((opt, idx) =>
                idx < showedOptions ? (
                  <button
                    key={idx}
                    className={`w-full font-semibold rounded-full transition-all duration-150 shadow relative flex items-center justify-between px-6 ${(() => {
                      // Trạng thái đáp án
                      if (answerChecked) {
                        if (correctAnswers.includes(opt)) {
                          return "bg-green-200 border-2 border-green-500 text-[#183135]";
                        } else if (selected === idx) {
                          return "bg-red-200 border-2 border-red-500 text-[#183135]";
                        } else {
                          return "bg-gray-200 border-2 border-transparent text-gray-400 opacity-60";
                        }
                      } else if (showAnswer && idx === correctIdx) {
                        return "bg-green-200 border-2 border-green-500 text-[#183135]";
                      } else if (selected === idx) {
                        return "bg-blue-200 border-2 border-blue-500 text-[#183135]";
                      } else {
                        return optionDefault + " border-2 border-transparent";
                      }
                    })()} focus:outline-none ${
                      isLarge ? "py-6 text-xl" : "py-3 text-lg"
                    }`}
                    style={{ minWidth: isLarge ? 400 : 280, paddingRight: 56 }}
                    disabled={
                      showAnswer || selected !== null || !!answerChecked
                    }
                    onClick={() => handleSelect(idx)}
                  >
                    <span className="flex-1 text-left font-bold">{opt}</span>
                    {/* Icon đúng/sai */}
                    {answerChecked &&
                      ((correctAnswers.includes(opt) &&
                        (selected === idx || answerChecked.is_correct)) ||
                        (!correctAnswers.includes(opt) &&
                          selected === idx)) && (
                        <span
                          className={`absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border flex items-center justify-center shadow-lg ${
                            correctAnswers.includes(opt)
                              ? "border-green-500"
                              : "border-red-500"
                          }`}
                        >
                          {correctAnswers.includes(opt) ? (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-green-500"
                            >
                              <polyline points="5 11 9 15 15 7" />
                            </svg>
                          ) : (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              className="text-red-500"
                            >
                              <line x1="7" y1="7" x2="13" y2="13" />
                              <line x1="13" y1="7" x2="7" y2="13" />
                            </svg>
                          )}
                        </span>
                      )}
                  </button>
                ) : null
              )}
              {/* Score bar dưới đáp án */}
              {showTimer && (
                <Timer progress={progress} score={score} className="mt-6" />
              )}
            </div>
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

export default SingleChoiceQuestion;
