import { Topic } from "@/dataHelper/topic.dataHelper";
import React from "react";
import Select from "react-select";

interface QuizFilterProps {
  topics: Topic[];
  selectedTopicId: string | null;
  handleTopicChange: (option: any) => void;
  search: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortBy: string;
  handleSortByChange: (option: any) => void;
  onResetFilters: () => void;
  selectedStatus: string;
  handleStatusChange: (option: any) => void;
}

const statusOptions = [
  { value: "", label: "Tất cả" },
  { value: "publish", label: "Đã công khai" },
  { value: "pending", label: "Chờ duyệt" },
  { value: "inactive", label: "Vô hiệu hóa" },
];

const sortOptions = [
  { value: "createdAt", label: "Ngày tạo" },
  { value: "title", label: "Tên Quiz Set" },
  { value: "playerCount", label: "Số người chơi" },
];

const QuizFilter: React.FC<QuizFilterProps> = ({
  topics,
  selectedTopicId,
  handleTopicChange,
  search,
  handleSearchChange,
  sortBy,
  handleSortByChange,
  onResetFilters,
  selectedStatus,
  handleStatusChange,
}) => (
  <div className="flex flex-wrap items-end justify-between mb-8 px-4 py-3 bg-white rounded-lg shadow-sm gap-4">
    {/* Chủ đề quiz */}
    <div className="flex flex-col min-w-[180px] flex-1">
      <label className="font-semibold text-xs mb-1">Chọn chủ đề</label>
      <Select
        options={[
          { value: "", label: "Tất cả" },
          ...topics.map((topic) => ({ value: topic.id, label: topic.name })),
        ]}
        value={
          [
            { value: "", label: "Tất cả" },
            ...topics.map((topic) => ({ value: topic.id, label: topic.name })),
          ].find((opt) => opt.value === selectedTopicId) || {
            value: "",
            label: "Tất cả",
          }
        }
        onChange={handleTopicChange}
        classNamePrefix="react-select"
        isClearable={false}
      />
    </div>
    {/* Lọc theo trạng thái */}
    <div className="flex flex-col min-w-[180px] flex-1">
      <label className="font-semibold text-xs mb-1">Trạng thái</label>
      <Select
        options={statusOptions}
        value={
          statusOptions.find((opt) => opt.value === selectedStatus) ||
          statusOptions[0]
        }
        onChange={handleStatusChange}
        classNamePrefix="react-select"
        isClearable={false}
      />
    </div>
    {/* Tìm kiếm */}
    <div className="flex flex-col min-w-[220px] flex-1">
      <label className="font-semibold text-xs mb-1">Tìm kiếm</label>
      <input
        type="text"
        placeholder="Tìm kiếm quiz set..."
        value={search}
        onChange={handleSearchChange}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-base w-full"
      />
    </div>
    {/* Sắp xếp theo trường */}
    <div className="flex flex-col min-w-[180px] flex-1">
      <label className="font-semibold text-xs mb-1">Sắp xếp theo</label>
      <Select
        options={sortOptions}
        value={
          sortOptions.find((opt) => opt.value === sortBy) || sortOptions[0]
        }
        onChange={handleSortByChange}
        classNamePrefix="react-select"
        isClearable={false}
      />
    </div>
    <button
      type="button"
      className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg shadow font-semibold transition-all duration-200 h-11"
      onClick={onResetFilters}
    >
      Đặt lại bộ lọc
    </button>
  </div>
);

export default QuizFilter;
