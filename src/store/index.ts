import { create } from "zustand";
import { createAuthSlice } from "./slice/auth.slice";
import { createUISlice } from "./slice/UI.slice";

export const useAuthState = create(createAuthSlice);

export const useUIState = create(createUISlice);
