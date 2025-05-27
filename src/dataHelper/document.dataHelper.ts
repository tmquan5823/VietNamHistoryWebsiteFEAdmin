export interface Document {
    id: number;
    title: string;
    content: string;
    type_id: number;
    period_id: number;
    start_year: number;
    end_year: number;
    image: string;
}

export interface Period {
    id: number;
    name: string;
    description: string;
    start_year: number;
    end_year: number;
}

export interface DocumentResponse {
    documents: Document[];
    total: number;
}

export interface GetDocumentsParams {
    typeId?: number;
    periodId?: number;
    startYear?: number;
    endYear?: number;
    sort?: string;
    page?: number;
    limit?: number;
}

export interface QueryParams {
    typeId?: number;
    periodId?: number;
    startYear?: number;
    endYear?: number;
    keyWords?: string;
    sort?: string;
    page?: number;
    limit?: number;
}

export interface DocumentTitle {
    id: number;
    title: string;
    type_id: number;
    period_id: number;
    start_year: number;
    end_year: number;
    image: string;
}
export interface DocumentTitleResponse {
    documents: DocumentTitle[];
    total: number;
}

export interface DocumentType {
    id: number;
    name: string;
}

