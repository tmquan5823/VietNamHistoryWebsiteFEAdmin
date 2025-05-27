import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "@/constant";
import { Document } from "@/dataHelper/document.dataHelper";
import { formatYear } from "@/utils/helperFunction";
interface TimelineVerticalProps {
  documents: Document[];
}

const TimelineVertical: React.FC<TimelineVerticalProps> = ({ documents }) => {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(ROUTERS.HISTORY_DOCUMENT_DETAIL.replace(":id", id.toString()));
  };

  return (
    <div className="max-w-7xl mx-auto px-1 sm:px-2 pb-6 sm:pb-10">
      <div className="border-l-4 border-[#F5E3C3] pl-2 sm:pl-4">
        {documents.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row gap-2 md:gap-4 mb-6 md:mb-8 relative group cursor-pointer"
            onClick={() => handleClick(item.id)}
          >
            {/* Thời gian bắt đầu */}
            <div
              className="absolute -left-16 sm:-left-24 top-0 w-12 sm:w-16 text-right text-[10px] sm:text-xs text-gray-500 font-semibold"
              style={{ right: "100%", minWidth: "32px", maxWidth: "64px" }}
            >
              {formatYear(item.start_year)}
            </div>
            {/* Dot on timeline */}
            <div className="absolute -left-5 sm:-left-7 -top-1 w-4 h-4 sm:w-5 sm:h-5 bg-[#D12827] rounded-full border-4 border-white z-10"></div>
            {/* Card */}
            <div className="flex flex-col md:flex-row bg-[#FFF6E9] rounded-lg shadow-md overflow-hidden w-full min-h-[120px] md:min-h-[180px]">
              <div className="md:w-36 w-full h-28 md:h-40 flex-shrink-0 bg-[#F5E3C3] flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-28 md:h-40"
                  style={{ maxHeight: 160 }}
                />
              </div>
              <div className="flex-1 p-2 md:p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-base md:text-lg font-bold text-[#5D4137] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-500 mb-1">
                    {formatYear(item.start_year)} - {formatYear(item.end_year)}
                  </p>
                  <div
                    className="text-[#5D4137]/80 text-xs sm:text-sm mb-2"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      minHeight: 32,
                    }}
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </div>
                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-500 mt-2">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2"
                    />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {/* {item.events} sự kiện */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineVertical;
