import { useEffect } from "react";

import { useLoadingStore } from "@/store/useLoadingStore";

export function useGlobalLoading(loading: boolean) {
  const showLoading = useLoadingStore(
    (state) => state.showLoading
  );
  const hideLoading = useLoadingStore(
    (state) => state.hideLoading
  );

  useEffect(() => {
    if (!loading) return;

    showLoading();
    return hideLoading;
  }, [hideLoading, loading, showLoading]);
}
