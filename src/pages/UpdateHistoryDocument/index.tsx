import React, { useEffect, useState } from "react";
import HistoryDocumentForm from "./component/HistoryDocumentForm";
import { AddPeriodModal } from "../CreateHistoryDocument/components/AddPeriodModal";
import { useMutation } from "@tanstack/react-query";
import { periodsApi } from "@/api/periodsAPI";
import { historyDocumentApi } from "@/api/historyDocumentAPI";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router-dom";

const UpdateHistoryDocument: React.FC = () => {
  const [periods, setPeriods] = useState([]);
  const [documentData, setDocumentData] = useState<any>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // Lấy periods
  const getPeriods = useMutation({
    mutationFn: () => periodsApi.getPeriods(),
    onSuccess: (res) => setPeriods(res.data || []),
  });

  // Thêm period
  const addPeriod = useMutation({
    mutationFn: (data: any) => periodsApi.createPeriod(data),
    onSuccess: () => {
      toast.success("Thêm giai đoạn thành công!");
      getPeriods.mutate();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Có lỗi xảy ra");
    },
  });

  // Lấy dữ liệu tài liệu cần cập nhật
  const getDocument = useMutation({
    mutationFn: (id: string) => historyDocumentApi.getDocumentById(id),
    onSuccess: (res) => setDocumentData(res.data),
    onError: () => toast.error("Không tìm thấy tài liệu"),
  });

  console.log(documentData);

  // Mutation cập nhật document
  const updateDocument = useMutation({
    mutationFn: (data: any) =>
      id
        ? historyDocumentApi.updateDocument(id as string, data)
        : Promise.reject(),
    onSuccess: () => {
      toast.success("Cập nhật tài liệu thành công!");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Có lỗi xảy ra");
    },
  });

  useEffect(() => {
    getPeriods.mutate();
    if (id) getDocument.mutate(id);
  }, [id]);

  return (
    <div className="w-[1200px] mx-auto mt-8 p-6 bg-white rounded shadow">
      <button
        className="mb-4 px-4 py-2 text-gray-700 rounded hover:bg-gray-300 font-semibold"
        onClick={() => navigate(-1)}
      >
        ← Quay lại
      </button>
      <h2 className="text-2xl font-bold mb-4">Cập nhật tài liệu lịch sử</h2>
      <AddPeriodModal
        onAddPeriod={addPeriod.mutate}
        loading={addPeriod.isPending}
      />
      {documentData && (
        <HistoryDocumentForm
          periods={periods}
          initialValues={documentData}
          onCreateDocument={updateDocument.mutateAsync}
          loading={updateDocument.isPending}
          isUpdate
        />
      )}
    </div>
  );
};

export default UpdateHistoryDocument;
