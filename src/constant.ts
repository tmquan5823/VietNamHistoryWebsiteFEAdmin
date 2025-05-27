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

export const enum ROLE {
  ADMIN = "admin",
}

export const enum ROLE_ID {
  SUPER_USER = 5,
}

export const enum CSV_ORDER_ROW {
  ShipVisitID = 0,
  GroupName = 1,
  HEADER = 2,
  ShipVisitIDTxt = `訪船ID
未入力の場合、新規訪船として扱われます。
更新・削除の場合は、テンプレートをダウンロードして下さい`,
  GroupNameTxt = `*訪船団体名`,
}

export const enum SCREEN_ID {
  ADMIN_DASHBOARD = 1,
  A_02_00 = 2,
  A_05_00 = 5,
  A_07_00 = 7,
  A_06_00 = 9,
  A_08_00 = 10,
}

export const MAX_FILE_SIZE = 1024 * 1024; // 1MB
export const ALLOWED_TYPES = ["text/csv"];

export const MAX_LENGTH_INPUT = 255;

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