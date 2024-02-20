import { User } from "./../store/types";

import type { RootModel } from "@/store";
import { createModel } from "@rematch/core";

interface UserStateModel {
  user: User | null;
}

export const userModel = createModel<RootModel>()({
  state: {
    user: null,
  } as UserStateModel,
  reducers: {
    setUser: (state: UserStateModel, user: User) => ({ ...state, user }),
    clearState: () => ({ user: null }),
  },
  selectors: (slice) => ({
    selectUser: () => slice((state: UserStateModel): User | null => state?.user),
  }),
  effects: () => ({}),
});
