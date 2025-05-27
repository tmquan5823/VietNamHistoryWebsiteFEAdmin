import { ResponseData } from "@/utils/type"
import axiosClient from "./axiosClient"
import {AppprovedQuizSetResponse, QuizLeaderboardEntry, QuizSet, QuizSetForPlay, QuizSetParams, QuizSetResponse } from "@/dataHelper/quizSet.dataHelper"
import { QuizQuestionCheck, QuizQuestionChecked } from "@/dataHelper/quizQuestion.datahelper";

export const quizSetApi = {
    getQuizSets: (query: QuizSetParams): Promise<ResponseData<QuizSetResponse>> =>
        axiosClient.get("/quiz-sets", { params: query }),
    deleteQuizSet: (id: string): Promise<ResponseData<any>> =>
        axiosClient.delete(`/quiz-sets/${id}`),
    getQuizSetById: (id: string): Promise<ResponseData<QuizSetForPlay>> =>
        axiosClient.get(`/quiz-sets/${id}`),
    getQuizSetWithQuestionsForPlay: (id: number): Promise<ResponseData<QuizSetForPlay>> =>
        axiosClient.get(`/quiz-sets/quizSetWithQuestionsForPlay/${id}`),
    submitQuizQuestion: (id: number, data: QuizQuestionCheck): Promise<ResponseData<QuizQuestionChecked>> =>
        axiosClient.post(`/quiz-sets/${id}/questions/submit`, data),
    approveQuizSet: (id: number): Promise<ResponseData<AppprovedQuizSetResponse>> =>
        axiosClient.put(`/quiz-sets/${id}/approve`),
    rejectQuizSet: (id: number, data: {reject_reason: string}): Promise<ResponseData<QuizSet>> =>
        axiosClient.put(`/quiz-sets/${id}/reject`, data),
    inactivePublishQuizSet: (id: number, data: {reject_reason: string}): Promise<ResponseData<QuizSet>> =>
        axiosClient.put(`/quiz-sets/${id}/inactive`, data),
    publishQuizSet: (id: number): Promise<ResponseData<QuizSet>> =>
        axiosClient.put(`/quiz-sets/${id}/publish`),
    getQuizLeaderboard: (id: number): Promise<ResponseData<QuizLeaderboardEntry[]>> =>
        axiosClient.get(`/quiz-sets/${id}/leaderboard`),

}