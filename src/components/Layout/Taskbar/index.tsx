import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "@/constant";
import { Menu, X } from "lucide-react";

const Taskbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleTaskbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Taskbar Toggle Button */}
      <button
        onClick={toggleTaskbar}
        className="absolute right-4 z-50 p-2 bg-[#5D4037] text-white rounded-full md:hidden"
        style={{ top: "12px" }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Taskbar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleTaskbar}
        />
      )}

      {/* Taskbar Content */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-[#FDDAA7] transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#5D4037]">Menu</h2>
            <button
              onClick={toggleTaskbar}
              className="p-2 text-[#5D4037] hover:bg-[#5D4037]/10 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 flex items-center">
            <ul className="space-y-4 w-full">
              <li>
                <button
                  onClick={() => {
                    navigate(ROUTERS.HOME);
                    setIsOpen(false);
                  }}
                  className="w-full p-3 text-center text-[#5D4037] hover:bg-[#5D4037]/10 rounded-lg font-medium"
                >
                  Trang chủ
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate(ROUTERS.HISTORY_DOCUMENTS);
                    setIsOpen(false);
                  }}
                  className="w-full p-3 text-center text-[#5D4037] hover:bg-[#5D4037]/10 rounded-lg font-medium"
                >
                  Tài liệu
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate(ROUTERS.HISTORY_DOCUMENTS);
                    setIsOpen(false);
                  }}
                  className="w-full p-3 text-center text-[#5D4037] hover:bg-[#5D4037]/10 rounded-lg font-medium"
                >
                  Phục chế ảnh
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate(ROUTERS.HISTORY_DOCUMENTS);
                    setIsOpen(false);
                  }}
                  className="w-full p-3 text-center text-[#5D4037] hover:bg-[#5D4037]/10 rounded-lg font-medium"
                >
                  Diễn đàn
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate(ROUTERS.HISTORY_DOCUMENTS);
                    setIsOpen(false);
                  }}
                  className="w-full p-3 text-center text-[#5D4037] hover:bg-[#5D4037]/10 rounded-lg font-medium"
                >
                  Tài liệu lịch sử
                </button>
              </li>
            </ul>
          </nav>

          <div className="mt-auto">
            <button
              onClick={() => {
                navigate(ROUTERS.LOGIN);
                setIsOpen(false);
              }}
              className="w-full px-5 py-2 rounded bg-[#5D4037] text-white hover:opacity-90 transition-opacity"
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Taskbar;
