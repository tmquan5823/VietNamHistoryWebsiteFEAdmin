import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { statusMapForum } from "@/constant";
import { CiTimer } from "react-icons/ci";
import { useForumPostHook } from "@/hook/useForumPostHook";
import { PageContainer } from "@/components/common/PageContainer";
import BackButton from "@/components/ui/backButton";
import InputModal from "@/components/common/InputModal";

const ForumPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useForumPostHook.forumPostByIdQuery(
    Number(id)
  );
  // Mutations
  const { mutate: approveForumPost } = useForumPostHook.approveForumPostQuery();
  const { mutate: rejectForumPost } = useForumPostHook.rejectForumPostQuery();
  const { mutate: inactiveForumPost } =
    useForumPostHook.inactiveForumPostQuery();
  const { mutate: activeForumPost } = useForumPostHook.activeForumPostQuery();

  // Modal state
  const [modal, setModal] = useState<{
    open: boolean;
    type: "reject" | "inactive" | null;
  }>({ open: false, type: null });

  // Modal handlers
  const handleInputModalConfirm = (inputReason: string) => {
    if (!data?.data) return;
    if (modal.type === "reject") {
      rejectForumPost({ id: data.data.id, reject_reason: inputReason });
    } else if (modal.type === "inactive") {
      inactiveForumPost({ id: data.data.id, reject_reason: inputReason });
    }
    setModal({ open: false, type: null });
  };
  const handleModalCancel = () => {
    setModal({ open: false, type: null });
  };

  if (isLoading) return <div>Đang tải...</div>;
  if (error)
    return <div>Không tìm thấy bài viết hoặc bạn không có quyền xem.</div>;
  if (!data?.data) return <div>Không có dữ liệu.</div>;

  const post = data.data;

  // Hàm trả về style cho từng status (đồng bộ với PostItem)
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "approved":
        return { background: "#C8E6C9", color: "#256029" };
      case "pending":
        return { background: "#BBDEFB", color: "#0D47A1" };
      case "rejected":
        return { background: "#FFCDD2", color: "#B71C1C" };
      case "inactive":
        return { background: "#E0E0E0", color: "#616161" };
      case "local":
        return { background: "#FFF9C4", color: "#827717" };
      case "needs_review":
        return { background: "#FFE0B2", color: "#E65100" };
      default:
        return { background: "#EEEEEE", color: "#333" };
    }
  };

  return (
    <PageContainer title="Chi tiết bài viết">
      <div className="w-full flex justify-start mb-4">
        <BackButton className="!bg-transparent !px-0 !py-0 !shadow-none !hover:bg-neutral-100" />
      </div>
      <div className="bg-[#FFF8F2] rounded-lg p-6 shadow w-full">
        {/* Mục 1: Tiêu đề + topics */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2 relative">
            <h1 className="text-2xl font-bold text-[#5D4037]">{post.title}</h1>
            <div className="absolute top-0 right-0 flex items-center gap-2">
              <span
                className="px-2 py-0.5 rounded text-xs font-medium select-none"
                style={getStatusStyle(post.status)}
              >
                {statusMapForum[post.status] || post.status}
              </span>
              {/* Nút chức năng theo status */}
              {post.status === "pending" && (
                <>
                  <button
                    className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
                    onClick={() => approveForumPost(post.id)}
                  >
                    Phê duyệt
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition"
                    onClick={() => setModal({ open: true, type: "reject" })}
                  >
                    Từ chối
                  </button>
                </>
              )}
              {post.status === "needs_review" && (
                <>
                  <button
                    className="px-3 py-1 rounded bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600 transition"
                    // onClick={() => ...} // Đối chiếu, nếu có
                    disabled
                  >
                    Đối chiếu
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
                    onClick={() => approveForumPost(post.id)}
                  >
                    Phê duyệt
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition"
                    onClick={() => setModal({ open: true, type: "reject" })}
                  >
                    Từ chối
                  </button>
                </>
              )}
              {post.status === "approved" && (
                <button
                  className="px-3 py-1 rounded bg-gray-500 text-white text-xs font-semibold hover:bg-gray-600 transition"
                  onClick={() => setModal({ open: true, type: "inactive" })}
                >
                  Vô hiệu hóa
                </button>
              )}
              {post.status === "inactive" && (
                <button
                  className="px-3 py-1 rounded bg-green-600 text-white text-xs font-semibold hover:bg-green-700 transition"
                  onClick={() => activeForumPost(post.id)}
                >
                  Kích hoạt lại
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.topics?.map((topic) => (
              <span
                key={topic.id}
                className="bg-[#FDDAA7] text-[#5D4037] px-2 py-0.5 rounded text-xs font-medium"
              >
                {topic.name}
              </span>
            ))}
          </div>
        </div>
        {/* Mục 2: User */}
        <div className="mb-8 flex items-center gap-2 border-b border-neutral-200 pb-4">
          {post.creator?.avatar && (
            <img
              src={post.creator.avatar}
              alt={post.creator.fullname}
              className="w-8 h-8 rounded-full object-cover border border-neutral-300 mx-2"
            />
          )}
          <div className="flex flex-col">
            <span className="font-semibold text-[#D12827]">
              {post.creator?.fullname}
            </span>
            <span className="text-xs text-neutral-500">
              {post.creator?.email}
            </span>
          </div>
          <span className="flex items-center ml-4">
            <CiTimer className="text-base text-[#D12827] mr-1" />
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString("vi-VN")
              : ""}
          </span>
        </div>
        {/* Mục 3: Nội dung */}
        <div className="prose max-w-none text-[#5D4037] mb-6">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        {/* Nếu có phần bình luận, render ở đây */}
      </div>
      {/* Modal nhập lý do */}
      <InputModal
        open={modal.open}
        title={
          modal.type === "reject" ? "Từ chối bài viết" : "Vô hiệu hóa bài viết"
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
    </PageContainer>
  );
};

export default ForumPostDetail;
