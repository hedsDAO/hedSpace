import { AUTH_API_ENDPOINT } from "./../store/constants";
import type { RootModel } from "@/store";
import { addUserDisplayName, addUserRSVP, getSMSCode, verifySMSCode } from "@/store/api";
import { Event, EventRsvp } from "@/store/types";
import { createModel } from "@rematch/core";

interface RSVPModel {
  event: Event | null;
  hasVerifiedPhoneNumber: boolean;
  didSendSMS: boolean;
  user: any;
  error: string | null;
  verifiedPhoneNumber: string | null;
  hasDisplayName: boolean;
  firstName: string | null;
  lastName: string | null;
  rsvp: EventRsvp | null;
  isLoading: boolean;
  phoneNumber: string | null;
}

export const rsvpModel = createModel<RootModel>()({
  state: {
    hasVerifiedPhoneNumber: false,
    didSendSMS: false,
    user: null,
    error: null,
    hasDisplayName: false,
    rsvp: null,
    isLoading: false,
    verifiedPhoneNumber: null,
    event: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
  } as RSVPModel,
  reducers: {
    setIsUnloading: (state: RSVPModel, hasVerifiedPhoneNumber: boolean) => ({ ...state, hasVerifiedPhoneNumber }),
    setEvent: (state: RSVPModel, event: Event | null) => ({ ...state, event }),
    setFirstName: (state: RSVPModel, firstName: string | null) => ({ ...state, firstName }),
    setLastName: (state: RSVPModel, lastName: string | null) => ({ ...state, lastName }),
    setDidSendSMS: (state: RSVPModel, didSendSMS: boolean) => ({ ...state, didSendSMS }),
    setUser: (state: RSVPModel, user: any) => ({ ...state, user }),
    setRsvp: (state: RSVPModel, rsvp: EventRsvp | null) => ({ ...state, rsvp }),
    setError: (state: RSVPModel, error: string | null) => ({ ...state, error }),
    setHasDisplayName: (state: RSVPModel, hasDisplayName: boolean) => ({ ...state, hasDisplayName }),
    setPhoneNumber: (state: RSVPModel, phoneNumber: string | null) => ({ ...state, phoneNumber }),
    setRSVP: (state: RSVPModel, rsvp: EventRsvp | null) => ({ ...state, rsvp }),
    setIsLoading: (state: RSVPModel, isLoading: boolean) => ({ ...state, isLoading }),
    setVerifiedPhoneNumber: (state: RSVPModel, verifiedPhoneNumber: string | null) => ({
      ...state,
      verifiedPhoneNumber,
    }),
    clearState: () => ({
      event: null,
      hasVerifiedPhoneNumber: false,
      didSendSMS: false,
      user: null,
      error: null,
      hasDisplayName: false,
      rsvp: null,
      isLoading: false,
      verifiedPhoneNumber: null,
      firstName: null,
      lastName: null,
      phoneNumber: null,
    }),
  },
  selectors: (slice) => ({
    selectHasVerifiedPhoneNumber: () => slice((state: RSVPModel): boolean => state?.hasVerifiedPhoneNumber),
    selectDidSendSMS: () => slice((state: RSVPModel): boolean => state?.didSendSMS),
    selectUser: () => slice((state: RSVPModel): any => state?.user),
    selectEvent: () => slice((state: RSVPModel): Event | null => state?.event),
    selectFirstName: () => slice((state: RSVPModel): string | null => state?.firstName),
    selectLastName: () => slice((state: RSVPModel): string | null => state?.lastName),
    selectError: () => slice((state: RSVPModel): string | null => state?.error),
    selectPhoneNumber: () => slice((state: RSVPModel): string | null => state?.phoneNumber),
    selectHasDisplayName: () => slice((state: RSVPModel): boolean => state?.hasDisplayName),
    selectRSVP: () => slice((state: RSVPModel): EventRsvp | null => state?.rsvp),
    selectIsLoading: () => slice((state: RSVPModel): boolean => state?.isLoading),
    selectVerifiedPhoneNumber: () => slice((state: RSVPModel): string | null => state?.verifiedPhoneNumber),
  }),
  effects: () => ({
    async loginUser(to: string) {
      this.setError(null);
      this.setIsLoading(true);
      try {
        const verifiedPhoneNumber = `+1${to}`;
        this.setDidSendSMS(true);
        this.setVerifiedPhoneNumber(verifiedPhoneNumber);
        await getSMSCode(verifiedPhoneNumber);
      } catch (error: any) {
        this.setError(error.message || "Failed to login user");
      } finally {
        this.setIsLoading(false);
      }
    },
    async verifyUser({ to, code, eventId }: { to: string; code: string; eventId: number }) {
      this.setIsLoading(true);
      this.setError(null);
      this.setPhoneNumber(to);
      try {
        const response = await verifySMSCode(to, code);
        this.setUser(response.data);
        this.setDidSendSMS(false);
        if (response.data.displayName) {
          this.setHasDisplayName(true);
          // close();
          if (response.data) this.addRSVP([response.data.id, eventId]);
          this.setIsLoading(false)
        } else {
          this.setHasDisplayName(false);
          this.setIsLoading(false)
        }
      } catch (error: any) {
        this.setError(error.message || "Failed to verify user");
      } finally {
        this.setIsLoading(false);
      }
    },
    async addDisplayNameToUser({ id, firstName, lastName, eventId }: { id: any; firstName: string; lastName: string, eventId: number }) {
      this.setIsLoading(true);
      try {
        const user = await addUserDisplayName({
          userId: id,
          displayName: `${firstName} ${lastName}`,
        });
        this.setUser(user.data);
        this.setHasDisplayName(true);
        this.setIsLoading(false);
        this.addRSVP([id, eventId]);
      } catch {
        this.setError("Failed to add display name");
      }
    },
    async addRSVP([userId, eventId]: [userId: number, eventId: number]) {
      this.setIsLoading(true);
      try {
        const rsvp = await addUserRSVP({
          userId,
          eventId: eventId,
          status: "attending",
        });
        this.setRsvp(rsvp.data);
      } catch (error: any) {
        this.setError(error.message || "Failed to add RSVP");
      } finally {
        this.setIsLoading(false);
      }
    },
  }),
});
