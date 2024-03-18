import { User } from "./../store/types";

import type { RootModel } from "@/store";
import { getSMSCode, verifySMSCode } from "@/store/api";
import { VERIFICATION_CODE_ERROR } from "@/store/constants";
import { createModel } from "@rematch/core";
import { AxiosError } from "axios";

interface UserStateModel {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  phoneNumber: string[];
  isVerifying: boolean;
  verificationCode: string[];
  maxPhoneNumberLength: number;
  maxVerificationCodeLength: number;
  isUserDrawerOpen: boolean;
  inputValue: string;
}

export const userModel = createModel<RootModel>()({
  state: {
    user: null,
    isLoading: false,
    error: null,
    phoneNumber: ["", "", "", "", "", "", "", "", "", ""],
    isVerifying: false,
    verificationCode: ["", "", "", "", "", ""],
    maxPhoneNumberLength: 10,
    maxVerificationCodeLength: 6,
    isUserDrawerOpen: false,
    inputValue: "",
  } as UserStateModel,
  reducers: {
    setUser: (state: UserStateModel, user: User) => ({ ...state, user }),
    setLoading: (state: UserStateModel, isLoading: boolean) => ({ ...state, isLoading }),
    setError: (state: UserStateModel, error: string | null) => ({ ...state, error }),
    setPhoneNumber: (state: UserStateModel, phoneNumber: string[]) => ({ ...state, phoneNumber }),
    setIsVerifying: (state: UserStateModel, isVerifying: boolean) => ({ ...state, isVerifying }),
    setVerificationCode: (state: UserStateModel, verificationCode: string[]) => ({ ...state, verificationCode }),
    setIsUserDrawerOpen: (state: UserStateModel, isUserDrawerOpen: boolean) => ({ ...state, isUserDrawerOpen }),
    setInputValue: (state: UserStateModel, inputValue: string) => ({ ...state, inputValue }),
    logout: (state: UserStateModel) => ({ ...state, user: null }),
    closeAndReset: (state: UserStateModel) => ({
      ...state,
      isLoading: false,
      error: null,
      phoneNumber: ["", "", "", "", "", "", "", "", "", ""],
      isVerifying: false,
      verificationCode: ["", "", "", "", "", ""],
      maxPhoneNumberLength: 10,
      maxVerificationCodeLength: 6,
      isUserDrawerOpen: false,
      inputValue: "",
    }),
    clearState: () => ({
      user: null,
      isLoading: false,
      error: null,
      phoneNumber: ["", "", "", "", "", "", "", "", "", ""],
      isVerifying: false,
      verificationCode: ["", "", "", "", "", ""],
      maxPhoneNumberLength: 10,
      maxVerificationCodeLength: 6,
      isUserDrawerOpen: false,
      inputValue: "",
    }),
  },
  selectors: (slice) => ({
    selectInputValue: () => slice((state: UserStateModel): string => state?.inputValue),
    selectUser: () => slice((state: UserStateModel): User | null => state?.user),
    selectIsLoading: () => slice((state: UserStateModel): boolean => state?.isLoading),
    selectError: () => slice((state: UserStateModel): string | null => state?.error),
    selectPhoneNumber: () => slice((state: UserStateModel): string[] => state?.phoneNumber),
    selectIsVerifying: () => slice((state: UserStateModel): boolean => state?.isVerifying),
    selectVerificationCode: () => slice((state: UserStateModel): string[] => state?.verificationCode),
    selectMaxPhoneNumberLength: () => slice((state: UserStateModel): number => state?.maxPhoneNumberLength),
    selectMaxVerificationCodeLength: () => slice((state: UserStateModel): number => state?.maxVerificationCodeLength),
    selectIsUserDrawerOpen: () => slice((state: UserStateModel): boolean => state?.isUserDrawerOpen),
  }),
  effects: () => ({
    async sendVerificationCode(to: string) {
      try {
        const res = await getSMSCode(to);
        console.log(res, "res");
      } catch (error) {
        console.log(error, "error");
      }
    },
    async verifyCode([to, code]: [string, string]) {
      this.setIsVerifying(true);
      try {
        console.log(to, code);
        const res = await verifySMSCode(to, code);
        if (res.data?.id) {
          this.setUser(res.data);
          this.closeAndReset();
        } else if (typeof res.data === "string" && res.data === VERIFICATION_CODE_ERROR) {
          this.setError(VERIFICATION_CODE_ERROR);
          this.setInputValue("");
          setTimeout(() => {
            this.setError(null);
          }, 3000);
        }
      } catch (error) {
        console.log(error);
        this.setIsVerifying(false);
      }
    },
  }),
});
