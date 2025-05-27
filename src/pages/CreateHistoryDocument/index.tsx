import React, { useEffect, useState } from "react";
import { HistoryDocumentForm, AddPeriodModal } from "./components";
import { useMutation } from "@tanstack/react-query";
import { periodsApi } from "@/api/periodsAPI";
import { historyDocumentApi } from "@/api/historyDocumentAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const CreateHistoryDocument: React.FC = () => {
  const [periods, setPeriods] = useState([]);
  const navigate = useNavigate();

  // Mutation lấy periods
  const getPeriods = useMutation({
    mutationFn: () => periodsApi.getPeriods(),
    onSuccess: (res) => setPeriods(res.data || []),
  });

  // Mutation thêm period
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

  // Mutation tạo document
  const createDocument = useMutation({
    mutationFn: (data: any) => historyDocumentApi.createHistoryDocument(data),
    onSuccess: () => {
      toast.success("Tạo tài liệu thành công!");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Có lỗi xảy ra");
    },
  });

  useEffect(() => {
    getPeriods.mutate();
  }, []);

  return (
    <div className="w-[1200px] mx-auto mt-8 p-6 bg-white rounded shadow">
      <button
        className="mb-4 px-4 py-2 text-gray-700 rounded hover:bg-gray-300 font-semibold"
        onClick={() => navigate(-1)}
      >
        ← Quay lại
      </button>
      <h2 className="text-2xl font-bold mb-4">Tạo tài liệu lịch sử</h2>
      <AddPeriodModal
        onAddPeriod={addPeriod.mutate}
        loading={addPeriod.isPending}
      />
      <HistoryDocumentForm
        periods={periods}
        onCreateDocument={createDocument.mutateAsync}
        loading={createDocument.isPending}
      />
    </div>
  );
};

export default CreateHistoryDocument;
