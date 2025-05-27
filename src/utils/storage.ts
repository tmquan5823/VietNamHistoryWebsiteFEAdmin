import { STORAGE_VAR } from "../constant";

export const getAccessToken = () => {
  return localStorage.getItem(STORAGE_VAR.ACCESS_TOKEN);
};

export const setAccessToken = (token: string) => {
  localStorage.setItem(STORAGE_VAR.ACCESS_TOKEN, token);
};

export const removeAccessToken = () => {
  localStorage.removeItem(STORAGE_VAR.ACCESS_TOKEN);
};
