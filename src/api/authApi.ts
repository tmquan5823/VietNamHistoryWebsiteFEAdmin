import axiosClient from "./axiosClient";
import { LoginData, LoginResponse, RegisterData, User } from "@/dataHelper/auth.dataHelper";
import { ResponseData } from "@/utils/type";

export const authApi = {
    login: (data: LoginData): Promise<ResponseData<LoginResponse>> =>
      axiosClient.post("/auth/login", data),
    register: (data: RegisterData): Promise<ResponseData<User>> =>
      axiosClient.post("/auth/sign-up", data),
    verifyEmailWithQuery: (data: { email: string; otp: string }): Promise<ResponseData<null>> =>
      axiosClient.post("/auth/verify", data),
    resendOtp: (email: string): Promise<ResponseData<null>> =>
      axiosClient.post("/auth/resend-otp", { email }),
  };
  