import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { dashboardApi } from "@/api/dashboardApi";

const dashboardQuery = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      try {
        const response = await dashboardApi.getDashboardData();
        const apiResponse = response.data;

        return apiResponse;
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
  });
};

export const useDashboardHook = {
  dashboardQuery,
};
