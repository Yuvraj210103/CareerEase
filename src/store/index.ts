import { create } from "zustand";
import { createAuthSlice } from "./slice/auth.slice";

export const useAuthState = create(createAuthSlice);
