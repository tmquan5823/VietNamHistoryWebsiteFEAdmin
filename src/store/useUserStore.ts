import { removeAccessToken, setAccessToken } from "../utils/storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "@/dataHelper/auth.dataHelper";
interface UserStore {
  isAuthenticated: boolean;
  user: User | undefined;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useUserStore = create<
  UserStore,
  [["zustand/persist", unknown]]
>(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: undefined,
      login(token: string, user: User) {
        setAccessToken(token);
        set(() => ({
          isAuthenticated: true,
          user,
        }));
      },
      logout() {
        removeAccessToken();
        set(() => ({
          isAuthenticated: false,
          user: undefined,
        }));
      },
    }),
    { name: "user", storage: createJSONStorage(() => localStorage) }
  )
);
