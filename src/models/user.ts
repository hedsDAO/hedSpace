import { Event, User } from "./../store/types";

import type { RootModel } from "@/store";
import { addUserDisplayName, addUserRSVP, getSMSCode, verifySMSCode } from "@/store/api";
import { VERIFICATION_CODE_ERROR } from "@/store/constants";
import { createModel } from "@rematch/core";

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
  isMissingDisplayName: boolean;
  firstName: string;
  lastName: string;
  isRsvping: boolean;
  event: Event | null;
  isUserModelOpen: boolean;
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
    isMissingDisplayName: false,
    firstName: "",
    lastName: "",
    isRsvping: false,
    event: null,
    isUserModelOpen: false,
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
    setIsMissingDisplayName: (state: UserStateModel, isMissingDisplayName: boolean) => ({ ...state, isMissingDisplayName }),
    setFirstName: (state: UserStateModel, firstName: string) => ({ ...state, firstName }),
    setLastName: (state: UserStateModel, lastName: string) => ({ ...state, lastName }),
    setIsRsvping: (state: UserStateModel, isRsvping: any) => ({ ...state, isRsvping }),
    setEvent: (state: UserStateModel, event: Event) => ({ ...state, event }),
    setIsUserModalOpen: (state: UserStateModel, isUserModelOpen: boolean) => ({ ...state, isUserModelOpen }),
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
      isMissingDisplayName: false,
      firstName: "",
      lastName: "",
      isRsvping: false,
      event: null,
      isUserModelOpen: false,
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
      isMissingDisplayName: false,
      firstName: "",
      lastName: "",
      isRsvping: false,
      event: null,
      isUserModelOpen: false,
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
    selectIsMissingDisplayName: () => slice((state: UserStateModel): boolean => state?.isMissingDisplayName),
    selectFirstName: () => slice((state: UserStateModel): string => state?.firstName),
    selectLastName: () => slice((state: UserStateModel): string => state?.lastName),
    selectIsRsvping: () => slice((state: UserStateModel): boolean => state?.isRsvping),
    selectIsUserDrawerOpen: () => slice((state: UserStateModel): boolean => state?.isUserDrawerOpen),
    selectIsUserModalOpen: () => slice((state: UserStateModel): boolean => state?.isUserModelOpen),
    selectEvent: () => slice((state: UserStateModel): Event | null => state?.event),
  }),
  effects: (dispatch) => ({
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
          const userData: User = res.data;
          if (userData?.displayName?.length) {
            this.setUser(userData);
          } else {
            this.setUser(userData);
            this.setIsMissingDisplayName(true);
          }
        } else if (typeof res.data === "string" && res.data === VERIFICATION_CODE_ERROR) {
          this.setError(VERIFICATION_CODE_ERROR);
          this.setInputValue("");
          setTimeout(() => {
            this.setError(null);
          }, 3000);
        }
      } catch (error) {
        console.log(error);
        this.setInputValue("");
        this.setIsVerifying(false);
      }
    },
    async addDisplayName([id, firstName, lastName]: [number, string, string]) {
      try {
        const user = await addUserDisplayName({
          userId: id,
          displayName: `${firstName} ${lastName}`,
        });
        this.setUser(user.data);
        this.isMissingDisplayName(false);
      } catch {
        this.setError("Failed to add display name");
      }
    },
    async addRSVP([userId, eventId]: [userId: number, eventId: number]) {
      try {
        const rsvp = await addUserRSVP({
          userId,
          eventId: eventId,
          status: "attending",
        });
        if (rsvp.data) {
          dispatch.eventModel.getEventById(eventId.toString());
         this.closeAndReset();
        }
      } catch (error: any) {
        this.setError(error.message || "Failed to add RSVP");
      } finally {
      }
    },
  }),
});
