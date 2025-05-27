import { toast } from "@/components/ui/sonner";
import React, { useState } from "react";
import LoginForm from "./login-components/LoginForm";
import RegisterForm from "./login-components/RegisterForm";
import LeftContent from "./login-components/LeftContent";
import { z } from "zod";
import { loginSchema, registerSchema } from "@/utils/schema";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/authApi";
import {
  LoginResponse,
  User,
  RegisterData,
} from "@/dataHelper/auth.dataHelper";
import { ResponseData } from "@/utils/type";
import { useUserStore } from "@/store/useUserStore";
import OTPVerificationModal from "./login-components/OTPVerificationModal";

type LoginFormData = z.infer<ReturnType<typeof loginSchema>>;
type RegisterFormData = z.infer<ReturnType<typeof registerSchema>>;

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const { mutate: login, isPending: isLoginPending } = useMutation({
    mutationFn: (data: LoginFormData) => authApi.login(data),
    onSuccess: (response: ResponseData<LoginResponse>) => {
      console.log(response);
      const { accessToken, user } = response.data;
      useUserStore.getState().login(accessToken, user);
      toast.success("Đăng nhập thành công");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const { mutate: register, isPending: isRegisterPending } = useMutation({
    mutationFn: (data: RegisterFormData) => {
      const registerData: RegisterData = {
        email: data.email,
        password: data.password,
        fullname: data.fullName,
      };
      return authApi.register(registerData);
    },
    onSuccess: (response: ResponseData<User>, variables) => {
      console.log(response);
      toast.success("Đăng ký thành công");
      setRegisteredEmail(variables.email);
      setShowOtpModal(true);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    login(data);
  };

  const handleRegister = async (data: RegisterFormData) => {
    register(data);
  };

  const handleForgotPassword = () => {
    toast.info("Chức năng quên mật khẩu đang được phát triển");
  };

  return (
    <div className="flex min-h-screen">
      <LeftContent />

      {/* Right side - Login/Register form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#FDDAA7]/10">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-[#5D4037] mb-2">
              {isLogin ? "Đăng nhập" : "Đăng ký"}
            </h2>
            <p className="text-gray-600 text-sm">
              Đăng nhập để truy cập đầy đủ tính năng
            </p>
          </div>

          {/* Toggle buttons with sliding background */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1 relative">
            <div
              className={`absolute top-1 w-1/2 h-[calc(100%-8px)] bg-white rounded-md shadow-sm transition-transform duration-300 ease-in-out ${
                isLogin ? "translate-x-0" : "translate-x-full"
              }`}
            />

            <button
              type="button"
              className={`flex-1 py-2 text-sm rounded-md transition-colors duration-300 z-10 relative ${
                isLogin ? "font-semibold text-[#5D4037]" : "text-gray-500"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Đăng nhập
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-sm rounded-md transition-colors duration-300 z-10 relative ${
                !isLogin ? "font-semibold text-[#5D4037]" : "text-gray-500"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Đăng ký
            </button>
          </div>

          {isLogin ? (
            <LoginForm
              onSubmit={handleLogin}
              onToggleForm={() => setIsLogin(false)}
              onForgotPassword={handleForgotPassword}
              isLoading={isLoginPending}
            />
          ) : (
            <RegisterForm
              onSubmit={handleRegister}
              onToggleForm={() => setIsLogin(true)}
              isLoading={isRegisterPending}
            />
          )}
        </div>
      </div>

      <OTPVerificationModal
        isOpen={showOtpModal}
        onClose={() => {
          setShowOtpModal(false);
          setIsLogin(true);
        }}
        email={registeredEmail}
      />
    </div>
  );
};

export default Login;
