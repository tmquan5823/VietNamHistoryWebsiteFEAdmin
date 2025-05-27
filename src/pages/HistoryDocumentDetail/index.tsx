import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { documentApi } from "@/api/documentApi";
import { Document } from "@/dataHelper/document.dataHelper";
import { formatYear } from "@/utils/helperFunction";

const HistoryDocumentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    mutate: fetchDocument,
    data,
    isPending: loading,
    isError,
  } = useMutation({
    mutationFn: (id: number) => documentApi.getDocumentById(id),
  });

  useEffect(() => {
    if (id) fetchDocument(Number(id));
  }, [id, fetchDocument]);

  if (loading) return <div className="text-center py-10">Đang tải...</div>;
  if (isError || !data)
    return (
      <div className="text-center py-10 text-red-500">
        Không tìm thấy tài liệu
      </div>
    );

  const document: Document = data.data;
  console.log(document);

  return (
    <div className="w-[1200px] mx-auto p-6">
      <button
        className="mb-4 px-4 py-2 bg-[#F5E3C3] text-[#5D4137] rounded hover:bg-[#e2cfa3] font-semibold"
        onClick={() => navigate(-1)}
      >
        ← Quay lại
      </button>
      <h1 className="text-3xl font-bold mb-2 text-[#5D4137]">{document.title}</h1>
      <div className="mb-2 text-gray-500">
        {formatYear(document.start_year)} - {formatYear(document.end_year)}
      </div>
      {document.image && (
        <img
          src={document.image}
          alt={document.title}
          className="w-full max-h-96 object-cover rounded mb-4"
        />
      )}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: document.content }}
      />
    </div>
  );
};

export default HistoryDocumentDetail;
