import React from "react";
import { User } from "@/dataHelper/user.dataHelper";
import Select from "react-select";

interface UpdateFormProps {
  user: User;
  onCancel: () => void;
  onSubmit: (data: {
    fullname: string;
    gender: string;
    birthday: string;
    role: string;
  }) => void;
}

const UpdateForm: React.FC<UpdateFormProps> = ({
  user,
  onCancel,
  onSubmit,
}) => {
  const [form, setForm] = React.useState({
    fullname: user.fullname || "",
    gender: user.gender || "other",
    birthday: user.birthday ? user.birthday.slice(0, 10) : "",
    role: user.role || "user",
  });

  React.useEffect(() => {
    setForm({
      fullname: user.fullname || "",
      gender: user.gender || "other",
      birthday: user.birthday ? user.birthday.slice(0, 10) : "",
      role: user.role || "user",
    });
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center gap-3"
    >
      <input
        type="text"
        name="fullname"
        value={form.fullname}
        onChange={handleChange}
        className="border border-[#FDDAA7] rounded px-3 py-2 w-full"
        placeholder="Họ tên"
        required
      />
      <Select
        name="gender"
        value={{
          value: form.gender,
          label:
            form.gender === "male"
              ? "Nam"
              : form.gender === "female"
              ? "Nữ"
              : "Khác",
        }}
        onChange={(option) =>
          setForm({ ...form, gender: option?.value || "other" })
        }
        options={[
          { value: "male", label: "Nam" },
          { value: "female", label: "Nữ" },
          { value: "other", label: "Khác" },
        ]}
        className="w-full text-left"
        classNamePrefix="react-select"
      />
      <input
        type="date"
        name="birthday"
        value={form.birthday}
        onChange={handleChange}
        className="border border-[#FDDAA7] rounded px-3 py-2 w-full"
      />
      <Select
        name="role"
        value={{
          value: form.role,
          label: form.role === "admin" ? "Quản trị viên" : "Người dùng",
        }}
        onChange={(option) =>
          setForm({ ...form, role: option?.value || "user" })
        }
        options={[
          { value: "admin", label: "Quản trị viên" },
          { value: "user", label: "Người dùng" },
        ]}
        className="w-full text-left"
        classNamePrefix="react-select"
      />
      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className="px-4 py-2 rounded bg-[#5D4037] text-[#FDDAA7] font-bold hover:bg-[#7B5E3B] transition"
        >
          Lưu
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
  );
};

export default UpdateForm;
