import axiosClient from "./axiosClient";
import { ResponseData } from "../utils/type";
import { DashboardData } from "../dataHelper/dashboard.dataHelper";

export const dashboardApi = {
    getDashboardData: (): Promise<ResponseData<DashboardData>> =>
      axiosClient.get("/dashboard"),
  };
  