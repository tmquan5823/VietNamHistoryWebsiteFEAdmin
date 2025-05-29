import React from "react";
import { useParams } from "react-router-dom";
import { statusMapForum } from "@/constant";
import { CiTimer } from "react-icons/ci";
import { useForumPostHook } from "@/hook/useForumPostHook";
import { PageContainer } from "@/components/common/PageContainer";
import BackButton from "@/components/ui/backButton";

const ForumPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useForumPostHook.forumPostByIdQuery(
    Number(id)
  );
  console.log(data);

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
              {post.status === "pending" && (
                <button className="px-3 py-1 rounded bg-neutral-500 text-white text-xs font-semibold hover:bg-neutral-600 transition">
                  {"Hủy đăng tải"}
                </button>
              )}
              {post.status === "local" && (
                <button className="px-3 py-1 rounded bg-green-600 text-white text-xs font-semibold hover:bg-green-700 transition">
                  {"Đăng tải"}
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
    </PageContainer>
  );
};

export default ForumPostDetail;
