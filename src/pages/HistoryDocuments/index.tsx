import { documentTypesApi } from "@/api/documentTypesAPI";
import { historyDocumentApi } from "@/api/historyDocumentAPI";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "@/constant";
import HistoryDocumentsHeader from "./components/historyDocumentsHeader";
import HistoryDocumentsTable from "./components/historyDocumentsTable";
import Pagination from "@/components/common/Pagination";
import { toast } from "sonner";
import ConfirmModal from "@/components/common/ConfirmModal";
import { PageContainer } from "@/components/common/PageContainer";

const HistoryDocuments: React.FC = () => {
  const [documentTypes, setDocumentTypes] = useState<any[]>([]);
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [keyWords, setKeyWords] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const { mutate: getDocuments} = useMutation({
    mutationFn: ({
      typeId,
      page,
      limit,
      keyWords,
      startYear,
      endYear,
      sort,
    }: {
      typeId?: string;
      page: number;
      limit: number;
      keyWords?: string;
      startYear?: string;
      endYear?: string;
      sort?: "asc" | "desc";
    }) =>
      historyDocumentApi.getDocumentsTitle({
        ...(typeId ? { typeId } : {}),
        ...(keyWords ? { keyWords } : {}),
        ...(startYear ? { startYear } : {}),
        ...(endYear ? { endYear } : {}),
        page,
        limit,
        ...(sort ? { sort } : {}),
      }),
    onSuccess: (res: any) => {
      setDocuments(res.data.documents || []);
      setTotal(res.data.total || 0);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: getDocumentTypes} =
    useMutation({
      mutationFn: () => documentTypesApi.getDocumentTypes(),
      onSuccess: (res: any) => {
        setDocumentTypes(res.data);
        if (res.data && res.data.length > 0) {
          setSelectedTypeId(res.data[0].id);
          getDocuments({
            typeId: res.data[0].id,
            page: 1,
            limit: 10,
            keyWords,
            startYear,
            endYear,
            sort,
          });
        }
      },
    });

  const { mutate: deleteDocument } = useMutation({
    mutationFn: (id: string) => historyDocumentApi.deleteDocument(id),
    onSuccess: () => {
      toast.success("Xóa tài liệu thành công!");
      getDocuments({
        typeId: selectedTypeId || undefined,
        page: currentPage,
        limit: 10,
        keyWords,
        startYear,
        endYear,
        sort,
      });
    },
    onError: () => {
      toast.error("Xóa tài liệu thất bại!");
    },
  });

  useEffect(() => {
    getDocumentTypes();
  }, []);

  useEffect(() => {
    if (selectedTypeId) {
      getDocuments({
        typeId: selectedTypeId,
        page: 1,
        limit: 10,
        keyWords,
        startYear,
        endYear,
        sort,
      });
    }
    // eslint-disable-next-line
  }, [selectedTypeId, sort]);

  const handleTypeChange = (option: { value: string } | null) => {
    const typeId = option?.value || null;
    setSelectedTypeId(typeId);
    setCurrentPage(1);
    getDocuments({
      typeId: typeId || undefined,
      page: 1,
      limit: 10,
      keyWords,
      startYear,
      endYear,
      sort,
    });
  };

  const handleKeyWordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWords(e.target.value);
    setCurrentPage(1);
    getDocuments({
      typeId: selectedTypeId || undefined,
      page: 1,
      limit: 10,
      keyWords: e.target.value,
      startYear,
      endYear,
      sort,
    });
  };

  const handleStartYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartYear(e.target.value);
    setCurrentPage(1);
    getDocuments({
      typeId: selectedTypeId || undefined,
      page: 1,
      limit: 10,
      keyWords,
      startYear: e.target.value,
      endYear,
      sort,
    });
  };

  const handleEndYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndYear(e.target.value);
    setCurrentPage(1);
    getDocuments({
      typeId: selectedTypeId || undefined,
      page: 1,
      limit: 10,
      keyWords,
      startYear,
      endYear: e.target.value,
      sort,
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    getDocuments({
      typeId: selectedTypeId || undefined,
      page,
      limit: 10,
      keyWords,
      startYear,
      endYear,
      sort,
    });
  };

  const navigate = useNavigate();
  const handleAddDocument = () => {
    navigate(ROUTERS.CREATE_HISTORY_DOCUMENT);
  };

  // State phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10; // Số lượng document mỗi trang
  const totalPages = Math.ceil(total / limit);

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteDocument(deleteId);
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleSortChange = (newSort: "asc" | "desc") => {
    setSort(newSort);
    setCurrentPage(1);
    getDocuments({
      typeId: selectedTypeId || undefined,
      page: 1,
      limit: 10,
      keyWords,
      startYear,
      endYear,
      sort: newSort,
    });
  };

  return (
    <PageContainer title="Quản lý tài liệu lịch sử">
      <HistoryDocumentsHeader
        documentTypes={documentTypes}
        selectedTypeId={selectedTypeId}
        handleTypeChange={handleTypeChange}
        handleAddDocument={handleAddDocument}
        keyWords={keyWords}
        startYear={startYear}
        endYear={endYear}
        handleKeyWordsChange={handleKeyWordsChange}
        handleStartYearChange={handleStartYearChange}
        handleEndYearChange={handleEndYearChange}
      />
      <div>
        <HistoryDocumentsTable
          documents={documents}
          onDelete={handleDelete}
          onSortChange={handleSortChange}
          sort={sort}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <ConfirmModal
        open={showDeleteModal}
        title="Xác nhận xóa"
        description="Bạn có chắc chắn muốn xóa tài liệu này?"
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        confirmText="Xóa"
        cancelText="Hủy"
        confirmClass="bg-red-500 text-white hover:bg-red-600"
      />
    </PageContainer>
  );
};

export default HistoryDocuments;
