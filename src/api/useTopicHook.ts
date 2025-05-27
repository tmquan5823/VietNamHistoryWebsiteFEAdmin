import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { topicApi } from "@/api/topicApi";

const topicQuery = () => {
  return useQuery({
    queryKey: ["topic"],
    queryFn: async () => {
      try {
        const response = await topicApi.getTopic();
        const apiResponse = response.data;

        return apiResponse;
      } catch (error) {
        toast.error("Lỗi");
        throw error;
      }
    },
  });
};

export const useTopicHook = {
  topicQuery,
};
