import { USER_API_PREFIX } from "./../store/constants";
import { Event, User } from "./../store/types";

import type { RootModel } from "@/store";
import { addUserDisplayName, addUserRSVP, fetchApplePassDownload, getSMSCode, updateAvatarImage, verifySMSCode } from "@/store/api";
import { VERIFICATION_CODE_ERROR } from "@/store/constants";
import { createModel } from "@rematch/core";
import axios from "axios";

interface UserStateModel {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  avatarIndex: number;
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
    avatarIndex: 0,
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
    setAvatarIndex: (state: UserStateModel, avatarIndex: number) => ({ ...state, avatarIndex }),
    setIsLoading: (state: UserStateModel, isLoading: boolean) => ({ ...state, isLoading }),
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
    cycleAvatar: (state: UserStateModel, direction: number) => {
      const newIndex = (state.avatarIndex + direction + 11) % 11;
      return { ...state, avatarIndex: newIndex };
    },
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
      avatarIndex: 0,
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
    selectAvatarIndex: () => slice((state: UserStateModel): number => state?.avatarIndex),
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
      this.setIsLoading(true);
      try {
        const res = await getSMSCode(to);

        this.setIsLoading(false);
      } catch (error) {
        console.log(error, "error");
        this.setIsLoading(false);
      }
    },
    async verifyCode([to, code]: [string, string]) {
      this.setIsLoading(true);
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
            this.setIsUserDrawerOpen(false);
            this.setIsMissingDisplayName(true);
          }
        } else if (typeof res.data === "string" && res.data === VERIFICATION_CODE_ERROR) {
          this.setError(VERIFICATION_CODE_ERROR);
          this.setInputValue("");
          setTimeout(() => {
            this.setError(null);
          }, 3000);
        }
        this.setIsLoading(false);
      } catch (error) {
        console.log(error);
        this.setIsLoading(false);
        this.setInputValue("");
        this.setIsVerifying(false);
      }
    },
    async addRSVP([userId, eventId, eventName]: [userId: number, eventId: number, eventName: string]) {
      this.setIsLoading(true);
      try {
        const rsvp = await addUserRSVP({
          userId,
          eventId: eventId,
          status: "attending",
        });
        if (rsvp.data) {
          await dispatch.eventModel.getEventByName(eventName);
          await this.updateUserDataById(userId);
          this.setIsLoading(false);
          this.closeAndReset();
        }
      } catch (error: any) {
        this.setError(error.message || "Failed to add RSVP");
      }
    },
    async addDisplayName([id, firstName, lastName]: [number, string, string]) {
      this.setIsLoading(true);
      try {
        const user = await addUserDisplayName({
          userId: id,
          displayName: `${firstName} ${lastName}`,
        });
        this.setUser(user.data);
        this.isMissingDisplayName(false);
        this.closeAndReset();
      } catch {
        await this.updateUserDataById(id);
        this.closeAndReset();
        this.setError("Failed to add display name");
        this.setIsLoading(false);
      }
    },
    async updateUserDataById(id: number) {
      this.setIsLoading(true);
      try {
        const user = await axios.get(USER_API_PREFIX + `/id/${id}`);
        this.setIsUserDrawerOpen(false);
        this.setUser(user.data);
      } catch (error: any) {
        this.closeAndReset();
        this.setError(error.message || "Failed to update user data");
        this.setIsLoading(false);
      }
    },
    async updateUserAvatarImage({ id, avatarImage }: { id: number; avatarImage: string }) {
      this.setIsLoading(true);
      try {
        const user = await updateAvatarImage({ id, avatarImage });
        this.setUser(user.data);
        this.setIsLoading(false);
      } catch (error: any) {
        this.setError(error.message || "Failed to update avatar image");
        this.setIsLoading(false);
      }
    },
    async fetchApplePass({ eventId, displayName }: { eventId: number; displayName: string }) {
      this.setIsLoading(true);
      try {
        const res = await fetchApplePassDownload({ eventId, displayName });
        if (res) {
          window.open(res);
        }
        this.setIsLoading(false);
      } catch (error: any) {
        this.setError(error.message || "Failed to fetch Apple Pass");
        this.setIsLoading(false);
      }
    },
  }),
});
