import { createModel } from "@rematch/core";
import {
  addUserDisplayName,
  addUserRSVP,
  getSMSCode,
  verifySMSCode,
} from "@/Api/user";
import type { RootModel } from "@/Store/index";
import { Event } from "../types";

export interface UserState {
  error: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  didSendSMS: boolean;
  hasDisplayName: boolean;
  user?: any;
  _persistedAt?: number;
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
    setIsLoggedIn: (state, isLoggedIn: boolean) => ({ ...state, isLoggedIn }),
    setHasDisplayName: (state, hasDisplayName: boolean) => ({
      ...state,
      hasDisplayName,
    }),
    setDidSendSMS: (state, didSendSMS: boolean) => ({
      ...state,
      didSendSMS,
    }),
    setUser: (state, user) => {
      return { ...state, user };
    },
    setUserDisplayName: (state, displayName: string) => {
      return { ...state, user: { ...state.user, displayName } };
    },
  },
  selectors: (slice) => ({
    error: () => slice((state) => state.error),
    isLoading: () => slice((state) => state.isLoading),
    didSendSMS: () => slice((state) => state.didSendSMS),
    isLoggedIn: () => slice((state) => (state.user ? true : false)),
    hasDisplayName: () => slice((state) => state.user.displayName),
    user: () => slice((state) => state.user),
  }),
  effects: (dispatch) => ({
    async loginUser(to: string) {
      this.setError(null);
      this.setIsLoading(true);
      try {
        this.setDidSendSMS(true);
        await getSMSCode(to);
        // this.setDidSendSMS(true);
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
      close,
    }: {
      to: string;
      code: string;
      name: string;
      close: () => void;
    }) {
      this.setIsLoading(true);
      this.setError(null);
      try {
        const response = await verifySMSCode(to, code, name);
        this.setUser(response.data);
        this.setDidSendSMS(false);
        this.setIsLoggedIn(true);
        if (response.data.displayName) {
          this.setHasDisplayName(true);
          close();
          if (response.data) this.addRSVP(response.data.id);
        } else {
          this.setHasDisplayName(false);
        }
      } catch (error: any) {
        this.setError(error.message || "Failed to verify user");
      } finally {
        this.setIsLoading(false);
      }
    },
    async addRSVP(userId: number) {
      this.setIsLoading(true);
      try {
        await addUserRSVP({
          userId,
          eventId: 3,
          status: "attending",
        });
        // this.setUser(response.data);
      } catch (error: any) {
        this.setError(error.message || "Failed to add RSVP");
      } finally {
        this.setIsLoading(false);
      }
    },
    async sendConfirmationSMS() {
      this.setIsLoading(true);
      try {
        await sendSMSToUser();
      } catch (error: any) {
        this.setError(error.message || "Failed to send SMS to user")
      }
    },
    async addDisplayName({
      displayName,
      userId,
    }: {
      displayName: string;
      userId: number;
    }) {
      this.setIsLoading(true);
      try {
        await addUserDisplayName({ userId, displayName });
        this.setUserDisplayName(displayName);
        this.addRSVP(userId);
      } catch (error: any) {
        this.setError(error.message || "Failed to add RSVP");
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
