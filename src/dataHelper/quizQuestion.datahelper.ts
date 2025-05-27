export interface QuizQuestion {
    id: number;
    question: string;
    question_type: string;
    options: string;
    correct_answers: string;
    expected_answer: string;
    min_value: number;
    max_value: number;
    time_limit_seconds: number;
    max_score: number;
    number: number;
    action: string;
    funfact: string;
    info: string;
    image_url: string;
}

export interface QuizQuestionParams {
    id?: number;
    question: string;
    question_type: string;
    options: string;
    correct_answers?: string;
    min_value: number;
    max_value: number;
    time_limit_seconds: number;
    max_score: number;
    number: number;
    action: string;
    funfact?: string;
    info: string;
    image_url: string;
    image_public_id?: string;
}

export interface QuizQuestionPlay {
    id?: number;
    question: string;
    question_type: string;
    options: string;
    min_value: number;
    max_value: number;
    time_limit_seconds: number;
    max_score: number;
    number: number;
    info: string;
    image_url: string;
    image_public_id?: string;
}

export interface QuizQuestionCheck {
    number: number;
    answer: string[];
    score: number;
    time_taken?: number;
    is_multi_answer?: boolean;
    is_end_time?: boolean;
}

export interface QuizQuestionChecked {
    is_correct: boolean;
    score: number;
    funfact: string;
    correct_answer: string[];
}

