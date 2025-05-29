import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { forumPostApi } from "@/api/forumPostApi";

const forumPostQuery = (params?: any) => {
  return useQuery({
    queryKey: ["forumPost", params],
    queryFn: async () => {
      try {
        const response = await forumPostApi.getForumPosts(params);
        const apiResponse = response.data;

        return apiResponse;
      } catch (error) {
        toast.error("Lỗi");
        throw error;
      }
    },
  });
};

const forumPostByIdQuery = (id: number) => {
  return useQuery({
    queryKey: ["forumPost", id],
    queryFn: async () => {
      const response = await forumPostApi.getForumPostById(id); 
      return response;
    },
  });
};



const approveForumPostQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await forumPostApi.approveForumPost(id);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forumPost"] });
      toast.success("Duyệt bài viết thành công");
    },
    onError: () => {
      toast.error("Lỗi");
    },
  });
};

const rejectForumPostQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, reject_reason }: { id: number, reject_reason: string }) => {
      const response = await forumPostApi.rejectForumPost(id, reject_reason);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forumPost"] });
      toast.success("Từ chối bài viết thành công");
    },
    onError: () => {
      toast.error("Lỗi");
    },
  });
};

const inactiveForumPostQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, reject_reason }: { id: number, reject_reason: string }) => {
      const response = await forumPostApi.inactiveForumPost(id, reject_reason); 
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forumPost"] });
      toast.success("Vô hiệu hóa bài viết thành công");
    },
    onError: () => {
      toast.error("Lỗi");
    },
  });
};

const activeForumPostQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await forumPostApi.activeForumPost(id);  
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forumPost"] });
      toast.success("Kích hoạt bài viết thành công");
    },
    onError: () => {
      toast.error("Lỗi");
    },
  });
};


export const useForumPostHook = {
  forumPostQuery,
  forumPostByIdQuery,
  approveForumPostQuery,
  rejectForumPostQuery, 
  inactiveForumPostQuery,
  activeForumPostQuery,
};

