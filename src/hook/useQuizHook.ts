import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { quizSetApi } from "@/api/quizApi";
import { QuizSetParams } from "@/dataHelper/quizSet.dataHelper";
import { QuizQuestionCheck } from "@/dataHelper/quizQuestion.datahelper";
import { useQueryClient } from "@tanstack/react-query";

const quizSetQuery = (params: QuizSetParams) => {
  return useQuery({
    queryKey: ["quizSet"],
    queryFn: async () => {
      try {
        const response = await quizSetApi.getQuizSets(params);
        const apiResponse = response.data;

        return apiResponse;
      } catch (error) {
        toast.error("Lỗi");
        throw error;
      }
    },
  });
};

const getQuizSetByIdQuery = (id: number) => {
  return useQuery({
    queryKey: ["quizSet", id],
    queryFn: async () => {
      const response = await quizSetApi.getQuizSetById(id.toString());
      return response;
    },
  });
};

const getQuizSetWithQuestionsForPlayQuery = (id: number) => {
  return useQuery({
    queryKey: ["quizSetWithQuestionsForPlay", id],
    queryFn: async () => {
      const response = await quizSetApi.getQuizSetWithQuestionsForPlay(id);
      return response;
    },
  });
};

const submitQuizQuestionQuery = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: QuizQuestionCheck }) => {
      const response = await quizSetApi.submitQuizQuestion(id, data);
      return response;
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};

const approveQuizSetQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await quizSetApi.approveQuizSet(id);
      return response;
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["quizSet"] });
      queryClient.invalidateQueries({ queryKey: ["quizSet", id] });
    },
  });
};

const rejectQuizSetQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: { reject_reason: string } }) => {
      const response = await quizSetApi.rejectQuizSet(id, data);
      return response;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["quizSet"] });
      queryClient.invalidateQueries({ queryKey: ["quizSet", variables.id] });
    },
  });
};

const inactivePublishQuizSetQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: { reject_reason: string } }) => {
      const response = await quizSetApi.inactivePublishQuizSet(id, data);
      return response;
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["quizSet"] });
      queryClient.invalidateQueries({ queryKey: ["quizSet", id] });
    },
  });
};

const deleteQuizSetQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await quizSetApi.deleteQuizSet(id.toString());
      return response;
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["quizSet"] });
      queryClient.invalidateQueries({ queryKey: ["quizSet", id] });
    },
  });
};

const publishQuizSetQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await quizSetApi.publishQuizSet(id); 
      return response;
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["quizSet"] });
      queryClient.invalidateQueries({ queryKey: ["quizSet", id] });
    },
  });
};


const getQuizLeaderboardQuery = (id: number) => {
  return useQuery({
    queryKey: ["quizLeaderboard", id],
    queryFn: async () => {
      const response = await quizSetApi.getQuizLeaderboard(id);
      return response;
    },
  });
};

export const useQuizHook = {
  quizSetQuery,
  getQuizSetByIdQuery,
  getQuizSetWithQuestionsForPlayQuery,
  submitQuizQuestionQuery,
  approveQuizSetQuery,
  rejectQuizSetQuery,
  inactivePublishQuizSetQuery,
  publishQuizSetQuery,
  deleteQuizSetQuery,
  getQuizLeaderboardQuery,
};
