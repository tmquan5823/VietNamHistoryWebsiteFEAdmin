import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "@/constant";

interface HistoryDocumentsTableProps {
  documents: any[];
  onDelete: (id: string) => void;
  onSortChange: (sort: "asc" | "desc") => void;
  sort: "asc" | "desc";
}

const HistoryDocumentsTable: React.FC<HistoryDocumentsTableProps> = ({
  documents,
  onDelete,
  onSortChange,
  sort,
}) => {
  const navigate = useNavigate();

  const handleUpdate = (id: string) => {
    navigate(ROUTERS.UPDATE_HISTORY_DOCUMENT.replace(":id", id));
  };

  const handleSortClick = () => {
    onSortChange(sort === "asc" ? "desc" : "asc");
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 mt-4">
      <table className="min-w-full bg-white rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-3 border-b text-center bg-blue-100 font-semibold first:rounded-tl-lg last:rounded-tr-lg transition-colors duration-200">
              Ảnh
            </th>
            <th className="px-4 py-3 border-b text-center bg-blue-100 font-semibold transition-colors duration-200">
              Tên tài liệu
            </th>
            <th
              className={`px-4 py-3 border-b text-center bg-blue-100 font-semibold cursor-pointer select-none transition-colors duration-200 hover:bg-blue-200 ${
                sort === "asc" ? "text-blue-700" : "text-blue-900"
              }`}
              onClick={handleSortClick}
            >
              <div className="flex items-center justify-center gap-1">
                Năm bắt đầu
                <span
                  className={`inline-block text-lg transition-transform duration-200 ${
                    sort === "asc" ? "text-blue-600" : "text-blue-900"
                  }`}
                >
                  {sort === "asc" ? "▲" : "▼"}
                </span>
              </div>
            </th>
            <th className="px-4 py-3 border-b text-center bg-blue-100 font-semibold transition-colors duration-200">
              Năm kết thúc
            </th>
            <th className="px-4 py-3 border-b text-center bg-blue-100 font-semibold last:rounded-tr-lg transition-colors duration-200">
              Tính năng
            </th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, idx) => (
            <tr
              key={doc.id}
              className={`hover:bg-blue-50 transition-colors duration-150 ${
                idx === documents.length - 1 ? "last:rounded-b-lg" : ""
              }`}
            >
              <td className="px-4 py-2 border-b text-center align-middle">
                <img
                  src={doc.image}
                  alt={doc.title}
                  className="w-20 h-16 object-cover rounded shadow-sm border border-gray-100 mx-auto"
                />
              </td>
              <td className="px-4 py-2 border-b align-middle text-gray-800 font-medium">
                {doc.title}
              </td>
              <td className="px-4 py-2 border-b text-center align-middle text-gray-700">
                {doc.start_year < 0
                  ? `${Math.abs(doc.start_year)} TCN`
                  : doc.start_year}
              </td>
              <td className="px-4 py-2 border-b text-center align-middle text-gray-700">
                {doc.end_year < 0
                  ? `${Math.abs(doc.end_year)} TCN`
                  : doc.end_year}
              </td>
              <td className="px-4 py-2 border-b text-center align-middle">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2 transition shadow-sm"
                  onClick={() => handleUpdate(doc.id)}
                >
                  Cập nhật
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition shadow-sm"
                  onClick={() => onDelete(doc.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryDocumentsTable;
