import { Topic } from "@/dataHelper/topic.dataHelper";
import React from "react";
import Select from "react-select";

interface OptionType {
  value: string | number;
  label: string;
}

interface FilterProps {
  search: string;
  setSearch: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  topicId: string;
  setTopicId: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
  STATUS_OPTIONS: OptionType[];
  topics: Topic[];
  SORT_OPTIONS: OptionType[];
  onReset: () => void;
}

const Filter: React.FC<FilterProps> = ({
  search,
  setSearch,
  status,
  setStatus,
  topicId,
  setTopicId,
  sort,
  setSort,
  STATUS_OPTIONS,
  topics,
  SORT_OPTIONS,
  onReset,
}) => {
  // ReactSelect options
  const topicOptions: OptionType[] = [
    { value: "", label: "Tất cả" },
    ...topics.map((t) => ({ value: t.id, label: t.name })),
  ];

  // Lấy option hiện tại
  const selectedStatus =
    STATUS_OPTIONS.find((opt) => opt.value === status) || STATUS_OPTIONS[0];
  const selectedTopic =
    topicOptions.find((opt) => String(opt.value) === String(topicId)) ||
    topicOptions[0];
  const selectedSort =
    SORT_OPTIONS.find((opt) => opt.value === sort) || SORT_OPTIONS[0];

  return (
    <div className="flex flex-wrap items-end justify-between mb-8 px-4 py-3 bg-white rounded-lg shadow-sm gap-4">
      {/* Tìm kiếm */}
      <div className="flex flex-col min-w-[220px] flex-1">
        <label className="font-semibold text-xs mb-1">Tìm kiếm</label>
        <input
          type="text"
          placeholder="Tìm kiếm tiêu đề/nội dung..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-base w-full"
        />
      </div>
      {/* Chủ đề */}
      <div className="flex flex-col min-w-[180px] flex-1">
        <label className="font-semibold text-xs mb-1">Chủ đề</label>
        <Select
          options={topicOptions}
          value={selectedTopic}
          onChange={(option) => setTopicId(option ? String(option.value) : "")}
          classNamePrefix="react-select"
          isClearable={false}
        />
      </div>
      {/* Trạng thái */}
      <div className="flex flex-col min-w-[180px] flex-1">
        <label className="font-semibold text-xs mb-1">Trạng thái</label>
        <Select
          options={STATUS_OPTIONS}
          value={selectedStatus}
          onChange={(option) => setStatus(option ? String(option.value) : "")}
          classNamePrefix="react-select"
          isClearable={false}
        />
      </div>
      {/* Sắp xếp */}
      <div className="flex flex-col min-w-[180px] flex-1">
        <label className="font-semibold text-xs mb-1">Sắp xếp</label>
        <Select
          options={SORT_OPTIONS}
          value={selectedSort}
          onChange={(option) => setSort(option ? String(option.value) : "")}
          classNamePrefix="react-select"
          isClearable={false}
        />
      </div>
      <button
        type="button"
        className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg shadow font-semibold transition-all duration-200 h-11"
        onClick={onReset}
      >
        Đặt lại bộ lọc
      </button>
    </div>
  );
};

export default Filter;
