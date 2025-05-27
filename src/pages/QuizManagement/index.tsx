import React, { useState } from "react";
import QuizFilter from "./components/QuizFilter";
import Pagination from "@/components/common/Pagination";
import { PageContainer } from "@/components/common/PageContainer";
import { useTopicHook } from "@/hook/useTopicHook";
import { useQuizHook } from "@/hook/useQuizHook";
import QuizList from "./components/QuizList";
import InputModal from "@/components/common/InputModal";

const QuizManagement: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const [status, setStatus] = useState<string>("");
  const [inputModalOpen, setInputModalOpen] = useState(false);
  const [inputModalType, setInputModalType] = useState<
    "reject" | "cancelPublish" | "publish" | null
  >(null);
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);

  const { data: quizSetResponse, refetch } = useQuizHook.quizSetQuery({
    topic_id: Number(selectedTopicId) || undefined,
    page: currentPage,
    limit,
    search,
    sort_by: sortBy,
    sort_order: sortOrder,
    status,
  });

  const quizSets = quizSetResponse?.data || [];
  const totalQuizSets = quizSetResponse?.total || 0;

  const { data: topics } = useTopicHook.topicQuery();

  const { mutate: approveMutation } = useQuizHook.approveQuizSetQuery();
  const { mutate: rejectMutation } = useQuizHook.rejectQuizSetQuery();
  const { mutate: cancelPublishMutation } =
    useQuizHook.inactivePublishQuizSetQuery();
  const { mutate: publishMutation } = useQuizHook.publishQuizSetQuery();

  const handleTopicChange = (option: { value: string } | null) => {
    setSelectedTopicId(option?.value || null);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleApprove = (id: number) => {
    approveMutation(id);
  };

  const handleReject = (id: number) => {
    setSelectedQuizId(id);
    setInputModalType("reject");
    setInputModalOpen(true);
  };

  const handleCancelPublish = (id: number) => {
    setSelectedQuizId(id);
    setInputModalType("cancelPublish");
    setInputModalOpen(true);
  };

  const handlePublish = (id: number) => {
    publishMutation(id);
  };

  const handleInputModalConfirm = (reason: string) => {
    if (inputModalType === "reject" && selectedQuizId) {
      rejectMutation({ id: selectedQuizId, data: { reject_reason: reason } });
    } else if (inputModalType === "cancelPublish" && selectedQuizId) {
      cancelPublishMutation({
        id: selectedQuizId,
        data: { reject_reason: reason },
      });
    } else if (inputModalType === "publish" && selectedQuizId) {
      publishMutation(selectedQuizId);
    }
    setInputModalOpen(false);
    setSelectedQuizId(null);
    setInputModalType(null);
  };

  const handleInputModalCancel = () => {
    setInputModalOpen(false);
    setSelectedQuizId(null);
    setInputModalType(null);
  };

  const handleSortChange = (newSort: "asc" | "desc") => {
    setSortOrder(newSort);
    setCurrentPage(1);
  };

  const handleSortByChange = (option: { value: string } | null) => {
    setSortBy(option?.value || "createdAt");
    setCurrentPage(1);
  };

  const handleStatusChange = (option: { value: string } | null) => {
    setStatus(option?.value || "");
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalQuizSets / limit);

  const handleResetFilters = () => {
    setSelectedTopicId(null);
    setSearch("");
    setSortBy("createdAt");
    setSortOrder("desc");
    setCurrentPage(1);
    setStatus("");
  };

  React.useEffect(() => {
    refetch();
    // eslint-disable-next-line
  }, [selectedTopicId, search, sortBy, sortOrder, currentPage, status]);

  return (
    <PageContainer title="Quản lý Bộ câu hỏi">
      <QuizFilter
        topics={topics || []}
        selectedTopicId={selectedTopicId}
        handleTopicChange={handleTopicChange}
        search={search}
        handleSearchChange={handleSearchChange}
        sortBy={sortBy}
        handleSortByChange={handleSortByChange}
        onResetFilters={handleResetFilters}
        selectedStatus={status}
        handleStatusChange={handleStatusChange}
      />
      <div>
        <QuizList
          quizsets={quizSets}
          onApprove={handleApprove}
          onReject={handleReject}
          onCancelPublish={handleCancelPublish}
          onPublish={handlePublish}
          onSortChange={handleSortChange}
          sort={sortOrder}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <InputModal
        open={inputModalOpen}
        title={
          inputModalType === "reject"
            ? "Từ chối phê duyệt"
            : inputModalType === "cancelPublish"
            ? "Hủy công khai"
            : "Kích hoạt lại"
        }
        description={
          inputModalType === "reject"
            ? "Nhập lý do từ chối phê duyệt bộ câu hỏi này."
            : inputModalType === "cancelPublish"
            ? "Nhập lý do hủy công khai bộ câu hỏi này."
            : "Bạn có chắc chắn muốn kích hoạt lại bộ câu hỏi này không?"
        }
        onCancel={handleInputModalCancel}
        onConfirm={handleInputModalConfirm}
        confirmText="Xác nhận"
        cancelText="Hủy"
        placeholder="Nhập lý do..."
      />
    </PageContainer>
  );
};

export default QuizManagement;
