import React, { useState, useCallback } from "react";
import {
  QuizQuestionPlay,
} from "@/dataHelper/quizQuestion.datahelper";
import SingleChoiceQuestion from "@/components/QuestionTypesAnswer/SingleChoiceQuestion";
import MultiChoiceQuestion from "../QuestionTypesAnswer/MultiChoiceQuestion";
import TextQuestion from "../QuestionTypesAnswer/TextQuestion";
import { AnswerCheck, AnswerChecked } from "@/utils/type";
import InfoSlide from "../QuestionTypesAnswer/InfoSlide";
import StartSlide from "@/components/QuestionTypesAnswer/StartSlide";
import ResultSlide from "@/components/QuestionTypesAnswer/ResultSlide";
import { QuizResults } from "@/dataHelper/quizSet.dataHelper";

interface QuizQuestionProps {
  question: QuizQuestionPlay | undefined;
  showAnswer?: boolean;
  onClose?: () => void;
  checkAnswer?: (ansCheck: AnswerCheck) => void;
  answerChecked?: AnswerChecked;
  onResetAnswer?: () => void;
  slides: QuizQuestionPlay[];
  onNextSlide?: () => void;
  startSlide?: boolean;
  onContinue?: () => void;
  onRestart?: () => void;
  canContinue?: boolean;
  answerResults?: {
    [questionNumber: number]: AnswerChecked;
  };
  quizResults?: QuizResults;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  showAnswer = false,
  onClose,
  answerChecked,
  onResetAnswer,
  checkAnswer,
  slides,
  onNextSlide,
  startSlide = false,
  onContinue,
  onRestart,
  canContinue,
  answerResults,
  quizResults,
}) => {
  // State fullscreen quản lý ở đây
  const [fullscreen, setFullscreen] = useState(false);
  // Hàm handleFullscreen quản lý ở đây
  const handleFullscreen = useCallback(() => {
    if (!fullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if ((document.documentElement as any).webkitRequestFullscreen) {
        (document.documentElement as any).webkitRequestFullscreen();
      }
      setFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
      setFullscreen(false);
    }
  }, [fullscreen]);
  // Lắng nghe sự kiện thay đổi fullscreen để đồng bộ state
  React.useEffect(() => {
    const onFullChange = () => {
      const isFull = !!(
        document.fullscreenElement || (document as any).webkitFullscreenElement
      );
      setFullscreen(isFull);
    };
    document.addEventListener("fullscreenchange", onFullChange);
    document.addEventListener("webkitfullscreenchange", onFullChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullChange);
      document.removeEventListener("webkitfullscreenchange", onFullChange);
    };
  }, []);
  // Nếu đã hết câu hỏi, hiển thị ResultSlide
  if (!question && answerResults) {
    return (
      <ResultSlide
        answerResults={answerResults}
        onRestart={onRestart}
        onClose={onClose}
        fullscreen={fullscreen}
        handleFullscreen={handleFullscreen}
        quizResults={quizResults}
      />
    );
  }
  if (startSlide) {
    return (
      <StartSlide
        onStart={onNextSlide || (() => {})}
        onContinue={onContinue}
        onRestart={onRestart}
        canContinue={canContinue}
        fullscreen={fullscreen}
        handleFullscreen={handleFullscreen}
      />
    );
  }
  // Render theo loại câu hỏi
  if (question && question.question_type === "single_choice") {
    return (
      <SingleChoiceQuestion
        question={question}
        slides={slides}
        showAnswer={showAnswer}
        answerChecked={answerChecked}
        checkAnswer={checkAnswer}
        onResetAnswer={onResetAnswer}
        onClose={onClose}
        onNextSlide={onNextSlide}
        fullscreen={fullscreen}
        handleFullscreen={handleFullscreen}
      />
    );
  }
  if (question && question.question_type === "multi_choice") {
    return (
      <MultiChoiceQuestion
        question={question}
        slides={slides}
        showAnswer={showAnswer}
        checkAnswer={checkAnswer}
        answerChecked={answerChecked}
        onResetAnswer={onResetAnswer}
        onClose={onClose}
        onNextSlide={onNextSlide}
        fullscreen={fullscreen}
        handleFullscreen={handleFullscreen}
      />
    );
  }
  if (question && question.question_type === "text") {
    return (
      <TextQuestion
        question={question}
        slides={slides}
        showAnswer={showAnswer}
        checkAnswer={checkAnswer}
        answerChecked={answerChecked}
        onResetAnswer={onResetAnswer}
        onClose={onClose}
        onNextSlide={onNextSlide}
        fullscreen={fullscreen}
        handleFullscreen={handleFullscreen}
      />
    );
  }
  if (question && question.question_type === "info") {
    return (
      <InfoSlide
        onNextSlide={onNextSlide}
        nextDisabled={false}
        slides={slides}
        question={question}
        onClose={onClose}
        fullscreen={fullscreen}
        handleFullscreen={handleFullscreen}
      />
    );
  }
  // TODO: Thêm các loại câu hỏi khác ở đây

  // Mặc định: render như cũ (hoặc có thể trả về null)
  return (
    <div className="w-full flex items-center justify-center text-white">
      <div>Chưa hỗ trợ loại câu hỏi này: {question?.question_type}</div>
    </div>
  );
};

export default QuizQuestion;
