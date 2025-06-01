import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userApi } from "@/api/userApi";
import { UserQueryParams } from "@/dataHelper/user.dataHelper";

const userQuery = (params: UserQueryParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => userApi.getUsers(params).then((res) => res.data),
  });
};

const userByIdQuery = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => userApi.getUserById(id).then((res) => res.data),
  });
};

const updateUserQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      userApi.updateUser(id, data).then((res) => res.data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Cập nhật người dùng thành công");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};

const banUserQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => userApi.banUser(id).then((res) => res.data),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Khóa người dùng thành công");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  }); 
};  

const unBanUserQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => userApi.unBanUser(id).then((res) => res.data),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Mở khóa người dùng thành công");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};  

const createUserQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => userApi.createUser(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Tạo người dùng thành công");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};

export const useUserHook = {
  userQuery,
  userByIdQuery,
  updateUserQuery,
  banUserQuery,
  unBanUserQuery,
  createUserQuery,
};
