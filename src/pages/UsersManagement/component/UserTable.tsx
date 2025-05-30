import React from "react";
import { User } from "@/dataHelper/user.dataHelper";

interface UserTableProps {
  users: User[];
  page: number;
  pageSize: number;
  currentUser: User | null;
  onRowClick: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  page,
  pageSize,
  currentUser,
  onRowClick,
}) => {
  return (
    <table className="min-w-[700px] w-full rounded-lg shadow-md overflow-hidden border-none">
      <thead>
        <tr className="bg-[#FDDAA7] text-[#5D4037] text-base uppercase">
          <th className="p-3 border-b-2 border-[#FDDAA7]">STT</th>
          <th className="p-3 border-b-2 border-[#FDDAA7]">Họ tên</th>
          <th className="p-3 border-b-2 border-[#FDDAA7]">Email</th>
          <th className="p-3 border-b-2 border-[#FDDAA7]">Quyền</th>
          <th className="p-3 border-b-2 border-[#FDDAA7]">Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user: User, idx: number) => {
          const isCurrent = currentUser && user.id === currentUser.id;
          return (
            <tr
              key={user.id}
              className={`text-center transition hover:bg-[#FFF8E1] cursor-pointer ${
                isCurrent ? "bg-[#FFF3E0]" : ""
              }`}
              onClick={() => onRowClick(user)}
            >
              <td className="border-b border-[#FDDAA7] p-3">
                {(page - 1) * pageSize + idx + 1}
              </td>
              <td className="border-b border-[#FDDAA7] p-3 font-semibold flex items-center gap-2 justify-start">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover border border-[#FDDAA7]"
                />
                {user.fullname}
                {isCurrent && (
                  <span className="ml-2 px-2 py-0.5 rounded bg-[#5D4037] text-[#FDDAA7] text-xs font-bold">
                    Bạn
                  </span>
                )}
              </td>
              <td className="border-b border-[#FDDAA7] p-3">{user.email}</td>
              <td className="border-b border-[#FDDAA7] p-3">
                <span
                  className={
                    user.role === "admin" ? "text-[#5D4037] font-bold" : ""
                  }
                >
                  {user.role === "admin" ? "Quản trị viên" : "Người dùng"}
                </span>
              </td>
              <td className="border-b border-[#FDDAA7] p-3">
                {user.isBanned ? (
                  <span className="text-red-500 font-semibold bg-red-50 rounded px-2 py-1">
                    Đã khóa
                  </span>
                ) : (
                  <span className="text-green-600 font-semibold bg-green-50 rounded px-2 py-1">
                    Hoạt động
                  </span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserTable;
