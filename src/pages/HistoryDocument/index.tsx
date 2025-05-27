import React, { useEffect, useState } from "react";
import Header from "./HistoryDocumentComponents/Header";
import SearchFilter from "./HistoryDocumentComponents/SearchFilter";
import TimelineSlider from "./HistoryDocumentComponents/TimelineSlider";
import TimelineVertical from "./HistoryDocumentComponents/TimelineVertical";
import { documentApi } from "@/api/documentApi";
import {
  Period,
  Document,
  QueryParams,
  DocumentTitle,
  DocumentType,
} from "@/dataHelper/document.dataHelper";
import { useMutation } from "@tanstack/react-query";

const HistoryDocumentComponent: React.FC = () => {
  const [tab, setTab] = useState(1);
  const [filterState, setFilterState] = useState({
    keyWords: "",
    periodId: "",
    startYear: -1000000,
    endYear: 2025,
  });
  const [documents, setDocuments] = useState<Document[]>([]);
  const [periods, setPeriods] = useState<Period[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading] = useState(false);
  const limit = 5;
  const [documentTitle, setDocumentTitle] = useState<DocumentTitle[]>([]);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);

  const { mutate: getDocumentTitle } = useMutation({
    mutationFn: (query: QueryParams) => documentApi.getDocumentTitle(query),
    onSuccess: (response) => {
      setDocumentTitle(response.data.documents);
    },
  });

  const { mutate: getPeriods } = useMutation({
    mutationFn: () => documentApi.getPeriods(),
    onSuccess: (response) => {
      setPeriods(response.data);
    },
  });

  const { mutate: getDocumentTypes } = useMutation({
    mutationFn: () => documentApi.getDocumentTypes(),
    onSuccess: (response) => {
      setDocumentTypes(response.data);
    },
  });

  const fetchDocumentsMutation = useMutation({
    mutationFn: (params: any) => documentApi.getDocuments(params),
    onSuccess: (response, variables) => {
      const { documents: newDocs, total } = response.data;
      if (variables.page === 1) {
        setDocuments(newDocs);
      } else {
        setDocuments((prev) => [...prev, ...newDocs]);
      }
      setHasMore((variables.page - 1) * limit + newDocs.length < total);
    },
    onError: () => {
      setHasMore(false);
    },
  });

  const { mutate: fetchDocuments } = fetchDocumentsMutation;

  useEffect(() => {
    setPage(1);
    getDocumentTitle({});
    getPeriods();
    getDocumentTypes();
  }, []);

  useEffect(() => {
    if (documentTypes.length > 0) {
      setTab(documentTypes[0].id);
      fetchDocuments({
        page: 1,
        limit,
        typeId: documentTypes[0].id,
      });
      getDocumentTitle({
        typeId: documentTypes[0].id,
      });
    }
    // eslint-disable-next-line
  }, [documentTypes]);

  useEffect(() => {
    if (tab && documentTypes.length > 0) {
      fetchDocuments({
        page: 1,
        limit,
        typeId: tab,
      });
      getDocumentTitle({
        typeId: tab,
      });
    }
    // eslint-disable-next-line
  }, [tab]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200 &&
      hasMore &&
      !loading
    ) {
      const nextPage = page + 1;
      fetchDocuments({
        page: nextPage,
        limit,
        typeId: tab,
        ...filterState,
      });
      setPage(nextPage);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleReverseDocuments = () => {
    setDocuments((prev) => [...prev].reverse());
  };

  const handleSearch = () => {
    setPage(1);
    setHasMore(true);
    fetchDocuments({
      page: 1,
      limit,
      typeId: tab,
      ...filterState,
    });
    getDocumentTitle({
      typeId: tab,
      ...filterState,
      periodId: filterState.periodId ? Number(filterState.periodId) : undefined,
    });
  };

  const handleReset = () => {
    const resetFilter = {
      keyWords: "",
      periodId: "",
      startYear: -1000000,
      endYear: 2025,
    };
    setFilterState(resetFilter);
    fetchDocuments({
      page: 1,
      limit,
      typeId: tab,
      ...resetFilter,
    });
    getDocumentTitle({
      typeId: tab,
      ...resetFilter,
      periodId: resetFilter.periodId ? Number(resetFilter.periodId) : undefined,
    });
  };

  return (
    <div className="min-h-screen bg-[#fff]">
      {/* Header */}
      <Header />
      {/* Search & Filter */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <SearchFilter
          filterState={filterState}
          setFilterState={setFilterState}
          onSearch={handleSearch}
          onReset={handleReset}
          periods={periods}
        />
      </div>
      {/* Slider thời gian */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <TimelineSlider documents={documentTitle} />
      </div>
      {/* Tabs */}
      {documentTypes.length > 0 && (
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 mb-4 px-2 sm:px-4 md:px-6 lg:px-8 items-center mt-6 md:mt-10 ">
          {documentTypes.map((type) => (
            <button
              key={type.id}
              className={`px-4 md:px-6 py-2 rounded-t-lg font-semibold text-xs md:text-sm border-b-2 transition-colors ${
                tab === type.id
                  ? "bg-white border-[#D12827] text-[#5D4137]"
                  : "bg-[#F5E3C3] border-transparent text-gray-500"
              }`}
              onClick={() => setTab(type.id)}
            >
              {type.name}
            </button>
          ))}
          <div className="flex-1"></div>
          <button
            className="ml-auto p-2 rounded hover:bg-[#F5E3C3] transition-colors"
            title="Đảo ngược thứ tự"
            onClick={handleReverseDocuments}
          >
            {/* Icon sort/reverse */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[#5D4137]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
        </div>
      )}
      {/* Timeline dọc */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <TimelineVertical documents={documents} />
      </div>
      {loading && (
        <div className="w-full flex justify-center py-4">
          <span className="text-[#D12827] font-semibold">Đang tải...</span>
        </div>
      )}
    </div>
  );
};

export default HistoryDocumentComponent;
