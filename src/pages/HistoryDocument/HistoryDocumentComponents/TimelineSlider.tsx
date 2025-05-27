import React, { useState } from "react";
import { DocumentTitle } from "@/dataHelper/document.dataHelper";
import { formatYear } from "@/utils/helperFunction";

interface TimelineSliderProps {
  documents: DocumentTitle[];
}

const TIMELINE_START = -700;
const TIMELINE_END = 2025;
const TICKS = [-700, -300, 0, 500, 1000, 1500, 2000];

const TimelineSlider: React.FC<TimelineSliderProps> = ({ documents }) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Tính vị trí phần trăm của mỗi mốc
  const getPosition = (year: number) => {
    const percent =
      ((year - TIMELINE_START) / (TIMELINE_END - TIMELINE_START)) * 100;
    return `${percent}%`;
  };

  return (
    <div className="max-w-7xl mx-auto px-1 sm:px-2 mb-2 mt-3 sm:mt-5">
      <div className="relative w-full h-1.5 bg-[#F5E3C3] rounded-full flex items-center z-30">
        {/* Chấm đỏ cho từng document */}
        {documents
          .filter(
            (doc) =>
              doc.start_year >= TIMELINE_START && doc.start_year <= TIMELINE_END
          )
          .map((doc) => {
            const percent =
              ((doc.start_year - TIMELINE_START) /
                (TIMELINE_END - TIMELINE_START)) *
              100;
            let tooltipStyle: React.CSSProperties = { top: "-3.5rem" };
            if (percent < 10) {
              tooltipStyle = { left: 0, top: "-3.5rem" };
            } else if (percent > 90) {
              tooltipStyle = { right: 0, top: "-3.5rem" };
            } else {
              tooltipStyle = {
                left: "50%",
                transform: "translateX(-50%)",
                top: "-3.5rem",
              };
            }
            return (
              <div
                key={doc.id}
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-[#D12827] rounded-full border-2 border-white cursor-pointer"
                style={{ left: getPosition(doc.start_year) }}
                onMouseEnter={() => setHoveredId(doc.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {hoveredId === doc.id && (
                  <div
                    className="absolute bg-white border border-[#F5E3C3] shadow-lg rounded-lg px-2 sm:px-4 py-2 text-xs sm:text-sm text-[#5D4137] whitespace-nowrap z-50 min-w-[120px] sm:min-w-[180px]"
                    style={tooltipStyle}
                  >
                    <div className="font-semibold text-[#D12827] mb-1">
                      {doc.title}
                    </div>
                    <div>
                      {formatYear(doc.start_year)} - {formatYear(doc.end_year)}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        {/* Tick label tuyệt đối */}
        {TICKS.map((tick) => (
          <span
            key={tick}
            className="absolute text-[10px] sm:text-xs text-gray-400 select-none"
            style={{
              left: getPosition(tick),
              transform: "translateX(-50%)",
              top: "1.2rem",
              whiteSpace: "nowrap",
            }}
          >
            {tick < 0 ? `${Math.abs(tick)} TCN` : tick}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TimelineSlider;
