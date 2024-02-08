import type { RootModel } from "@/store";
import { createModel } from "@rematch/core";

interface GlobalModelState {
  isUnloading: boolean;
}

export const globalModel = createModel<RootModel>()({
  state: {
    isUnloading: false,
  } as GlobalModelState,
  reducers: {
    setIsUnloading: (state: GlobalModelState, isUnloading: boolean) => ({ ...state, isUnloading }),
    clearState: () => ({ isUnloading: false }),
  },
  selectors: (slice) => ({
    selectIsUnloading: () => slice((state: GlobalModelState): boolean => state?.isUnloading),
  }),
  effects: () => ({
    async handleUnload([isUnloading, callback]: [boolean, () => void]) {
      if (isUnloading) return;
      else {
        this.setIsUnloading(true);
        setTimeout(() => {
          this.setIsUnloading(false);
          callback();
        }, 1000);
      }
    },
  }),
});
