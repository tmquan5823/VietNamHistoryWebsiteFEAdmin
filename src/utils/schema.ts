import { z } from "zod";

export const loginSchema = () =>
  z.object({
    email: z
      .string()
      .min(1, { message: "Email không được để trống" })
      .email({ message: "Email không hợp lệ" })
      .max(100, { message: "Email không được vượt quá 100 ký tự" }),
    password: z
      .string()
      .min(1, { message: "Mật khẩu không được để trống" })
      .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
      .max(32, { message: "Mật khẩu không được vượt quá 32 ký tự" })
  });

export const registerSchema = () =>
  z.object({
    fullName: z
      .string()
      .min(1, { message: "Họ và tên không được để trống" })
      .max(50, { message: "Họ và tên không được vượt quá 50 ký tự" })
      .regex(/^[a-zA-ZÀ-ỹ\s]*$/, { message: "Họ và tên chỉ được chứa chữ cái và khoảng trắng" }),
    email: z
      .string()
      .min(1, { message: "Email không được để trống" })
      .email({ message: "Email không hợp lệ" })
      .max(100, { message: "Email không được vượt quá 100 ký tự" }),
    password: z
      .string()
      .min(1, { message: "Mật khẩu không được để trống" })
      .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
      .max(32, { message: "Mật khẩu không được vượt quá 32 ký tự" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        { message: "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt" }
      ),
    confirmPassword: z
      .string()
      .min(1, { message: "Xác nhận mật khẩu không được để trống" })
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ['confirmPassword']
  });

export const createUserSchema = z.object({
  fullname: z
    .string()
    .min(1, { message: "Họ và tên không được để trống" })
    .max(50, { message: "Họ và tên không được vượt quá 50 ký tự" })
    .regex(/^[a-zA-ZÀ-ỹ\s]*$/, { message: "Họ và tên chỉ được chứa chữ cái và khoảng trắng" }),
  email: z
    .string()
    .min(1, { message: "Email không được để trống" })
    .email({ message: "Email không hợp lệ" })
    .max(100, { message: "Email không được vượt quá 100 ký tự" }),
  password: z
    .string()
    .min(1, { message: "Mật khẩu không được để trống" })
    .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
    .max(32, { message: "Mật khẩu không được vượt quá 32 ký tự" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      { message: "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt" }
    ),
  gender: z.string().min(1, { message: "Giới tính không được để trống" }),
  birthday: z.string()
    .min(1, { message: "Ngày sinh không được để trống" })
    .refine(
      (val) => {
        const date = new Date(val);
        const now = new Date();
        const min = new Date("1900-01-01");
        return (
          !isNaN(date.getTime()) &&
          date <= now &&
          date >= min
        );
      },
      { message: "Ngày sinh không hợp lệ hoặc lớn hơn hiện tại hoặc nhỏ hơn 01/01/1900" }
    ),
  role: z.string().min(1, { message: "Vai trò không được để trống" }),
  avatar: z.any().optional(),
});

export const updateUserSchema = z.object({
  fullname: z
    .string()
    .min(1, { message: "Họ và tên không được để trống" })
    .max(50, { message: "Họ và tên không được vượt quá 50 ký tự" })
    .regex(/^[a-zA-ZÀ-ỹ\s]*$/, { message: "Họ và tên chỉ được chứa chữ cái và khoảng trắng" }),
  gender: z.string().min(1, { message: "Giới tính không được để trống" }),
  birthday: z.string()
    .min(1, { message: "Ngày sinh không được để trống" })
    .refine(
      (val) => {
        const date = new Date(val);
        const now = new Date();
        const min = new Date("1900-01-01");
        return (
          !isNaN(date.getTime()) &&
          date <= now &&
          date >= min
        );
      },
      { message: "Ngày sinh không hợp lệ hoặc lớn hơn hiện tại hoặc nhỏ hơn 01/01/1900" }
    ),
  role: z.string().min(1, { message: "Vai trò không được để trống" }),
  avatar: z.any().optional(),
});