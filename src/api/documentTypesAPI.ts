import axiosClient from "./axiosClient";
import { ResponseData } from "../utils/type";
import { DocumentType } from "../dataHelper/documentTypes.dataHelper";

export const documentTypesApi = {
  createDocumentType: (data: any): Promise<ResponseData<any>> =>
    axiosClient.post("/document-types", data),
  getDocumentTypes: (): Promise<ResponseData<DocumentType[]>> =>
    axiosClient.get("/document-types")
  };
  