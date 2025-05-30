import { PageContainer } from "@/components/common/PageContainer";
import { useForumPostHook } from "@/hook/useForumPostHook";
import React, { useState } from "react";
import PostItem from "./componenets/PostItem";
import Filter from "./componenets/Filter";
import Pagination from "@/components/common/Pagination";
import { POSTS_PER_PAGE, ROUTERS } from "@/constant";
import { useTopicHook } from "@/hook/useTopicHook";
import InputModal from "@/components/common/InputModal";
import { useNavigate } from "react-router-dom";
const STATUS_OPTIONS = [
  { value: "", label: "Tất cả" },
  { value: "approved", label: "Đã duyệt" },
  { value: "pending", label: "Chờ duyệt" },
  { value: "inactive", label: "Vô hiệu hóa" },
  { value: "needs_review", label: "Chờ xét duyệt lại" },
];

const SORT_OPTIONS = [
  { value: "createdAt_DESC", label: "Mới nhất" },
  { value: "createdAt_ASC", label: "Cũ nhất" },
  { value: "title_ASC", label: "Tên A-Z" },
  { value: "title_DESC", label: "Tên Z-A" },
];

const ForumManagement: React.FC = () => {
  // State filter
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [topicId, setTopicId] = useState("");
  const [sort, setSort] = useState("createdAt_DESC");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<{
    open: boolean;
    postId: number | null;
    type: "reject" | "inactive" | null;
  }>({ open: false, postId: null, type: null });

  const navigate = useNavigate();

  const handleResetFilter = () => {
    setSearch("");
    setStatus("");
    setTopicId("");
    setSort("createdAt_DESC");
    setPage(1);
  };

  const { data: forumPostResponse, isLoading } =
    useForumPostHook.forumPostQuery({
      page,
      limit: POSTS_PER_PAGE,
      search,
      status,
      topic_id: topicId,
      sort_by: sort.split("_")[0],
      sort_order: sort.split("_")[1],
    });

  const forumPosts = Array.isArray(forumPostResponse?.data)
    ? forumPostResponse.data
    : [];
  const totalPages = forumPostResponse?.totalPages || 1;

  const { data: topics } = useTopicHook.topicQuery();

  const handleInputModalConfirm = (reason: string) => {
    if (modal.type === "reject" && modal.postId) {
      rejectForumPost({ id: modal.postId, reject_reason: reason });
    } else if (modal.type === "inactive" && modal.postId) {
      inactiveForumPost({ id: modal.postId, reject_reason: reason });
    }
    setModal({ open: false, postId: null, type: null });
  };

  // Các hàm xử lý hành động (có thể gọi API ở đây)
  const handleView = (id: number) => {
    navigate(ROUTERS.FORUM_POST_DETAIL + `/${id}`);
  };
  const handleCancel = (id: number) => {
    alert(`Hủy đăng tải bài viết id: ${id}`);
  };

  const { mutate: approveForumPost } = useForumPostHook.approveForumPostQuery();
  const handleApprove = (id: number) => {
    approveForumPost(id);
  };

  const { mutate: rejectForumPost } = useForumPostHook.rejectForumPostQuery();

  const handleReject = (id: number) => {
    setModal({ open: true, postId: id, type: "reject" });
  };

  const handleInactive = (id: number) => {
    setModal({ open: true, postId: id, type: "inactive" });
  };

  const { mutate: activeForumPost } = useForumPostHook.activeForumPostQuery();
  const handleActive = (id: number) => {
    activeForumPost(id);
  };

  const handleModalCancel = () => {
    setModal({ open: false, postId: null, type: null });
  };

  const { mutate: inactiveForumPost } =
    useForumPostHook.inactiveForumPostQuery();

  const handleCompare = (id: number) => {
    navigate(ROUTERS.FORUM_POST_REVIEW.replace(":id", id.toString()));
  };

  return (
    <PageContainer title="Quản lý bài viết">
      <div className="bg-white p-6 rounded shadow w-full">
        {/* Bộ lọc */}
        <Filter
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          topicId={topicId}
          setTopicId={setTopicId}
          sort={sort}
          setSort={setSort}
          STATUS_OPTIONS={STATUS_OPTIONS}
          topics={topics || []}
          SORT_OPTIONS={SORT_OPTIONS}
          onReset={handleResetFilter}
        />
        {/* Danh sách bài viết */}
        {isLoading ? (
          <div>Đang tải...</div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {forumPosts && forumPosts.length > 0 ? (
                forumPosts.map((post: any) => (
                  <PostItem
                    key={post.id}
                    post={post}
                    onView={handleView}
                    onCancel={handleCancel}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onInactive={handleInactive}
                    onActive={handleActive}
                    onCompare={handleCompare}
                  />
                ))
              ) : (
                <div>Không có bài viết nào.</div>
              )}
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
            <InputModal
              open={modal.open}
              title={
                modal.type === "reject"
                  ? "Từ chối bài viết"
                  : "Vô hiệu hóa bài viết"
              }
              description={
                modal.type === "reject"
                  ? "Nhập lý do từ chối"
                  : "Nhập lý do vô hiệu hóa"
              }
              onCancel={handleModalCancel}
              onConfirm={handleInputModalConfirm}
              confirmText="Xác nhận"
              cancelText="Hủy"
              placeholder={
                modal.type === "reject"
                  ? "Nhập lý do từ chối..."
                  : "Nhập lý do vô hiệu hóa..."
              }
            />
          </>
        )}
      </div>
    </PageContainer>
  );
};

export default ForumManagement;
