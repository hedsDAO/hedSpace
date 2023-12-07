import { createModel } from "@rematch/core";
import { getSMSCode, verifySMSCode } from "@/Api/user";
import type { RootModel } from "@/Store/index";
import { Event } from "../types";

interface UserState {
  error: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  didSendSMS: boolean;
  user?: any;
}

export const userModel = createModel<RootModel>()({
  state: {
    error: null,
    isLoading: false,
    isLoggedIn: false,
    didSendSMS: false,
    user: undefined,
  } as UserState,
  reducers: {
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setError: (state, error: string) => ({ ...state, error }),
    setDidSendSMS: (state, didSendSMS: boolean) => ({
        ...state,
        didSendSMS,
        }),
    setUser: (state, user) => {
      return { ...state, user };
    },
  },
  selectors: (slice) => ({
    error: () => slice((state) => state.error),
    isLoading: () => slice((state) => state.isLoading),
    didSendSMS: () => slice((state) => state.didSendSMS),
    isLoggedIn: () => slice((state) => (state.user ? true : false)),
    user: () => slice((state) => state.user),
  }),
  effects: (dispatch) => ({
    async loginUser(to: string) {
      this.setIsLoading(true);
      try {
        const response = await getSMSCode(to);
        console.log(response)
        this.setDidSendSMS(true);
        // this.setUser(response.data);
      } catch (error: any) {
        this.setError(error.message || "Failed to login user");
      } finally {
        this.setIsLoading(false);
      }
    },
    async verifyUser({
      to,
      code,
      name,
    }: {
      to: string;
      code: string;
      name: string;
    }) {
      this.setIsLoading(true);
      try {
        const response = await verifySMSCode(to, code, name);
        this.setUser(response.data);
        this.setDidSendSMS(false);
        this.isLoggedIn(true);
      } catch (error: any) {
        this.setError(error.message || "Failed to verify user");
      } finally {
        this.setIsLoading(false);
      }
    },
    async getUser() {
      this.setIsLoading(true);
      try {
        // const response = await getUser();
        // this.setUser(response.data);
      } catch (error: any) {
        this.setError(error.message || "Failed to get user");
      } finally {
        this.setIsLoading(false);
      }
    },
  }),
});
