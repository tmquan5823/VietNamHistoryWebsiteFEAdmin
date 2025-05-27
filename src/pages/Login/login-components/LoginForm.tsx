import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type LoginFormData = z.infer<ReturnType<typeof loginSchema>>;

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  onToggleForm: () => void;
  onForgotPassword: () => void;
  isLoading?: boolean;
}

const LoginForm = ({
  onSubmit,
  onToggleForm,
  onForgotPassword,
  isLoading,
}: LoginFormProps) => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema()),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 font-semibold text-[#5D4037]">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập email"
                  className="h-12 bg-gray-50 border-0 focus:border-0 focus:ring-1 focus:ring-[#5D4037]"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 font-semibold text-[#5D4037]">
                Mật khẩu
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  className="h-12 bg-gray-50 border-0 focus:border-0 focus:ring-1 focus:ring-[#5D4037]"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-[#5D4037] hover:underline"
          >
            Quên mật khẩu?
          </button>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#5D4037] hover:bg-[#5D4037]/90 h-12 text-base"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang đăng nhập...
            </>
          ) : (
            "Đăng nhập"
          )}
        </Button>

        <div className="text-center mt-4">
          <span className="text-gray-600">Chưa có tài khoản? </span>
          <button
            type="button"
            onClick={onToggleForm}
            className="text-[#5D4037] hover:underline font-medium"
            disabled={isLoading}
          >
            Đăng ký ngay
          </button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
