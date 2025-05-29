import axiosClient from "./axiosClient";
import { ResponseData } from "@/utils/type";
import { ForumPost, ForumPostResponse } from "@/dataHelper/forumPost.dataHelper";

export const forumPostApi = {
    getForumPosts: (params: any): Promise<ResponseData<ForumPostResponse>> =>
      axiosClient.get("/forum-posts", { params }),
    getForumPostById: (id: number): Promise<ResponseData<ForumPost>> =>
      axiosClient.get(`/forum-posts/${id}`),
    approveForumPost: (id: number): Promise<ResponseData<ForumPost>> =>
      axiosClient.put(`/forum-posts/${id}/approve`),
    rejectForumPost: (id: number, reject_reason: string): Promise<ResponseData<ForumPost>> =>
      axiosClient.put(`/forum-posts/${id}/reject`, { reject_reason }),
    inactiveForumPost: (id: number, reject_reason: string): Promise<ResponseData<ForumPost>> =>
      axiosClient.put(`/forum-posts/${id}/inactive`, { reject_reason }),
    activeForumPost: (id: number): Promise<ResponseData<ForumPost>> =>
      axiosClient.put(`/forum-posts/${id}/active`),
  };
  