import axiosClient from "./axiosClient";
import { ResponseData } from "../utils/type";
import { HistoryDocumentResponse, HistoryDocumentTitleResponse, HistoryDocument } from "../dataHelper/historyDocument.dataHelper";
export const historyDocumentApi = {
    createHistoryDocument: (data:HistoryDocument): Promise<ResponseData<HistoryDocument>> =>
      axiosClient.post("/history-documents", data),
    getDocuments: (query: any): Promise<ResponseData<HistoryDocumentResponse>> =>
      axiosClient.get("/history-documents", { params: query }),
    getDocumentsTitle: (query: any): Promise<ResponseData<HistoryDocumentTitleResponse>> =>
      axiosClient.get("/history-documents/title", { params: query }),
    getDocumentById: (id: string): Promise<ResponseData<HistoryDocument>> =>
      axiosClient.get(`/history-documents/${id}`),
    updateDocument: (id: string, data:HistoryDocument): Promise<ResponseData<HistoryDocument>> =>
      axiosClient.put(`/history-documents/${id}`, data),
    deleteDocument: (id: string): Promise<ResponseData<any>> =>
      axiosClient.delete(`/history-documents/${id}`),
  };
  