import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface SearchFilterProps {
  filterState: {
    keyWords: string;
    periodId: string;
    startYear: number;
    endYear: number;
  };
  setFilterState: (value: any) => void;
  onSearch?: () => void;
  onReset?: () => void;
  periods: any[];
}

const TIMELINE_START = -1000;
const TIMELINE_END = 2025;

const SearchFilter: React.FC<SearchFilterProps> = ({
  filterState,
  setFilterState,
  onSearch,
  onReset,
  periods,
}) => {
  // Tính phần trăm vị trí năm 0
  const zeroPercent =
    ((0 - TIMELINE_START) / (TIMELINE_END - TIMELINE_START)) * 100;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col gap-4 w-full pb-6 px-0 sm:px-2 border-b border-gray-300">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-4">
            <div className="flex-[3] flex items-center border border-gray-300 rounded-lg px-2 sm:px-3 py-2 bg-white">
              <input
                className="flex-1 outline-none bg-transparent text-gray-700 text-sm sm:text-base"
                placeholder="Tìm kiếm"
                value={filterState.keyWords}
                onChange={(e) =>
                  setFilterState((prev: any) => ({
                    ...prev,
                    keyWords: e.target.value,
                  }))
                }
              />
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-2-2"
                />
              </svg>
            </div>
            <select
              className="flex-[1] border border-gray-300 rounded-lg px-2 sm:px-3 py-2 bg-white text-gray-700 min-w-[140px] sm:min-w-[180px] text-sm sm:text-base"
              value={filterState.periodId}
              onChange={(e) =>
                setFilterState((prev: any) => ({
                  ...prev,
                  periodId: e.target.value,
                }))
              }
            >
              <option value="">Tất cả thời kỳ</option>
              {periods.map((period) => (
                <option key={period.id} value={period.id}>
                  {period.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Range slider filter */}
        <div className="flex flex-col gap-2 mt-2">
          {/* Hiển thị giá trị hiện tại */}
          <div className="mb-1 text-xs sm:text-sm text-gray-700 font-medium text-center">
            Khoảng thời gian:{" "}
            {filterState.startYear < 0
              ? `${Math.abs(filterState.startYear)} TCN`
              : filterState.startYear}{" "}
            -{" "}
            {filterState.endYear < 0
              ? `${Math.abs(filterState.endYear)} TCN`
              : filterState.endYear}
          </div>
          {/* Slider */}
          <div className="flex flex-col items-center">
            <Slider
              range
              min={TIMELINE_START}
              max={TIMELINE_END}
              value={[
                filterState.startYear <= -1000
                  ? TIMELINE_START
                  : filterState.startYear,
                filterState.endYear,
              ]}
              onChange={(val) => {
                if (Array.isArray(val)) {
                  setFilterState((prev: any) => ({
                    ...prev,
                    startYear: val[0] <= TIMELINE_START ? -1000000 : val[0],
                    endYear: val[1],
                  }));
                }
              }}
              allowCross={false}
              trackStyle={[{ backgroundColor: "#D12827" }]}
              handleStyle={[
                { borderColor: "#D12827", backgroundColor: "#fff" },
                { borderColor: "#D12827", backgroundColor: "#fff" },
              ]}
              railStyle={{ backgroundColor: "#F5E3C3" }}
            />
            {/* Nhãn hai đầu và mốc năm 0 */}
            <div className="flex justify-between w-full text-xs text-gray-500 font-semibold px-1 mt-1 relative">
              <span>Trước 1000 TCN</span>
              {/* Mốc năm 0 đúng vị trí */}
              <span
                className="absolute text-[#D12827] font-bold"
                style={{
                  left: `${zeroPercent}%`,
                  transform: "translateX(-50%)",
                  top: 0,
                }}
              >
                0
              </span>
              <span>{TIMELINE_END}</span>
            </div>
          </div>
          {/* Nút tìm kiếm và đặt lại trên cùng 1 hàng */}
          {(onSearch || onReset) && (
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 mt-4">
              {onSearch && (
                <button
                  className="w-full sm:w-32 px-6 py-2 bg-[#5D4037] text-white rounded-lg hover:bg-[#a81c1c] transition-colors text-base font-semibold"
                  onClick={onSearch}
                >
                  Tìm kiếm
                </button>
              )}
              {onReset && (
                <button
                  className="w-full sm:w-32 px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors text-base font-semibold"
                  onClick={onReset}
                >
                  Đặt lại
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
