import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAdmin: Cookies.get("isAdmin") === "true",
  setIsAdmin: (isAdmin) => {
    Cookies.set("isAdmin", String(isAdmin));
    set({ isAdmin });
  },
}));

export default useAuthStore;
