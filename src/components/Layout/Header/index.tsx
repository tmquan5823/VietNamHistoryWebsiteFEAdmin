import { Brand, NavigationItems, AccountDropdown } from "./header-components";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "@/constant";
import { useEffect, useState, useRef } from "react";
import { useUserStore } from "@/store/useUserStore";

const Header = () => {
  const navigate = useNavigate();
  const [isTaskbarOpen, setIsTaskbarOpen] = useState(false);
  const { isAuthenticated, logout } = useUserStore();
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Listen for taskbar state changes
  useEffect(() => {
    const handleTaskbarChange = (e: CustomEvent) => {
      setIsTaskbarOpen(e.detail.isOpen);
    };

    window.addEventListener("taskbarStateChange" as any, handleTaskbarChange);
    return () => {
      window.removeEventListener(
        "taskbarStateChange" as any,
        handleTaskbarChange
      );
    };
  }, []);

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

  const handleLogout = () => {
    logout();
    navigate(ROUTERS.LOGIN);
  };

  return (
    <header className="w-full py-3 z-10 bg-[#FDDAA7] border-b border-[#5D4037] relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Brand />

          <NavigationItems />

          <div
            className={`hidden md:flex items-center gap-4 ${
              isTaskbarOpen ? "hidden" : "block"
            }`}
          >
            {isAuthenticated ? (
              <AccountDropdown onLogout={handleLogout} />
            ) : (
              <button
                className="px-5 py-2 rounded bg-[#5D4037] text-white hover:opacity-90 transition-opacity"
                onClick={() => navigate(ROUTERS.LOGIN)}
              >
                Đăng nhập
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
