import { User } from "./../store/types";

import type { RootModel } from "@/store";
import { createModel } from "@rematch/core";

interface UserStateModel {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  phoneNumber: string | null;
  isVerifying: boolean;
  verificationCode: string | null;
}

export const userModel = createModel<RootModel>()({
  state: {
    user: null,
    isLoading: false,
    error: null,
    phoneNumber: null,
    isVerifying: false,
    verificationCode: null,
  } as UserStateModel,
  reducers: {
    setUser: (state: UserStateModel, user: User) => ({ ...state, user }),
    setLoading: (state: UserStateModel, isLoading: boolean) => ({ ...state, isLoading }),
    setError: (state: UserStateModel, error: string | null) => ({ ...state, error }),
    setPhoneNumber: (state: UserStateModel, phoneNumber: string) => ({ ...state, phoneNumber }),
    setIsVerifying: (state: UserStateModel, isVerifying: boolean) => ({ ...state, isVerifying }),
    setVerificationCode: (state: UserStateModel, verificationCode: string) => ({ ...state, verificationCode }),
    clearState: () => ({
      user: null,
      isLoading: false,
      error: null,
      phoneNumber: null,
      isVerifying: false,
      verificationCode: null,
    }),
  },
  selectors: (slice) => ({
    selectUser: () => slice((state: UserStateModel): User | null => state?.user),
    selectIsLoading: () => slice((state: UserStateModel): boolean => state?.isLoading),
    selectError: () => slice((state: UserStateModel): string | null => state?.error),
    selectPhoneNumber: () => slice((state: UserStateModel): string | null => state?.phoneNumber),
    selectIsVerifying: () => slice((state: UserStateModel): boolean => state?.isVerifying),
    selectVerificationCode: () => slice((state: UserStateModel): string | null => state?.verificationCode),
  }),
  effects: () => ({}),
});
