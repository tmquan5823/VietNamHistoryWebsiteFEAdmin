import axiosClient from "./axiosClient";
import { ResponseData } from "../utils/type";
import { DocumentResponse, GetDocumentsParams, QueryParams, DocumentTitleResponse } from "../dataHelper/document.dataHelper";
export const documentApi = {
    getDocuments: (params: GetDocumentsParams): Promise<ResponseData<DocumentResponse>> =>
      axiosClient.get("/history-documents", { params }),
    getDocumentById: (id: number): Promise<ResponseData<any>> =>
      axiosClient.get(`/history-documents/${id}`),
    getDocumentTitle: (query: QueryParams): Promise<ResponseData<DocumentTitleResponse>> =>
      axiosClient.get("/history-documents/title", { params: query }),
    getPeriods: (): Promise<ResponseData<any>> =>
      axiosClient.get("/periods"),
    getDocumentTypes: (): Promise<ResponseData<any>> =>
      axiosClient.get("/document-types"),
  };
  