export interface HistoryDocument{
    id: string;
    image: string;
    title: string;
    content: string;
    period_id: string;
    start_year: string;
    end_year: string;
    type_id: string;
    createdAt: string;
    updatedAt: string;
    uploaded_by: string;
    key_words: string;
}

export interface HistoryDocumentResponse{
    documents: HistoryDocument[];
    total: number;
}

export interface HistoryDocumentTitle{
    id: string;
    title: string;
    start_year: string;
    end_year: string;
    type_id: string;
    period_id: string;
    image: string;
}

export interface HistoryDocumentTitleResponse{
    documents: HistoryDocumentTitle[];
    total: number;
}

