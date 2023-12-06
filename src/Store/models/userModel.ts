import { createModel } from "@rematch/core";
// import { loginUser, getUser } from "@/Api/user";
import type { RootModel } from "@/Store/index";
import { Event } from "../types";

interface UserState {
  error: string | null;
  isLoading: boolean;
  user?: any;
}

export const userModel = createModel<RootModel>()({
  state: {
    error: null,
    isLoading: false,
    user: undefined,
  } as UserState,
  reducers: {
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setError: (state, error: string) => ({ ...state, error }),
    setUser: (state, user) => {
      return { ...state, user };
    },
  },
  selectors: (slice) => ({
    error: () => slice((state) => state.error),
    isLoading: () => slice((state) => state.isLoading),
    isLoggedIn: () => slice((state) => (state.user ? true : false)),
    user: () => slice((state) => state.user),
  }),
  effects: (dispatch) => ({
    async loginUser() {
      this.setIsLoading(true);
      try {
        // const response = await loginUser();
        // this.setUser(response.data);
      } catch (error: any) {
        this.setError(error.message || "Failed to login user");
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
