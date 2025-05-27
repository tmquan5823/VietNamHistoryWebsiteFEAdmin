import { Link } from "react-router-dom";
import { FaFacebook, FaGithubAlt, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#4E342E] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo và mô tả */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src={import.meta.env.BASE_URL + "images/vietnam.png"}
                alt="Việt Sử"
                className="w-8 h-8"
              />
              <h2 className="text-2xl font-bold text-[#FDDAA7]">Việt Sử</h2>
            </div>
            <p className="text-sm">
              Nền tảng tài liệu lịch sử Việt Nam toàn diện với công nghệ AI hiện
              đại
            </p>
            <div className="flex space-x-4">
              <Link
                to="https://www.facebook.com/tran.minh.quan.811481/"
                className="hover:text-gray-300"
              >
                <FaFacebook size={24} />
              </Link>
              <Link
                to="https://www.instagram.com/tmquan58/"
                className="hover:text-gray-300"
              >
                <FaInstagram size={24} />
              </Link>
              <Link
                to="https://github.com/tmquan5823"
                className="hover:text-gray-300"
              >
                <FaGithubAlt size={24} />
              </Link>
            </div>
          </div>

          {/* Tài liệu - Ẩn trên mobile */}
          <div className="hidden lg:block space-y-4">
            <h3 className="text-lg font-semibold">Tài liệu</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/thoi-ki-dung-nuoc"
                  className="hover:text-gray-300 text-white opacity-70"
                >
                  Thời kì dựng nước
                </Link>
              </li>
              <li>
                <Link
                  to="/doc-lap-tu-chu"
                  className="hover:text-gray-300 text-white opacity-70"
                >
                  Độc lập tự chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/chong-ngoai-xam"
                  className="hover:text-gray-300 text-white opacity-70"
                >
                  Chống ngoại xâm
                </Link>
              </li>
              <li>
                <Link
                  to="/thoi-ki-hien-dai"
                  className="hover:text-gray-300 text-white opacity-70"
                >
                  Thời kì hiện đại
                </Link>
              </li>
            </ul>
          </div>

          {/* Tính năng - Ẩn trên mobile */}
          <div className="hidden lg:block space-y-4">
            <h3 className="text-lg font-semibold">Tính năng</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/tai-lieu"
                  className="hover:text-gray-300 text-white opacity-70"
                >
                  Tài liệu lịch sử
                </Link>
              </li>
              <li>
                <Link
                  to="/phuc-che"
                  className="hover:text-gray-300 text-white opacity-70"
                >
                  Phục chế ảnh bằng AI
                </Link>
              </li>
              <li>
                <Link
                  to="/dien-dan"
                  className="hover:text-gray-300 text-white opacity-70"
                >
                  Diễn đàn lịch sử
                </Link>
              </li>
              <li>
                <Link
                  to="/quiz"
                  className="hover:text-gray-300 text-white opacity-70"
                >
                  Bộ Quiz câu hỏi lịch sử
                </Link>
              </li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liên hệ</h3>
            <ul className="space-y-2">
              <li className="text-white opacity-70">
                Vĩnh Sơn, Vĩnh Linh, Quảng Trị
              </li>
              <li className="text-white opacity-70">
                <a href="mailto:tmquan5823@gmail.com">tmquan5823@gmail.com</a>
              </li>
              <li className="text-white opacity-70">
                <a href="tel:0948628477" className="hover:text-gray-300">
                  0948628477
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
