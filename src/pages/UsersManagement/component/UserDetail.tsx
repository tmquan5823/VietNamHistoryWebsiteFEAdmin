import React from "react";
import { User } from "@/dataHelper/user.dataHelper";
import UpdateForm from "./UpdateForm";

interface UserDetailProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
  onBanUser: (id: number) => void;
  onUnBanUser: (id: number) => void;
  onUpdateUser: (
    id: number,
    data: any,
    onSuccess?: () => void,
    onError?: () => void
  ) => void;
  isUpdating?: boolean;
}

const UserDetail: React.FC<UserDetailProps> = ({
  user,
  open,
  onClose,
  onBanUser,
  onUnBanUser,
  onUpdateUser,
  isUpdating,
}) => {
  const [isEdit, setIsEdit] = React.useState(false);

  if (!open || !user) return null;

  const handleBanUser = () => {
    onBanUser(user.id);
  };

  const handleUnBanUser = () => {
    onUnBanUser(user.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl border-2 border-[#FDDAA7] shadow-2xl w-full max-w-lg p-8 relative animate-fade-in scale-100 transition-transform">
        <button
          className="absolute top-3 right-3 text-3xl text-gray-400 hover:text-[#5D4037] font-bold transition"
          onClick={onClose}
          aria-label="Đóng"
        >
          &times;
        </button>
        {!isEdit && (
          <div className="flex justify-center w-full mb-2">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-28 h-28 rounded-full object-cover border-4 border-[#FDDAA7] shadow"
            />
          </div>
        )}
        <div className="flex flex-col items-center gap-3">
          {isEdit ? (
            <UpdateForm
              user={user}
              onCancel={() => setIsEdit(false)}
              onSubmit={(data) => {
                onUpdateUser(
                  user.id,
                  data,
                  () => setIsEdit(false),
                  () => {}
                );
              }}
              isLoading={isUpdating}
            />
          ) : (
            <>
              <h2 className="text-2xl font-bold text-[#5D4037] mb-1 tracking-wide">
                {user.fullname}
              </h2>
              <div className="text-gray-600 mb-2 text-base">{user.email}</div>
              <div className="flex gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-[#FDDAA7] text-[#5D4037] font-semibold text-sm shadow">
                  {user.role === "admin" ? "Quản trị viên" : "Người dùng"}
                </span>
                {user.isBanned ? (
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-semibold text-sm shadow">
                    Đã khóa
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 font-semibold text-sm shadow">
                    Hoạt động
                  </span>
                )}
              </div>
              <div className="w-full grid grid-cols-2 gap-3 mt-4">
                <div className="flex flex-col">
                  <span className="font-bold text-[#5D4037]">Giới tính</span>
                  <span className="text-gray-700">
                    {user.gender === "male"
                      ? "Nam"
                      : user.gender === "female"
                      ? "Nữ"
                      : "Khác"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#5D4037]">Ngày sinh</span>
                  <span className="text-gray-700">
                    {user.birthday
                      ? new Date(user.birthday).toLocaleDateString()
                      : "---"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#5D4037]">Ngày tạo</span>
                  <span className="text-gray-700">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "---"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#5D4037]">ID</span>
                  <span className="text-gray-700">{user.id}</span>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  className="px-4 py-2 rounded bg-[#5D4037] text-[#FDDAA7] font-bold hover:bg-[#7B5E3B] transition"
                  onClick={() => setIsEdit(true)}
                >
                  Cập nhật
                </button>
                {user.isBanned ? (
                  <button
                    className="px-4 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700 transition"
                    onClick={handleUnBanUser}
                  >
                    Mở khóa tài khoản
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 rounded bg-red-500 text-white font-bold hover:bg-red-600 transition"
                    onClick={handleBanUser}
                  >
                    Khóa tài khoản
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
