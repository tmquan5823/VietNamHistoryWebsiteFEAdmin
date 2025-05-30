import React, { useState } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { useUserHook } from "@/hook/useUserHook";
import Pagination from "@/components/common/Pagination";
import { User as UserType } from "@/dataHelper/user.dataHelper";
import UserDetail from "./component/UserDetail";
import { useUserStore } from "@/store/useUserStore";
import UserTable from "./component/UserTable";
import { toast } from "sonner";
import Filter from "./component/Filter";
import { POSTS_PER_PAGE } from "@/constant";

const UsersManagement: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    search: "",
    role: "",
    sortBy: "",
    status: "",
  });
  const { data, isLoading } = useUserHook.userQuery({
    page,
    pageSize: POSTS_PER_PAGE,
    search: filter.search,
    role: filter.role,
    sortBy: filter.sortBy,
    status: filter.status,
  });
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [openDetail, setOpenDetail] = useState(false);
  const currentUser = useUserStore((state) => state.user);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowClick = (user: UserType) => {
    setSelectedUser(user);
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
    setSelectedUser(null);
  };

  const { mutate: banUser } = useUserHook.banUserQuery();
  const handleBanUser = (id: number) => {
    banUser(id, {
      onSuccess: (user) => {
        setSelectedUser(user as UserType);
      },
      onError: () => {
        toast.error("Ban user thất bại");
      },
    });
  };

  const { mutate: unBanUser } = useUserHook.unBanUserQuery();
  const handleUnBanUser = (id: number) => {
    unBanUser(id, {
      onSuccess: (user) => {
        setSelectedUser(user as UserType);
      },
      onError: () => {
        toast.error("Mở khóa user thất bại");
      },
    });
  };

  const { mutate: updateUser } = useUserHook.updateUserQuery();
  const handleUpdateUser = (
    id: number,
    data: UserType,
    onSuccess?: () => void
  ) => {
    const formData = new FormData();
    data.avatar && formData.append("avatar", data.avatar);
    data.fullname && formData.append("fullname", data.fullname);
    data.gender && formData.append("gender", data.gender);
    data.birthday && formData.append("birthday", data.birthday);
    data.role && formData.append("role", data.role);
    updateUser(
      { id, data: formData },
      {
        onSuccess: (user) => {
          setSelectedUser(user as UserType);
          setOpenDetail(true);
          if (onSuccess) onSuccess();
        },
      }
    );
  };

  if (isLoading) return <div>Đang tải...</div>;

  return (
    <PageContainer title="Quản lý người dùng">
      <Filter value={filter} onChange={setFilter} />
      <div className="overflow-x-auto h-full">
        <UserTable
          users={data?.users || []}
          page={data?.page || 1}
          pageSize={data?.pageSize || 10}
          currentUser={(currentUser as UserType) || null}
          onRowClick={handleRowClick}
        />
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={data?.page || 1}
          totalPages={data?.totalPages || 1}
          onPageChange={handlePageChange}
        />
      </div>
      <UserDetail
        user={selectedUser ?? null}
        open={openDetail}
        onClose={handleCloseDetail}
        onBanUser={handleBanUser}
        onUnBanUser={handleUnBanUser}
        onUpdateUser={handleUpdateUser}
      />
    </PageContainer>
  );
};

export default UsersManagement;
