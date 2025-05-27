import { QuizLeaderboardEntry } from "@/dataHelper/quizSet.dataHelper";
import React from "react";

interface QuizLeaderboardProps {
  leaderboard: QuizLeaderboardEntry[];
}

const QuizLeaderboard: React.FC<QuizLeaderboardProps> = ({ leaderboard }) => {
  if (!leaderboard || leaderboard.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-yellow-700">
        Bảng xếp hạng
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full shadow-lg rounded-xl overflow-hidden bg-white">
          <thead>
            <tr className="bg-[#FDDAA7]/20 text-yellow-900">
              <th className="px-4 py-3 text-center font-semibold">#</th>
              <th className="px-4 py-3 text-left font-semibold">Người chơi</th>
              <th className="px-4 py-3 text-left font-semibold">Email</th>
              <th className="px-4 py-3 text-center font-semibold">Điểm</th>
              <th className="px-4 py-3 text-center font-semibold">
                Hoàn thành
              </th>
              <th className="px-4 py-3 text-center font-semibold">Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, idx) => (
              <tr
                key={entry.id}
                className={`border-t hover:bg-[#FDDAA7]/10 transition-colors group ${
                  idx === 0
                    ? "bg-yellow-100/80 font-extrabold text-yellow-700"
                    : idx === 1
                    ? "bg-gray-200/80 font-bold text-gray-600"
                    : idx === 2
                    ? "bg-orange-100/80 font-bold text-orange-700"
                    : ""
                }`}
              >
                <td className="px-4 py-3 text-center font-bold text-yellow-700 group-hover:text-yellow-900">
                  {idx + 1}
                </td>
                <td
                  className={`px-4 py-3 flex items-center gap-3 relative ${
                    idx < 3 ? "min-h-[100px]" : ""
                  }`}
                >
                  <div
                    className={`relative ${idx < 3 ? "w-14 h-14" : "w-9 h-9"}`}
                  >
                    <img
                      src={entry.user.avatar}
                      alt={entry.user.fullname}
                      className={`${
                        idx < 3 ? "w-14 h-14" : "w-9 h-9"
                      } rounded-full object-cover border-2 border-yellow-200 shadow-sm`}
                    />
                    {idx < 3 && (
                      <img
                        src={
                          import.meta.env.BASE_URL +
                          `/icons/crown${idx + 1}.png`
                        }
                        alt={`Crown ${idx + 1}`}
                        className="absolute -top-7 left-1/2 -translate-x-1/2 w-10 h-10 z-10 drop-shadow"
                        style={{ pointerEvents: "none" }}
                      />
                    )}
                  </div>
                  <span className="font-medium text-yellow-900">
                    {entry.user.fullname}
                  </span>
                </td>
                <td className="px-4 py-3 text-yellow-800">
                  {entry.user.email}
                </td>
                <td className="px-4 py-3 text-center font-semibold text-yellow-900">
                  {entry.score}
                </td>
                <td className="px-4 py-3 text-center">
                  {entry.is_finished ? (
                    <span className="flex justify-center">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="12"
                          fill="#4ade80"
                          fillOpacity="0.15"
                        />
                        <path
                          d="M7 13l3 3 7-7"
                          stroke="#22c55e"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  ) : (
                    <span className="flex justify-center">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="12"
                          fill="#f87171"
                          fillOpacity="0.15"
                        />
                        <path
                          d="M15 9l-6 6M9 9l6 6"
                          stroke="#f43f5e"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-center text-yellow-700">
                  {new Date(entry.finished_at).toLocaleString("vi-VN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizLeaderboard;
