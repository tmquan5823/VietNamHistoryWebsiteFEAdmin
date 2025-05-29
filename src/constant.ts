export const enum ROUTERS {
  // LOGIN = "login",
  // INITIAL_PWD = "initial_password",
  // INITIAL_PWD_SUCCESS = "initial_password_success",

  DEFAULT = "/",
  LOGIN = "/login",
  HOME = "/home",
  DASHBOARD = "/dashboard",
  HISTORY_DOCUMENTS = "/history-documents",
  CREATE_HISTORY_DOCUMENT = "/create-history-document",
  UPDATE_HISTORY_DOCUMENT = "/update-history-document/:id",

  FORUM = "/forum",
  FORUM_POST_DETAIL = "/forum/:id",
  FORUM_POST_REVIEW = "/forum/review",

  HISTORY_DOCUMENT_DETAIL = "/history-document/:id",

  QUIZ = "/quiz",
  QUIZ_DETAIL = "/quiz/:id",

  USERS = "/users",
  
  NOTIFICATION = "/notification",

  BLANK_PAGE = "admin/blank_page",
  UNAUTHORIZED = "admin/403_unauthorized",
}

export const enum STORAGE_VAR {
  ACCESS_TOKEN = "access_token",
}

export const regexPassword =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const regexUsername = /^[a-zA-Z0-9_]+$/;

export const statusMap: Record<string, string> = {
  approved: "Đã duyệt",
  publish: "Đã công khai",
  unpublish: "Chưa công khai",
  pending: "Chờ duyệt",
  inactive: "Vô hiệu hóa",
};

export const statusMapForum: Record<string, string> = {
  approved: "Đã duyệt",
  pending: "Chờ duyệt",
  rejected: "Đã từ chối",
  inactive: "Đã tắt",
  local: "Bản nháp",
  needs_review: "Cần kiểm duyệt",
};

export const POSTS_PER_PAGE = 10;
