import { User } from "@/dataHelper/auth.dataHelper";
import axiosClient from "./axiosClient";
import { UserResponse, UserQueryParams } from "@/dataHelper/user.dataHelper";
import { ResponseData } from "@/utils/type";

export const userApi = {
  getUsers: (query: UserQueryParams): Promise<ResponseData<UserResponse>> =>
    axiosClient.get("/users", { params: query }),
  updateUser: (id: number, data: FormData): Promise<ResponseData<User>> =>
    axiosClient.put(`/users/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  banUser: (id: number): Promise<ResponseData<User>> =>
    axiosClient.put(`/users/ban/${id}`),
  unBanUser: (id: number): Promise<ResponseData<User>> =>
    axiosClient.put(`/users/unban/${id}`),  
  getUserById: (id: number): Promise<ResponseData<User>> =>
    axiosClient.get(`/users/${id}`),
  createUser: (data: FormData): Promise<ResponseData<User>> =>
    axiosClient.post("/users", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
