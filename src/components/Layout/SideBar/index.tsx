import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTERS } from "@/constant";
import {
  BookOpen,
  Users,
  LayoutDashboard,
  HelpCircle,
  LogOut,
  Bell,
} from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useSelector } from "react-redux";
import { selectUnreadCount } from "@/store/notificationSlice";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useUserStore();
  const unreadCount = useSelector(selectUnreadCount);

  const isActiveRoute = (route: string) => location.pathname === route;

  return (
    <aside className="w-64 h-screen bg-[#FDDAA7] border-r border-[#5D4037] flex flex-col py-8 px-4 fixed top-0 left-0 z-30 shadow-lg">
      <div className="mb-10 flex flex-col items-center">
        <img
          src={import.meta.env.VITE_BASE_URL + "images/vietnam.png"}
          alt="Vietnamese Flag"
          className="w-12 h-10 object-cover mb-2"
        />
        <span className="text-2xl font-bold text-[#5D4037] tracking-wide">
          Việt Sử
        </span>
      </div>
      <nav className="flex flex-col gap-3 flex-1">
        <button
          onClick={() => navigate(ROUTERS.DASHBOARD)}
          className={`flex items-center gap-3 text-left px-4 py-3 rounded-lg transition-colors font-medium text-base shadow-sm
            ${
              isActiveRoute(ROUTERS.DASHBOARD)
                ? "bg-[#D12827] text-white"
                : "text-[#5D4037] hover:bg-[#f5e1c5] hover:text-[#D12827]"
            }`}
        >
          <LayoutDashboard size={20} />
          Bảng điều khiển
        </button>
        <button
          onClick={() => navigate(ROUTERS.HISTORY_DOCUMENTS)}
          className={`flex items-center gap-3 text-left px-4 py-3 rounded-lg transition-colors font-medium text-base shadow-sm
            ${
              isActiveRoute(ROUTERS.HISTORY_DOCUMENTS)
                ? "bg-[#D12827] text-white"
                : "text-[#5D4037] hover:bg-[#f5e1c5] hover:text-[#D12827]"
            }`}
        >
          <BookOpen size={20} />
          Tài liệu
        </button>
        <button
          onClick={() => navigate(ROUTERS.FORUM)}
          className={`flex items-center gap-3 text-left px-4 py-3 rounded-lg transition-colors font-medium text-base shadow-sm
            ${
              isActiveRoute(ROUTERS.FORUM)
                ? "bg-[#D12827] text-white"
                : "text-[#5D4037] hover:bg-[#f5e1c5] hover:text-[#D12827]"
            }`}
        >
          <Users size={20} />
          Diễn đàn
        </button>
        <button
          onClick={() => navigate(ROUTERS.QUIZ)}
          className={`flex items-center gap-3 text-left px-4 py-3 rounded-lg transition-colors font-medium text-base shadow-sm
            ${
              isActiveRoute(ROUTERS.QUIZ)
                ? "bg-[#D12827] text-white"
                : "text-[#5D4037] hover:bg-[#f5e1c5] hover:text-[#D12827]"
            }`}
        >
          <HelpCircle size={20} />
          Bộ câu hỏi
        </button>
        <button
          onClick={() => navigate(ROUTERS.USERS)}
          className={`flex items-center gap-3 text-left px-4 py-3 rounded-lg transition-colors font-medium text-base shadow-sm
            ${
              isActiveRoute(ROUTERS.USERS)
                ? "bg-[#D12827] text-white"
                : "text-[#5D4037] hover:bg-[#f5e1c5] hover:text-[#D12827]"
            }`}
        >
          <Users size={20} />
          Người dùng
        </button>
        <button
          onClick={() => navigate(ROUTERS.NOTIFICATION)}
          className={`flex items-center gap-3 text-left px-4 py-3 rounded-lg transition-colors font-medium text-base shadow-sm
            ${
              isActiveRoute(ROUTERS.NOTIFICATION)
                ? "bg-[#D12827] text-white"
                : "text-[#5D4037] hover:bg-[#f5e1c5] hover:text-[#D12827]"
            }`}
        >
          <div className="relative flex items-center">
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500"></span>
            )}
          </div>
          Thông báo
        </button>
      </nav>
      <button
        onClick={() => {
          logout();
          navigate(ROUTERS.LOGIN);
        }}
        className="mt-8 flex items-center gap-3 justify-center w-full px-4 py-3 rounded-lg font-medium text-base text-red-600 bg-red-100 hover:bg-red-200 transition-colors shadow-sm"
      >
        <LogOut size={20} />
        Đăng xuất
      </button>
    </aside>
  );
};

export default Sidebar;
