import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../constant";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate(ROUTERS.HOME);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      handleBackHome();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <h2 className="mt-4 text-3xl font-semibold text-gray-700">
          Trang không tìm thấy
        </h2>
        <p className="mt-6 text-lg text-gray-600">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <div className="mt-10">
          <button
            onClick={handleBackHome}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            aria-label="Quay về trang chủ"
            className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
