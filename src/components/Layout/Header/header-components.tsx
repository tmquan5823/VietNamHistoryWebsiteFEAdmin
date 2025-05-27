import React from "react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTERS } from "@/constant";

import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

export const Brand = () => {
  return (
    <Link to={ROUTERS.HOME} className="flex items-center gap-1">
      <img
        src={import.meta.env.VITE_BASE_URL + "images/vietnam.png"}
        alt="Vietnamese Flag"
        className="w-10 h-8 object-cover"
      />
      <div className="px-3 py-1 rounded">
        <span className="text-2xl font-bold text-[#5D4037]">Việt Sử</span>
      </div>
    </Link>
  );
};

export const NavigationItems = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  return (
    <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
      <button
        onClick={() => navigate(ROUTERS.HOME)}
        className={`transition-colors font-medium ${
          isActiveRoute(ROUTERS.HOME) || isActiveRoute(ROUTERS.DEFAULT)
            ? "text-[#D12827]"
            : "text-[#5D4037] hover:text-[#D12827]"
        }`}
      >
        Trang chủ
      </button>
      <button
        onClick={() => navigate(ROUTERS.HISTORY_DOCUMENTS)}
        className={`transition-colors font-medium ${
          isActiveRoute(ROUTERS.HISTORY_DOCUMENTS)
            ? "text-[#D12827]"
            : "text-[#5D4037] hover:text-[#D12827]"
        }`}
      >
        Tài liệu
      </button>
      <button
        onClick={() => navigate(ROUTERS.HISTORY_DOCUMENTS)}
        className={`transition-colors font-medium ${
          isActiveRoute(ROUTERS.HISTORY_DOCUMENTS)
            ? "text-[#D12827]"
            : "text-[#5D4037] hover:text-[#D12827]"
        }`}
      >
        Phục chế ảnh
      </button>
      <button
        onClick={() => navigate(ROUTERS.HISTORY_DOCUMENTS)}
        className={`transition-colors font-medium ${
          isActiveRoute(ROUTERS.HISTORY_DOCUMENTS)
            ? "text-[#D12827]"
            : "text-[#5D4037] hover:text-[#D12827]"
        }`}
      >
        Diễn đàn
      </button>
      <button
        onClick={() => navigate(ROUTERS.HISTORY_DOCUMENTS)}
        className={`transition-colors font-medium ${
          isActiveRoute(ROUTERS.HISTORY_DOCUMENTS)
            ? "text-[#D12827]"
            : "text-[#5D4037] hover:text-[#D12827]"
        }`}
      >
        Tài liệu lịch sử
      </button>
    </div>
  );
};

interface listItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  href: string;
  logo: string;
}

const ListItem = React.forwardRef<React.ElementRef<"a">, listItemProps>(
  ({ className, title, children, href, logo, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            to={href}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="flex items-center space-x-2">
              <img src={logo} alt={title} className="w-6 h-6 object-contain" />
              <div className="text-sm font-medium leading-none">{title}</div>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export const AccountDropdown = ({ onLogout }: { onLogout: () => void }) => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };
    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center gap-2 px-4 py-2 rounded bg-[#5D4037] text-white hover:opacity-90 transition-opacity"
        onClick={() => setOpenMenu((prev) => !prev)}
      >
        {/* User Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z"
          />
        </svg>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {openMenu && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-2 transition-all duration-200">
          <button
            className="flex items-center gap-3 w-full text-left px-5 py-3 text-base text-[#5D4037] hover:bg-[#f5e6d6] transition items-center whitespace-nowrap"
            onClick={() => {
              setOpenMenu(false);
              navigate("/profile");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
              style={{ minWidth: 20 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487a2.1 2.1 0 1 1 2.97 2.97L7.5 19.79l-4 1 1-4 14.362-14.303z"
              />
            </svg>
            <span className="whitespace-nowrap">Chỉnh sửa thông tin</span>
          </button>
          <button
            className="flex items-center gap-3 w-full text-left px-5 py-3 text-base text-red-600 hover:bg-[#fbeaea] transition items-center whitespace-nowrap"
            onClick={onLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
              style={{ minWidth: 20 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m-6-3h12m0 0l-3-3m3 3l-3 3"
              />
            </svg>
            <span className="whitespace-nowrap">Đăng xuất</span>
          </button>
        </div>
      )}
    </div>
  );
};
