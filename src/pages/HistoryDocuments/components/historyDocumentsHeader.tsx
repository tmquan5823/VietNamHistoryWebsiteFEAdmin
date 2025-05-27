import React from "react";
import Select from "react-select";

interface HistoryDocumentsHeaderProps {
  documentTypes: any[];
  selectedTypeId: string | null;
  handleTypeChange: (option: { value: string } | null) => void;
  handleAddDocument: () => void;
  keyWords: string;
  startYear: string;
  endYear: string;
  handleKeyWordsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStartYearChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEndYearChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const HistoryDocumentsHeader: React.FC<HistoryDocumentsHeaderProps> = ({
  documentTypes,
  selectedTypeId,
  handleTypeChange,
  handleAddDocument,
  keyWords,
  startYear,
  endYear,
  handleKeyWordsChange,
  handleStartYearChange,
  handleEndYearChange,
}) => (
  <div className="flex flex-wrap items-end justify-between mb-8 px-6 py-4 bg-white rounded-xl shadow gap-4">
    <div className="flex flex-wrap gap-6 items-end flex-1 min-w-0">
      {/* Loại tài liệu */}
      <div className="flex flex-col min-w-[180px] flex-1">
        <label className="font-semibold text-xs mb-1">Chọn loại tài liệu</label>
        <Select
          options={[
            { value: "", label: "Tất cả" },
            ...documentTypes.map((type) => ({
              value: type.id,
              label: type.name,
            })),
          ]}
          value={
            [
              { value: "", label: "Tất cả" },
              ...documentTypes.map((type) => ({
                value: type.id,
                label: type.name,
              })),
            ].find((opt) => opt.value === selectedTypeId) || {
              value: "",
              label: "Tất cả",
            }
          }
          onChange={handleTypeChange}
          classNamePrefix="react-select"
          isClearable={false}
        />
      </div>
      {/* Từ khóa */}
      <div className="flex flex-col min-w-[220px] flex-1">
        <label className="font-semibold text-xs mb-1">Tìm kiếm từ khóa</label>
        <input
          type="text"
          placeholder="Tìm kiếm từ khóa..."
          value={keyWords}
          onChange={handleKeyWordsChange}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-base w-full"
        />
      </div>
      {/* Năm bắt đầu */}
      <div className="flex flex-col min-w-[120px] flex-1">
        <label className="font-semibold text-xs mb-1">Năm bắt đầu</label>
        <input
          type="number"
          placeholder="Năm bắt đầu"
          value={startYear}
          onChange={handleStartYearChange}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-base w-full"
        />
      </div>
      {/* Năm kết thúc */}
      <div className="flex flex-col min-w-[120px] flex-1">
        <label className="font-semibold text-xs mb-1">Năm kết thúc</label>
        <input
          type="number"
          placeholder="Năm kết thúc"
          value={endYear}
          onChange={handleEndYearChange}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-base w-full"
        />
      </div>
    </div>
    <button
      className="bg-green-500 hover:bg-green-600 text-white px-7 py-2 rounded-lg shadow font-semibold transition-all duration-200 h-11 min-w-[140px]"
      onClick={handleAddDocument}
    >
      Thêm tài liệu
    </button>
  </div>
);

export default HistoryDocumentsHeader;
