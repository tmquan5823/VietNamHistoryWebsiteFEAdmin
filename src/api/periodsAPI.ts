import axiosClient from "./axiosClient";
import { ResponseData } from "../utils/type";

export const periodsApi = {
  createPeriod: (data: any): Promise<ResponseData<any>> =>
    axiosClient.post("/periods", data),
  getPeriods: (): Promise<ResponseData<any>> =>
    axiosClient.get("/periods")
  };
  