import React from "react";

interface TimerProps {
  progress: number;
  score: number;
  className?: string;
  hideScore?: boolean;
}

const Timer: React.FC<TimerProps> = ({
  progress,
  score,
  className = "",
  hideScore = false,
}) => {
  return (
    <div
      className={`relative w-full max-w-md h-5 bg-gray-200 rounded-full overflow-hidden border border-gray-400 ${className}`}
    >
      <div
        className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-300 via-yellow-200 to-pink-300 transition-all duration-100"
        style={{ width: `${progress}%` }}
      ></div>
      {!hideScore && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-black font-bold text-lg drop-shadow-sm select-none">
          {score}
        </span>
      )}
    </div>
  );
};

export default Timer;
