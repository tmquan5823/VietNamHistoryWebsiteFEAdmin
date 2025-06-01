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
import CreateForm from "./component/CreateForm";

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
  const [openCreate, setOpenCreate] = useState(false);

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
        toast.error("Khóa tài khoản thất bại");
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
        toast.error("Mở khóa tài khoản thất bại");
      },
    });
  };

  const { mutate: updateUser, isPending: isUpdating } =
    useUserHook.updateUserQuery();
  const handleUpdateUser = (
    id: number,
    data: UserType,
    onSuccess?: () => void,
    onError?: () => void
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
        onError: () => {
          toast.error("Cập nhật thất bại");
          if (onError) onError();
        },
      }
    );
  };

  const { mutate: createUser, isPending: isCreating } =
    useUserHook.createUserQuery();
  const handleCreateUser = (
    data: {
      fullname: string;
      email: string;
      password: string;
      gender: string;
      birthday: string;
      role: string;
      avatar?: File | null;
    },
    callbacks?: { onSuccess?: () => void; onError?: () => void }
  ) => {
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("gender", data.gender);
    formData.append("birthday", data.birthday || "");
    formData.append("role", data.role);
    if (data.avatar) {
      formData.append("avatar", data.avatar);
    }
    createUser(formData, {
      onSuccess: () => {
        setSelectedUser(null);
        callbacks?.onSuccess && callbacks.onSuccess();
      },
      onError: () => {
        callbacks?.onError && callbacks.onError();
      },
    });
  };

  if (isLoading) return <div>Đang tải...</div>;

  return (
    <PageContainer title="Quản lý người dùng">
      <Filter value={filter} onChange={setFilter} />
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 rounded bg-[#5D4037] text-[#FDDAA7] font-bold hover:bg-[#7B5E3B] transition"
          onClick={() => setOpenCreate(true)}
        >
          Tạo người dùng
        </button>
      </div>
      {openCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 min-w-[350px] max-w-[90vw]">
            <CreateForm
              onCancel={() => setOpenCreate(false)}
              onSubmit={(data) => {
                handleCreateUser(data, {
                  onSuccess: () => setOpenCreate(false),
                  onError: () => toast.error("Tạo người dùng thất bại"),
                });
              }}
              isLoading={isCreating}
            />
          </div>
        </div>
      )}
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
        isUpdating={isUpdating}
      />
    </PageContainer>
  );
};

export default UsersManagement;
