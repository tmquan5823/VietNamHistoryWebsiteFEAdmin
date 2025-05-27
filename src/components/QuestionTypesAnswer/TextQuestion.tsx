import React, { useState, useRef, useEffect } from "react";
import {
  QuizQuestionParams,
  QuizQuestionPlay,
} from "@/dataHelper/quizQuestion.datahelper";
import { AnswerCheck, AnswerChecked } from "@/utils/type";
import Timer from "@/components/ui/timer";
import QuizHeader from "@/components/common/QuizHeader";

interface TextQuestionProps {
  question: QuizQuestionParams | QuizQuestionPlay;
  showAnswer?: boolean;
  checkAnswer?: (ansCheck: AnswerCheck) => void;
  answerChecked?: AnswerChecked;
  onResetAnswer?: () => void;
  onClose?: () => void;
  slides?: QuizQuestionParams[] | QuizQuestionPlay[];
  onNextSlide?: () => void;
  nextDisabled?: boolean;
  fullscreen?: boolean;
  handleFullscreen?: () => void;
}

const TextQuestion: React.FC<TextQuestionProps> = ({
  question,
  showAnswer = false,
  checkAnswer,
  answerChecked,
  onResetAnswer,
  onClose,
  slides,
  onNextSlide,
  nextDisabled,
  fullscreen = false,
  handleFullscreen = () => {},
}) => {
  const [input, setInput] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const isLarge = fullscreen;
  const [score, setScore] = useState(() => Number(question.max_score) || 1000);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [visibleChars, setVisibleChars] = useState(0);
  const [questionDone, setQuestionDone] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);
  const [warning, setWarning] = useState<string>("");
  const [showWrongAnswers, setShowWrongAnswers] = useState(true);

  // Parse correct answers from answerChecked (now string[])
  const correctAnswers: string[] = answerChecked?.correct_answer ?? [];

  // nextDisabled logic: nếu chưa có answerChecked hoặc chưa có correct_answer thì nextDisabled = true
  const isNextDisabled =
    nextDisabled ||
    !answerChecked ||
    !answerChecked.correct_answer ||
    answerChecked.correct_answer.length === 0;

  useEffect(() => {
    setInput("");
    setShowInput(false);
    setShowTimer(false);
    setVisibleChars(0);
    setQuestionDone(false);
    setWrongAnswers([]);
    if (onResetAnswer) {
      onResetAnswer();
    }
  }, [question.number]);

  // Hiệu ứng hiện từng chữ cho câu hỏi trong vòng 2 giây
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

  // Hiện ô nhập và timer khi questionDone
  useEffect(() => {
    if (questionDone) {
      setTimeout(() => setShowInput(true), 200);
      setTimeout(() => setShowTimer(true), 200);
    }
  }, [questionDone]);

  console.log(answerChecked);
  // 1. Chỉ clear timer khi trả lời đúng
  useEffect(() => {
    if (answerChecked && answerChecked.is_correct === true) {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [answerChecked]);

  // 2. Timer chỉ chạy khi showTimer true, không phụ thuộc answerChecked
  useEffect(() => {
    if (showTimer && !showAnswer) {
      const maxScore = Number(question.max_score) || 1000;
      const timeLimit = Number(question.time_limit_seconds) || 30;
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
          if (!input && checkAnswer) {
            checkAnswer({
              number: question.number,
              answer: [],
              score: 0,
              is_end_time: true,
              is_multi_answer: true,
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
  }, [showTimer, showAnswer, question.max_score, question.time_limit_seconds]);

  // Handle answerChecked update for wrong/correct answer
  useEffect(() => {
    if (
      answerChecked &&
      answerChecked.correct_answer &&
      answerChecked.correct_answer.length === 0 &&
      userAnswer
    ) {
      setWrongAnswers((prev) => [...prev, userAnswer]);
      setWarning("Incorrect");
      setInput("");
    } else if (
      answerChecked &&
      answerChecked.correct_answer &&
      answerChecked.correct_answer.length > 0
    ) {
      setWarning("");
    }
    // eslint-disable-next-line
  }, [answerChecked]);

  useEffect(() => {
    setScore(Number(question.max_score) || 1000);
    setProgress(100);
  }, [question.number, question.max_score]);

  // Effect để đồng bộ DOM fullscreen với prop
  useEffect(() => {
    if (fullscreen && containerRef.current && !document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
    } else if (!fullscreen && document.fullscreenElement) {
      document.exitFullscreen?.();
    }
  }, [fullscreen]);

  const handleSubmit = () => {
    if (checkAnswer && input.trim()) {
      setUserAnswer(input.trim());
      checkAnswer({
        number: question.number,
        answer: [input.trim()],
        score: score,
        is_multi_answer: true,
      });
    }
  };

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
        totalSlides={slides ? slides.length : undefined}
        onNextSlide={onNextSlide}
        nextDisabled={isNextDisabled}
      />
      {/* Nội dung chia 2 cột: trái (câu hỏi + input), phải (funfact hoặc ảnh) */}
      {answerChecked?.funfact ? (
        <div className="flex-1 w-full flex flex-row px-40 pb-8 gap-8 justify-center items-center">
          {/* Cột trái: câu hỏi + input */}
          <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto">
            <div
              className={`font-bold text-center mb-6 mt-2 drop-shadow-lg text-[#5D4037] ${
                isLarge ? "text-4xl" : "text-2xl"
              } leading-tight break-words`}
              style={{ wordBreak: "break-word" }}
            >
              {question.question.slice(0, visibleChars)}
            </div>
            <div className="flex flex-col gap-4 w-full max-w-md mx-auto items-center">
              {showInput && (
                <>
                  <div className="relative w-full">
                    <input
                      type="text"
                      className={`w-full rounded-xl px-4 py-3 text-lg pr-14 focus:outline-none transition-all duration-150
                        ${
                          answerChecked?.is_correct
                            ? "bg-green-100 border-2 border-green-500 shadow-green-200 shadow"
                            : ""
                        }
                        ${
                          warning && !input
                            ? "bg-red-100 border-2 border-red-500 shadow-red-200 shadow"
                            : ""
                        }
                        ${
                          !answerChecked?.is_correct && !(warning && !input)
                            ? "border border-gray-300 focus:ring-2 focus:ring-blue-400"
                            : ""
                        }
                      `}
                      placeholder="Nhập đáp án của bạn..."
                      value={
                        correctAnswers.length > 0 ? correctAnswers[0] : input
                      }
                      onChange={(e) => setInput(e.target.value)}
                      disabled={correctAnswers.length > 0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && correctAnswers.length === 0)
                          handleSubmit();
                      }}
                      style={{ minWidth: isLarge ? 400 : 280 }}
                    />
                    {/* Nút submit answer */}
                    {showInput && (
                      <button
                        className="w-full mt-4 bg-[#25626a] text-white font-bold rounded-full py-3 text-lg shadow disabled:bg-gray-400 disabled:text-gray-200 disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={
                          input.trim() === "" || correctAnswers.length > 0
                        }
                        onClick={handleSubmit}
                      >
                        Submit answer
                      </button>
                    )}
                    {/* Thông báo đúng/sai dưới input */}
                    {answerChecked?.is_correct && (
                      <div className="mt-2 text-green-600 font-bold flex items-center justify-center gap-2">
                        <span>Chính xác!</span>
                      </div>
                    )}
                    {warning && !input && (
                      <div className="text-red-600 font-bold text-lg mt-2 flex items-center justify-center">
                        {warning === "Incorrect" ? "Sai rồi!" : warning}
                      </div>
                    )}
                    {/* Thanh Timer */}
                    <Timer progress={progress} score={score} className="mt-6" />
                    {/* Lịch sử đáp án sai */}
                    {wrongAnswers.length > 0 && (
                      <div className="mt-2 text-sm">
                        <span
                          className="underline cursor-pointer text-blue-700 font-semibold hover:text-blue-900"
                          onClick={() => setShowWrongAnswers((prev) => !prev)}
                        >
                          {showWrongAnswers
                            ? "Ẩn đáp án sai"
                            : "Hiện đáp án sai"}
                        </span>
                        {showWrongAnswers && (
                          <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 break-words">
                            {wrongAnswers.map((ans, idx) => (
                              <span
                                key={idx}
                                className="text-pink-600 font-semibold break-words"
                              >
                                {ans}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Cột phải: funfact */}
          <div className="h-[70%] flex-1 flex flex-col items-center justify-center max-w-lg w-full mx-auto">
            <div className="flex flex-1 items-center justify-center w-full h-full">
              <div className="h-[100%] w-full bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-8 max-w-lg text-gray-800 flex items-center justify-center shadow-md mx-auto">
                <span className="text-2xl mr-2">💡</span>
                <span className="font-semibold text-base text-center">
                  {answerChecked.funfact}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : question.image_url ? (
        <div className="flex-1 w-full flex flex-row px-40 pb-8 gap-8 justify-center items-center">
          {/* Cột trái: câu hỏi + input */}
          <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto">
            <div
              className={`font-bold text-center mb-6 mt-2 drop-shadow-lg text-[#5D4037] ${
                isLarge ? "text-4xl" : "text-2xl"
              } leading-tight break-words`}
              style={{ wordBreak: "break-word" }}
            >
              {question.question.slice(0, visibleChars)}
            </div>
            <div className="flex flex-col gap-4 w-full max-w-md mx-auto items-center">
              {showInput && (
                <>
                  <div className="relative w-full">
                    <input
                      type="text"
                      className={`w-full rounded-xl px-4 py-3 text-lg pr-14 focus:outline-none transition-all duration-150
                        ${
                          answerChecked?.is_correct
                            ? "bg-green-100 border-2 border-green-500 shadow-green-200 shadow"
                            : ""
                        }
                        ${
                          warning && !input
                            ? "bg-red-100 border-2 border-red-500 shadow-red-200 shadow"
                            : ""
                        }
                        ${
                          !answerChecked?.is_correct && !(warning && !input)
                            ? "border border-gray-300 focus:ring-2 focus:ring-blue-400"
                            : ""
                        }
                      `}
                      placeholder="Nhập đáp án của bạn..."
                      value={
                        correctAnswers.length > 0 ? correctAnswers[0] : input
                      }
                      onChange={(e) => setInput(e.target.value)}
                      disabled={correctAnswers.length > 0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && correctAnswers.length === 0)
                          handleSubmit();
                      }}
                      style={{ minWidth: isLarge ? 400 : 280 }}
                    />
                    {/* Nút submit answer */}
                    {showInput && (
                      <button
                        className="w-full mt-4 bg-[#25626a] text-white font-bold rounded-full py-3 text-lg shadow disabled:bg-gray-400 disabled:text-gray-200 disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={
                          input.trim() === "" || correctAnswers.length > 0
                        }
                        onClick={handleSubmit}
                      >
                        Submit answer
                      </button>
                    )}
                    {/* Thông báo đúng/sai dưới input */}
                    {answerChecked?.is_correct && (
                      <div className="mt-2 text-green-600 font-bold flex items-center justify-center gap-2">
                        <span>Chính xác!</span>
                      </div>
                    )}
                    {warning && !input && (
                      <div className="text-red-600 font-bold text-lg mt-2 flex items-center justify-center">
                        {warning === "Incorrect" ? "Sai rồi!" : warning}
                      </div>
                    )}
                    {/* Thanh Timer */}
                    <Timer progress={progress} score={score} className="mt-6" />
                    {/* Lịch sử đáp án sai */}
                    {wrongAnswers.length > 0 && (
                      <div className="mt-2 text-sm">
                        <span
                          className="underline cursor-pointer text-blue-700 font-semibold hover:text-blue-900"
                          onClick={() => setShowWrongAnswers((prev) => !prev)}
                        >
                          {showWrongAnswers
                            ? "Ẩn đáp án sai"
                            : "Hiện đáp án sai"}
                        </span>
                        {showWrongAnswers && (
                          <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 break-words">
                            {wrongAnswers.map((ans, idx) => (
                              <span
                                key={idx}
                                className="text-pink-600 font-semibold break-words"
                              >
                                {ans}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Cột phải: ảnh */}
          <div className="h-[70%] flex-1 flex flex-col items-center justify-center max-w-lg w-full mx-auto">
            <div className="flex flex-1 items-center justify-center w-full h-full">
              <div className="h-[100%] w-full bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-8 max-w-lg text-gray-800 flex items-center justify-center shadow-md mx-auto">
                <img
                  src={question.image_url}
                  alt="question"
                  className="max-h-80 max-w-full object-contain rounded mx-auto"
                  style={{ display: "block" }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 w-full flex flex-col items-center justify-center px-4 pb-8">
          <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
            <div
              className={`font-bold text-center mb-6 mt-2 drop-shadow-lg text-[#5D4037] ${
                isLarge ? "text-4xl" : "text-2xl"
              } leading-tight break-words`}
              style={{ wordBreak: "break-word" }}
            >
              {question.question.slice(0, visibleChars)}
            </div>
            <div className="flex flex-col gap-4 w-full max-w-md mx-auto items-center">
              {showInput && (
                <>
                  <div className="relative w-full">
                    <input
                      type="text"
                      className={`w-full rounded-xl px-4 py-3 text-lg pr-14 focus:outline-none transition-all duration-150
                        ${
                          answerChecked?.is_correct
                            ? "bg-green-100 border-2 border-green-500 shadow-green-200 shadow"
                            : ""
                        }
                        ${
                          warning && !input
                            ? "bg-red-100 border-2 border-red-500 shadow-red-200 shadow"
                            : ""
                        }
                        ${
                          !answerChecked?.is_correct && !(warning && !input)
                            ? "border border-gray-300 focus:ring-2 focus:ring-blue-400"
                            : ""
                        }
                      `}
                      placeholder="Nhập đáp án của bạn..."
                      value={
                        correctAnswers.length > 0 ? correctAnswers[0] : input
                      }
                      onChange={(e) => setInput(e.target.value)}
                      disabled={correctAnswers.length > 0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && correctAnswers.length === 0)
                          handleSubmit();
                      }}
                      style={{ minWidth: isLarge ? 400 : 280 }}
                    />
                    {/* Nút submit answer */}
                    {showInput && (
                      <button
                        className="w-full mt-4 bg-[#25626a] text-white font-bold rounded-full py-3 text-lg shadow disabled:bg-gray-400 disabled:text-gray-200 disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={
                          input.trim() === "" || correctAnswers.length > 0
                        }
                        onClick={handleSubmit}
                      >
                        Submit answer
                      </button>
                    )}
                    {/* Thông báo đúng/sai dưới input */}
                    {answerChecked?.is_correct && (
                      <div className="mt-2 text-green-600 font-bold flex items-center justify-center gap-2">
                        <span>Chính xác!</span>
                      </div>
                    )}
                    {warning && !input && (
                      <div className="text-red-600 font-bold text-lg mt-2 flex items-center justify-center">
                        {warning === "Incorrect" ? "Sai rồi!" : warning}
                      </div>
                    )}
                    {/* Thanh Timer */}
                    <Timer progress={progress} score={score} className="mt-6" />
                    {/* Lịch sử đáp án sai */}
                    {wrongAnswers.length > 0 && (
                      <div className="mt-2 text-sm">
                        <span
                          className="underline cursor-pointer text-blue-700 font-semibold hover:text-blue-900"
                          onClick={() => setShowWrongAnswers((prev) => !prev)}
                        >
                          {showWrongAnswers
                            ? "Ẩn đáp án sai"
                            : "Hiện đáp án sai"}
                        </span>
                        {showWrongAnswers && (
                          <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 break-words">
                            {wrongAnswers.map((ans, idx) => (
                              <span
                                key={idx}
                                className="text-pink-600 font-semibold break-words"
                              >
                                {ans}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
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

export default TextQuestion;
