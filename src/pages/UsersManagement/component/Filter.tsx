import React from "react";
import Select, { StylesConfig } from "react-select";

interface FilterProps {
  value: {
    search: string;
    role: string;
    sortBy: string;
    status: string;
  };
  onChange: (value: FilterProps["value"]) => void;
}

const customSelectStyles: StylesConfig<any, false> = {
  control: (provided: any, state) => ({
    ...provided,
    borderColor: "#FDDAA7",
    borderRadius: "6px",
    minHeight: "40px",
    boxShadow: state.isFocused ? "0 0 0 1px #FDDAA7" : provided.boxShadow,
    "&:hover": { borderColor: "#FDDAA7" },
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: "0 12px",
  }),
  input: (provided: any) => ({
    ...provided,
    margin: 0,
    padding: 0,
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#222",
  }),
  menu: (provided: any) => ({
    ...provided,
    zIndex: 10,
  }),
};

const roleOptions = [
  { value: "", label: "Tất cả quyền" },
  { value: "admin", label: "Quản trị viên" },
  { value: "user", label: "Người dùng" },
];
const sortByOptions = [
  { value: "", label: "Sắp xếp" },
  { value: "fullname", label: "Tên" },
  { value: "email", label: "Email" },
];
const statusOptions = [
  { value: "", label: "Tất cả trạng thái" },
  { value: "active", label: "Hoạt động" },
  { value: "banned", label: "Đã khóa" },
];

const Filter: React.FC<FilterProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-4 items-center bg-[#FFF8E1] p-3 rounded-lg shadow">
      <input
        type="text"
        placeholder="Tìm kiếm tên hoặc email..."
        className="border border-[#FDDAA7] rounded px-3 py-2 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-[#FDDAA7]"
        value={value.search}
        onChange={(e) => onChange({ ...value, search: e.target.value })}
      />
      <Select
        className="min-w-[170px] text-left"
        classNamePrefix="react-select"
        styles={customSelectStyles}
        value={
          roleOptions.find((opt) => opt.value === value.role) || roleOptions[0]
        }
        onChange={(opt) => onChange({ ...value, role: opt?.value || "" })}
        options={roleOptions}
        isSearchable={false}
      />
      <Select
        className="min-w-[140px] text-left"
        classNamePrefix="react-select"
        styles={customSelectStyles}
        value={
          sortByOptions.find((opt) => opt.value === value.sortBy) ||
          sortByOptions[0]
        }
        onChange={(opt) => onChange({ ...value, sortBy: opt?.value || "" })}
        options={sortByOptions}
        isSearchable={false}
      />
      <Select
        className="min-w-[170px] text-left"
        classNamePrefix="react-select"
        styles={customSelectStyles}
        value={
          statusOptions.find((opt) => opt.value === value.status) ||
          statusOptions[0]
        }
        onChange={(opt) => onChange({ ...value, status: opt?.value || "" })}
        options={statusOptions}
        isSearchable={false}
      />
      <button
        type="button"
        className="ml-2 px-4 py-2 rounded bg-gray-200 text-[#5D4037] font-bold hover:bg-gray-300 transition"
        onClick={() =>
          onChange({ search: "", role: "", sortBy: "", status: "" })
        }
      >
        Đặt lại bộ lọc
      </button>
    </div>
  );
};

export default Filter;
