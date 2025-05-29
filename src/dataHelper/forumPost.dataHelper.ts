import { User } from "./auth.dataHelper";
import { Topic } from "./topic.dataHelper";

export interface ForumPost {
    id: number;
    title: string;
    content: string;
    created_by: number;
    createdAt: string;
    updatedAt: string;
    status: ForumPostStatus;
    topics: Topic[]; 
    topic_id: number[];
    creator?: User;
}

export interface ForumPostResponse {
    data: ForumPost[];
    total: number;
    limit: number;
    page: number;
    totalPages: number;
}

export interface ForumPostCreateParams {
    id?: number;
    title: string;
    content: string;
    status: ForumPostStatus;
    topic_id: number[];
}

export enum ForumPostStatus {
    LOCAL = 'local',
    PENDING = 'pending',
    APPROVED = 'approved',
    INACTIVE = 'inactive',
    REJECTED = 'rejected',
    NEEDS_REVIEW = 'needs_review',
}

export interface ForumPostVersion {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface ForumPostReview {
    forumPost: ForumPost;
    version: ForumPostVersion;
}