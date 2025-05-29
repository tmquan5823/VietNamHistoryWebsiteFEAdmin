import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForumPostHook } from "@/hook/useForumPostHook";
import { PageContainer } from "@/components/common/PageContainer";
import { ForumPost, ForumPostVersion } from "@/dataHelper/forumPost.dataHelper";
import { ROUTERS, statusMapForum } from "@/constant";
import { CiTimer } from "react-icons/ci";
import InputModal from "@/components/common/InputModal";

const ForumPostReview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [reverse, setReverse] = useState(false);
  const [modal, setModal] = useState(false);
  const { data, isLoading, error } = useForumPostHook.getForumPostReviewQuery(
    Number(id)
  );
  const { mutate: approveForumPost } = useForumPostHook.approveForumPostQuery();
  const { mutate: rejectForumPost } = useForumPostHook.rejectForumPostQuery();
  const navigate = useNavigate();
  if (isLoading) return <div>Đang tải...</div>;
  if (error || !data?.data) return <div>Không tìm thấy dữ liệu.</div>;

  const { forumPost, version } = data.data as {
    forumPost: ForumPost;
    version: ForumPostVersion;
  };

  // Xử lý approve
  const handleApprove = () => {
    approveForumPost(forumPost.id, {
      onSuccess: () => navigate(ROUTERS.FORUM),
    });
  };

  // Xử lý reject
  const handleReject = () => {
    setModal(true);
  };
  const handleInputModalConfirm = (reason: string) => {
    rejectForumPost(
      { id: forumPost.id, reject_reason: reason },
      { onSuccess: () => navigate(ROUTERS.FORUM) }
    );
    setModal(false);
  };
  const handleModalCancel = () => setModal(false);

  // Nút chức năng
  const renderActionButtons = () => (
    <div className="flex gap-2">
      <span
        className="px-4 py-2 rounded bg-[#FFE0B2] text-[#E65100] text-base font-semibold select-none"
        style={{ fontWeight: 500 }}
      >
        {statusMapForum[forumPost.status] || forumPost.status}
      </span>
      <button
        className="px-4 py-2 rounded bg-blue-600 text-white text-base font-semibold hover:bg-blue-700 transition"
        onClick={handleApprove}
      >
        Phê duyệt
      </button>
      <button
        className="px-4 py-2 rounded bg-red-600 text-white text-base font-semibold hover:bg-red-700 transition"
        onClick={handleReject}
      >
        Từ chối
      </button>
    </div>
  );

  return (
    <PageContainer title="So sánh phiên bản bài viết">
      {/* Thông tin người tạo + status + nút chức năng */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#FFF8F2] rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {forumPost.creator?.avatar && (
            <img
              src={forumPost.creator.avatar}
              alt={forumPost.creator.fullname}
              className="w-10 h-10 rounded-full object-cover border border-neutral-300"
            />
          )}
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-[#D12827] text-lg truncate">
              {forumPost.creator?.fullname}
            </span>
            <span className="text-xs text-neutral-500 truncate">
              {forumPost.creator?.email}
            </span>
          </div>
          <span className="flex items-center ml-4 text-base text-neutral-700">
            <CiTimer className="text-base text-[#D12827] mr-1" />
            {forumPost.createdAt
              ? new Date(forumPost.createdAt).toLocaleDateString("vi-VN")
              : ""}
          </span>
        </div>
        {renderActionButtons()}
      </div>
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
          onClick={() => setReverse((r) => !r)}
        >
          Đổi chiều so sánh
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {reverse ? (
          <>
            {renderPost(version, "Phiên bản chỉnh sửa gần nhất")}
            {renderPost(forumPost, "Bản gốc hiện tại")}
          </>
        ) : (
          <>
            {renderPost(forumPost, "Bản gốc hiện tại")}
            {renderPost(version, "Phiên bản chỉnh sửa gần nhất")}
          </>
        )}
      </div>
      {/* Modal nhập lý do từ chối */}
      <InputModal
        open={modal}
        title="Từ chối bài viết"
        description="Nhập lý do từ chối"
        onCancel={handleModalCancel}
        onConfirm={handleInputModalConfirm}
        confirmText="Xác nhận"
        cancelText="Hủy"
        placeholder="Nhập lý do từ chối..."
      />
    </PageContainer>
  );

  function renderPost(post: ForumPost | ForumPostVersion, label: string) {
    return (
      <div className="bg-white rounded-lg shadow p-6 w-full">
        <h2 className="text-xl font-bold mb-2 text-[#5D4037]">{label}</h2>
        <div className="mb-2 text-sm text-neutral-500">
          {post.createdAt && (
            <span>
              Ngày tạo: {new Date(post.createdAt).toLocaleString("vi-VN")}
            </span>
          )}
        </div>
        {"title" in post && (
          <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
        )}
        <div className="prose max-w-none text-[#5D4037] mb-4">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        {"topics" in post && post.topics && (
          <div className="flex flex-wrap gap-2 mb-2">
            {post.topics.map((topic) => (
              <span
                key={topic.id}
                className="bg-[#FDDAA7] text-[#5D4037] px-2 py-0.5 rounded text-xs font-medium"
              >
                {topic.name}
              </span>
            ))}
          </div>
        )}
        {"creator" in post && post.creator && (
          <div className="flex items-center gap-2 mt-2">
            {post.creator.avatar && (
              <img
                src={post.creator.avatar}
                alt={post.creator.fullname}
                className="w-8 h-8 rounded-full object-cover border border-neutral-300"
              />
            )}
            <span className="font-semibold text-[#D12827]">
              {post.creator.fullname}
            </span>
            <span className="text-xs text-neutral-500 ml-2">
              {post.creator.email}
            </span>
          </div>
        )}
      </div>
    );
  }
};

export default ForumPostReview;
