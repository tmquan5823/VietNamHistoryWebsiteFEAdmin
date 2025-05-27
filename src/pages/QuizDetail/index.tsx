import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "@/components/ui/backButton";
import { PageContainer } from "@/components/common/PageContainer";
import { useQuizHook } from "@/hook/useQuizHook";
import QuizSetView from "@/components/common/QuizSetView";
import { useDispatch, useSelector } from "react-redux";
import { setQuiz, resetQuiz } from "@/store/quizPlaySlice";
import Modal from "@/components/Layout/modal";
import { RootState } from "@/store";
import QuizQuestionPlay from "@/components/common/QuizQuestionPlay";
import { AnswerChecked } from "@/utils/type";
import { QuizQuestionCheck } from "@/dataHelper/quizQuestion.datahelper";
import InputModal from "@/components/common/InputModal";
import { ROUTERS } from "@/constant";
import QuizLeaderboard from "@/components/common/QuizLeaderboard";

const QuizDetail: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: quizSet, isLoading: isLoading } =
    useQuizHook.getQuizSetByIdQuery(Number(id));
  const { refetch: refetchQuizSetForPlay } =
    useQuizHook.getQuizSetWithQuestionsForPlayQuery(Number(id));
  const quizPlay = useSelector((state: RootState) => state.quiz);
  const [showModal, setShowModal] = React.useState(false);
  const [currentSlideIdx, setCurrentSlideIdx] = React.useState(0);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [checkedAnswer, setCheckedAnswer] = React.useState<AnswerChecked>();
  const [answerResults, setAnswerResults] = React.useState<{
    [questionNumber: number]: AnswerChecked;
  }>({});
  const [inputModalOpen, setInputModalOpen] = React.useState(false);
  const [inputModalType, setInputModalType] = React.useState<
    "reject" | "cancelPublish" | null
  >(null);
  const [selectedQuizId, setSelectedQuizId] = React.useState<number | null>(
    id ? Number(id) : null
  );

  // Khởi tạo mutation cho submit quiz question
  const submitQuizQuestionMutation = useQuizHook.submitQuizQuestionQuery();

  // Mutation cho duyệt, từ chối, hủy publish
  const { mutate: approveMutation } = useQuizHook.approveQuizSetQuery();
  const { mutate: rejectMutation } = useQuizHook.rejectQuizSetQuery();
  const { mutate: inactivePublishMutation } =
    useQuizHook.inactivePublishQuizSetQuery();
  const { mutate: publishMutation } = useQuizHook.publishQuizSetQuery();

  // Hook lấy leaderboard
  const { data: leaderboardData } = useQuizHook.getQuizLeaderboardQuery(
    Number(id)
  );

  const navigate = useNavigate();

  const handlePlay = async () => {
    setCurrentSlideIdx(0);
    setCheckedAnswer(undefined);
    setAnswerResults({});
    setShowConfirm(false);

    dispatch(resetQuiz());

    setShowModal(true);
    const result = await refetchQuizSetForPlay();
    if (result.data) {
      dispatch(setQuiz(result.data.data));
      setShowConfirm(true);
    }
  };

  const handleNextSlide = () => {
    if (currentSlideIdx < quizPlay.questions.length - 1) {
      setCurrentSlideIdx((prev) => prev + 1);
      setCheckedAnswer(undefined);
    } else if (currentSlideIdx === quizPlay.questions.length - 1) {
      // Đã hết câu hỏi, chuyển sang slide kết quả
      setCurrentSlideIdx(quizPlay.questions.length);
      setCheckedAnswer(undefined);
    }
  };

  // Hàm submit đáp án cho câu hỏi hiện tại
  const handleSubmitQuizQuestion = async (userAnswer: QuizQuestionCheck) => {
    const question = quizPlay.questions[currentSlideIdx];
    const payload: QuizQuestionCheck = {
      number: question.number,
      answer: userAnswer.answer,
      score: userAnswer.score,
    };
    if (userAnswer.time_taken !== undefined)
      payload.time_taken = userAnswer.time_taken;
    if (userAnswer.is_multi_answer !== undefined)
      payload.is_multi_answer = userAnswer.is_multi_answer;
    if (userAnswer.is_end_time !== undefined)
      payload.is_end_time = userAnswer.is_end_time;
    const result = await submitQuizQuestionMutation.mutateAsync({
      id: Number(id),
      data: payload,
    });
    setCheckedAnswer(result.data);
    // Lưu kết quả vào answerResults
    setAnswerResults((prev) => ({ ...prev, [question.number]: result.data }));
  };

  // Hàm duyệt
  const handleApprove = (quizId: number) => {
    approveMutation(quizId, {
      onSuccess: (response) => {
        const publishedQuizId = response.data.published.id;
        navigate(
          ROUTERS.QUIZ_DETAIL.replace(":id", publishedQuizId.toString())
        );
      },
    });
  };
  // Hàm mở modal từ chối
  const handleReject = (quizId: number) => {
    setSelectedQuizId(quizId);
    setInputModalType("reject");
    setInputModalOpen(true);
  };
  // Hàm mở modal hủy publish
  const handleCancelPublish = (quizId: number) => {
    setSelectedQuizId(quizId);
    setInputModalType("cancelPublish");
    setInputModalOpen(true);
  };
  // Hàm xác nhận modal
  const handleInputModalConfirm = (reason: string) => {
    if (inputModalType === "reject" && selectedQuizId) {
      rejectMutation({ id: selectedQuizId, data: { reject_reason: reason } });
    } else if (inputModalType === "cancelPublish" && selectedQuizId) {
      inactivePublishMutation({
        id: selectedQuizId,
        data: { reject_reason: reason },
      });
    }
    setInputModalOpen(false);
    setInputModalType(null);
    setSelectedQuizId(null);
  };
  // Hàm hủy modal
  const handleInputModalCancel = () => {
    setInputModalOpen(false);
    setInputModalType(null);
    setSelectedQuizId(null);
  };
  // Hàm publish
  const handlePublish = (quizId: number) => {
    publishMutation(quizId);
  };

  if (isLoading) return <div className="text-center py-10">Đang tải...</div>;
  if (!quizSet)
    return (
      <div className="text-center py-10 text-red-500">
        Không tìm thấy bộ câu hỏi
      </div>
    );

  return (
    <PageContainer title={quizSet.data.title}>
      <div className="w-full max-w-5xl mx-auto">
        <BackButton className="mb-4" to={ROUTERS.QUIZ} />
        <QuizSetView
          quizSetData={quizSet.data}
          onPlay={handlePlay}
          onApprove={handleApprove}
          onReject={handleReject}
          onUnpublishQuiz={handleCancelPublish}
          onPublish={handlePublish}
        />
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          {quizPlay.questions.length > 0 && (
            <QuizQuestionPlay
              question={
                currentSlideIdx < quizPlay.questions.length
                  ? quizPlay.questions[currentSlideIdx]
                  : undefined
              }
              slides={quizPlay.questions}
              onClose={() => setShowModal(false)}
              checkAnswer={handleSubmitQuizQuestion}
              answerChecked={checkedAnswer}
              onNextSlide={
                showConfirm
                  ? () => {
                      setCurrentSlideIdx(0);
                      setTimeout(() => setShowConfirm(false), 0);
                    }
                  : handleNextSlide
              }
              startSlide={showConfirm}
              onContinue={
                currentSlideIdx > 0 ? () => setShowConfirm(false) : undefined
              }
              onRestart={
                currentSlideIdx > 0
                  ? () => {
                      setCurrentSlideIdx(0);
                      setTimeout(() => setShowConfirm(false), 0);
                    }
                  : undefined
              }
              canContinue={currentSlideIdx > 0}
              answerResults={answerResults}
            />
          )}
        </Modal>
        <InputModal
          open={inputModalOpen}
          title={
            inputModalType === "reject" ? "Từ chối phê duyệt" : "Hủy công khai"
          }
          description={
            inputModalType === "reject"
              ? "Nhập lý do từ chối phê duyệt bộ câu hỏi này."
              : "Nhập lý do hủy công khai bộ câu hỏi này."
          }
          onCancel={handleInputModalCancel}
          onConfirm={handleInputModalConfirm}
          confirmText="Xác nhận"
          cancelText="Hủy"
          placeholder="Nhập lý do..."
        />
        {/* Bảng xếp hạng */}
        {leaderboardData?.data && (
          <QuizLeaderboard leaderboard={leaderboardData.data} />
        )}
      </div>
    </PageContainer>
  );
};

export default QuizDetail;
