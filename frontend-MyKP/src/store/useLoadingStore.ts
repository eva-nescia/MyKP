import { create } from "zustand";

interface LoadingState {
  loading: boolean;
  activeRequests: number;
  showLoading: () => void;
  hideLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  loading: false,
  activeRequests: 0,

  showLoading: () =>
    set((state) => ({
      activeRequests: state.activeRequests + 1,
      loading: true,
    })),

  hideLoading: () =>
    set((state) => {
      const activeRequests = Math.max(
        state.activeRequests - 1,
        0
      );

      return {
        activeRequests,
        loading: activeRequests > 0,
      };
    }),
}));
