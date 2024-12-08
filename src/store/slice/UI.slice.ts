import { StateCreator } from "zustand";

interface UIState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  showFooter: boolean;
  setShowFooter: (showFooter: boolean) => void;
}

export const createUISlice: StateCreator<UIState> = (set) => ({
  loading: false,
  setLoading: (loading) => set((state) => ({ ...state, loading })),
  showFooter: false,
  setShowFooter: (showFooter) => set((state) => ({ ...state, showFooter })),
});
