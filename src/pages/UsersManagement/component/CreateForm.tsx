import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createUserSchema } from "@/utils/schema";
import Select from "react-select";

interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (data: {
    fullname: string;
    email: string;
    password: string;
    gender: string;
    birthday: string;
    role: string;
    avatar?: File | null;
  }) => void;
  isLoading?: boolean;
}

type CreateUserFormType = {
  fullname: string;
  email: string;
  password: string;
  gender: string;
  birthday: string;
  role: string;
  avatar?: File | null;
};

const genderOptions = [
  { value: "male", label: "Nam" },
  { value: "female", label: "Nữ" },
  { value: "other", label: "Khác" },
];
const roleOptions = [
  { value: "admin", label: "Quản trị viên" },
  { value: "user", label: "Người dùng" },
];

const CreateForm: React.FC<CreateFormProps> = ({
  onCancel,
  onSubmit,
  isLoading,
}) => {
  const form = useForm<CreateUserFormType>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      gender: "other",
      birthday: "",
      role: "user",
      avatar: null,
    },
  });

  const handleSelectChange = (
    name: keyof CreateUserFormType,
    value: string
  ) => {
    form.setValue(name, value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      form.setValue("avatar", e.target.files[0]);
    }
  };

  const handleSubmit = (values: CreateUserFormType) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-[480px] max-w-full flex flex-col items-center gap-4"
      >
        <div className="flex w-full gap-3">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Họ tên</FormLabel>
                <FormControl>
                  <Input placeholder="Họ tên" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="email"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full gap-3">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Mật khẩu"
                    type="password"
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
            name="gender"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Giới tính</FormLabel>
                <Select
                  name="gender"
                  value={genderOptions.find((o) => o.value === field.value)}
                  onChange={(option) =>
                    handleSelectChange("gender", option?.value || "other")
                  }
                  options={genderOptions}
                  className="w-full text-left"
                  classNamePrefix="react-select"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full gap-3">
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Ngày sinh</FormLabel>
                <FormControl>
                  <Input type="date" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Vai trò</FormLabel>
                <Select
                  name="role"
                  value={roleOptions.find((o) => o.value === field.value)}
                  onChange={(option) =>
                    handleSelectChange("role", option?.value || "user")
                  }
                  options={roleOptions}
                  className="w-full text-left"
                  classNamePrefix="react-select"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="avatar"
          render={() => (
            <FormItem className="w-full">
              <FormLabel>Ảnh đại diện</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-[#5D4037] text-[#FDDAA7] font-bold hover:bg-[#7B5E3B] transition"
            disabled={isLoading}
          >
            {isLoading ? "Đang tạo..." : "Tạo mới"}
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-300 text-[#5D4037] font-bold hover:bg-gray-400 transition"
            onClick={onCancel}
          >
            Hủy
          </button>
        </div>
      </form>
    </Form>
  );
};

export default CreateForm;
