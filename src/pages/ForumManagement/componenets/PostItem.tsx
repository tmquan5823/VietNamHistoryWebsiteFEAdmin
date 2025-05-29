import React from "react";
import { ForumPost } from "@/dataHelper/forumPost.dataHelper";
import { statusMapForum, ROUTERS } from "@/constant";
import { CiTimer } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

interface PostItemProps {
  post: ForumPost;
  onView: (id: number) => void;
  onCancel?: (id: number) => void;
  onApprove?: (id: number) => void;
  onCompare?: (id: number) => void;
  onInactive?: (id: number) => void;
  onActive?: (id: number) => void;
  onReject?: (id: number) => void;
}

// Hàm trả về style cho từng status
const getStatusStyle = (status: string) => {
  switch (status) {
    case "approved":
      return { background: "#C8E6C9", color: "#256029" }; // xanh lá
    case "pending":
      return { background: "#BBDEFB", color: "#0D47A1" }; // xanh dương nhạt
    case "rejected":
      return { background: "#FFCDD2", color: "#B71C1C" }; // đỏ nhạt
    case "inactive":
      return { background: "#E0E0E0", color: "#616161" }; // xám
    case "local":
      return { background: "#FFF9C4", color: "#827717" }; // vàng nhạt
    case "needs_review":
      return { background: "#FFE0B2", color: "#E65100" }; // cam nhạt
    default:
      return { background: "#EEEEEE", color: "#333" };
  }
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  onReject,
  onApprove,
  onCompare,
  onInactive,
  onActive,
}) => {
  const navigate = useNavigate();
  const handleView = () => {
    navigate(ROUTERS.FORUM_POST_DETAIL.replace(":id", post.id.toString()));
  };
  if (post.status === "rejected") return null;
  return (
    <div className="bg-white rounded-lg shadow border border-neutral-200 p-4 flex flex-col md:flex-row gap-4 items-center relative">
      {/* Ảnh đại diện bài viết */}
      <img
        src={import.meta.env.BASE_URL + "/icons/blog.webp"}
        alt="blog icon"
        className="w-14 h-14 object-cover bg-neutral-100 flex-shrink-0"
      />
      <div className="flex-1 w-full flex flex-col h-full">
        {/* Status và nút chức năng theo status ở góc trên bên phải */}
        <div className="absolute top-2 right-2 flex items-center gap-2">
          <span
            className="px-2 py-0.5 rounded text-xs font-medium select-none"
            style={getStatusStyle(post.status)}
          >
            {statusMapForum[post.status] || post.status}
          </span>
          {post.status === "pending" && (
            <>
              <button
                className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
                onClick={() => onApprove && onApprove(post.id)}
              >
                Phê duyệt
              </button>
              <button
                className="px-3 py-1 rounded bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition"
                onClick={() => onReject && onReject(post.id)}
              >
                Từ chối
              </button>
            </>
          )}
          {post.status === "needs_review" && (
            <>
              <button
                className="px-3 py-1 rounded bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600 transition"
                onClick={() => onCompare && onCompare(post.id)}
              >
                Đối chiếu
              </button>
              <button
                className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
                onClick={() => onApprove && onApprove(post.id)}
              >
                Phê duyệt
              </button>
              <button
                className="px-3 py-1 rounded bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition"
                onClick={() => onReject && onReject(post.id)}
              >
                Từ chối
              </button>
            </>
          )}
          {post.status === "approved" && (
            <button
              className="px-3 py-1 rounded bg-gray-500 text-white text-xs font-semibold hover:bg-gray-600 transition"
              onClick={() => onInactive && onInactive(post.id)}
            >
              Vô hiệu hóa
            </button>
          )}
          {post.status === "inactive" && (
            <button
              className="px-3 py-1 rounded bg-green-600 text-white text-xs font-semibold hover:bg-green-700 transition"
              onClick={() => onActive && onActive(post.id)}
            >
              Kích hoạt lại
            </button>
          )}
        </div>
        <h2
          className="text-lg font-semibold text-[#5D4037] break-all mb-2 cursor-pointer transition-colors duration-200 hover:text-[#D12827]"
          onClick={handleView}
        >
          {post.title}
        </h2>
        {/* Topics */}
        <div className="flex flex-wrap gap-2 mb-2">
          {post.topics &&
            post.topics.length > 0 &&
            post.topics.map((topic) => (
              <span
                key={topic.id}
                className="bg-[#FDDAA7] text-[#5D4037] px-2 py-0.5 rounded text-xs font-medium"
              >
                {topic.name}
              </span>
            ))}
        </div>
        <div className="flex items-center justify-between text-xs text-neutral-600 mt-auto">
          <span className="flex items-center">
            <CiTimer className="text-base text-[#D12827] mr-1" />
            {post.createdAt
              ? new Date(post.createdAt).toLocaleString("vi-VN")
              : "Không xác định"}
          </span>
          <div className="flex gap-2 justify-end">
            <button
              className="px-3 py-1 rounded bg-neutral-200 text-[#5D4037] text-xs font-semibold hover:bg-neutral-300 transition"
              onClick={handleView}
            >
              Xem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
