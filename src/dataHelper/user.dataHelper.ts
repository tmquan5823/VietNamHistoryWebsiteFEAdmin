export interface User {
  id: number;
  email: string;
  password: string;
  role: string;
  fullname: string;
  avatar: string;
  gender: string;
  birthday: string | null;
  isBanned: boolean;
  createdAt: string | null;
}

export interface UserResponse {
  users: User[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface UserApiResponse {
  status: string;
  message: string;
  data: UserResponse;
}
    
export interface UserParams {
  fullname?: string;
  gender?: string;
  birthday?: string;
  role?: string;
  isBanned?: boolean;
}

export interface UserQueryParams {
  page?: number;
  pageSize?: number;
  fullname?: string;
  gender?: string;
  birthday?: string;
  role?: string;
  isBanned?: boolean;
  search?: string;
  sortBy?: string;
  status?: string;
}