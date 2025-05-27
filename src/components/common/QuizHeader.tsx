import React from "react";

interface QuizHeaderProps {
  fullscreen: boolean;
  handleFullscreen: () => void;
  currentSlide?: number;
  totalSlides?: number;
  onNextSlide?: () => void;
  nextDisabled?: boolean;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  fullscreen,
  handleFullscreen,
  currentSlide,
  totalSlides,
  onNextSlide,
  nextDisabled,
}) => (
  <div className="w-full flex items-center justify-between px-8 py-3 bg-[#FDDAA7] border-b border-[#2a4a4f] min-h-14">
    <div className="flex items-center gap-2">
      <img
        src={import.meta.env.VITE_BASE_URL + "images/vietnam.png"}
        alt="Vietnamese Flag"
        className="w-10 h-8 object-cover"
      />
      <div className="px-3 py-1 rounded">
        <span className="text-2xl font-bold text-[#5D4037]">Việt Sử</span>
      </div>
    </div>
    {/* Slide indicator + next button */}
    {typeof currentSlide === "number" && typeof totalSlides === "number" && (
      <div className="flex items-center gap-4 ml-8">
        <span className="text-lg font-bold text-[#5D4037] bg-[#F9C87A] shadow px-5 py-2 rounded-full">
          Slide {currentSlide}/{totalSlides}
        </span>
        <button
          className={`bg-[#5D4037] text-white shadow-lg hover:bg-[#7a614a] transition transform hover:scale-110 p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={onNextSlide}
          disabled={nextDisabled}
          title="Sang slide tiếp theo"
          style={{ lineHeight: 0 }}
        >
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              d="M8 5l8 7-8 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    )}
    <div className="flex items-center gap-4 ml-auto">
      <button
        className="z-20 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow border border-gray-300"
        onClick={handleFullscreen}
        title={fullscreen ? "Thu nhỏ" : "Phóng to toàn màn hình"}
      >
        {fullscreen ? (
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <polyline points="9 9 3 9 3 3" />
            <polyline points="15 9 21 9 21 3" />
            <polyline points="15 15 21 15 21 21" />
            <polyline points="9 15 3 15 3 21" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 4h7V2H2v9h2V4zm16 0v7h2V2h-9v2h7zm0 16h-7v2h9v-9h-2v7zM4 20v-7H2v9h9v-2H4z" />
          </svg>
        )}
      </button>
    </div>
  </div>
);

export default QuizHeader;
