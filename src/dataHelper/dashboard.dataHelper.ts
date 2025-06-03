export interface DashboardData {
    userCount: number;
    documentCountsByType: DocumentCount[];
    approvedForumPostCount: number;
    publishedQuizSetCount: number;
    userCreatedByMonth: UserCreatedByMonth[];
}

export interface DocumentCount {
    type_id: number;
    type_name: string;
    count: number;
}

export interface UserCreatedByMonth {
    year: number;
    month: number;
    count: number;
}
