import axiosClient from "./axiosClient";
import { Topic } from "@/dataHelper/topic.dataHelper";
import { ResponseData } from "@/utils/type";

export const topicApi = {
    getTopic: (): Promise<ResponseData<Topic[]>> =>
      axiosClient.get("/topics"),
  };
  