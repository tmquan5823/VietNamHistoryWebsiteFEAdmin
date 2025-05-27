import { Topic } from "./topic.dataHelper";
import { QuizQuestion, QuizQuestionParams, QuizQuestionPlay } from "./quizQuestion.datahelper";

export interface QuizSet {
    id: number;
    image: string;
    title: string;
    description: string;
    status: string;
    topics?: Topic[];
    topic_ids?: number[];
    createdAt: string;
    reject_reason?: string;
    updatedAt?: string;
    questionCount?: number;
    playerCount?: number;
    creator?: {
        id: number;
        fullname: string;
        email: string;
        avatar: string;
    };
}

export interface AppprovedQuizSetResponse {
    original: QuizSet;
    published: QuizSet;
}

export interface QuizSetResponse {
    data: QuizSet[];
    total: number;
    limit: number;
    page: number;
}

export interface QuizSetParams {
    topic_id?: number;
    page?: number;
    limit?: number;
    search?: string;
    sort_by?: string;
    sort_order?: string;
    status?: string;
}

export interface QuizSetWithQuestions extends QuizSet {
    questions: QuizQuestion[];
}

export interface QuizSetWithQuestionsParams {
    id?: number;
    image: string;
    title: string;
    description: string;
    topic_ids: number[];
    status: "unpublish" | "publish" | "pending" | "approved";
    updatedAt?: string;
    image_public_id?: string;
    questions: QuizQuestionParams[];
}

export interface QuizSetWithQuestions {
    quizSet: QuizSet;
    questions: QuizQuestion[];
}

export interface QuizSetForPlayResponse {
    data: QuizSetForPlay[];
    total: number;
    limit: number;
    page: number;
}

export interface QuizSetForPlay {
    id: number;
    image: string;
    title: string;
    description: string;
    topics: Topic[];
    createdAt: string;
    questionCount: number;
    creator: {
        id: number;
        fullname: string;
        email: string;
        avatar: string;
    };
    questions: QuizQuestionPlay[];
    playerCount?: number;
}

export interface QuizResults {
    quizResults: QuizResult[];
    leaderboard: Leaderboard;
}

// Interface cho từng kết quả câu hỏi
export interface QuizResult {
    id: number;
    user_id: number;
    quiz_set_id: number;
    question_id: number;
    user_answer: string;
    is_correct: boolean;
    score: number;
    time_taken: number | null;
    submitted_at: string;
    question: {
        number: number;
    };
    number: number;
}

// Interface cho leaderboard
export interface Leaderboard {
    id: number;
    quiz_id: number;
    user_id: number;
    score: number;
    is_finished: boolean;
    finished_at: string;
    ranking: number;
}

// Interface tổng hợp kết quả trả về
export interface QuizResultsResponse {
    status: string;
    message: string;
    data: {
        quizResults: QuizResult[];
        leaderboard: Leaderboard;
    };
}


export interface QuizLeaderboardEntry {
    id: number;
    quiz_id: number;
    user_id: number;
    score: number;
    is_finished: boolean;
    finished_at: string; 
    user: LeaderboardUser;
}

export interface LeaderboardUser {
    fullname: string;
    email: string;
    avatar: string;
  }