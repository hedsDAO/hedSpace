import { Models } from "@rematch/core";
import { globalModel } from "@/models/global";
import { landingModel } from "@/models/landing";
import { rsvpModel } from "@/models/rsvp";
import { eventModel } from "@/models/event";
import { userModel } from "@/models/user";

export interface RootModel extends Models<RootModel> {
  globalModel: typeof globalModel;
  landingModel: typeof landingModel;
  rsvpModel: typeof rsvpModel;
  eventModel: typeof eventModel;
  userModel: typeof userModel;
}
export const models: RootModel = {
  globalModel,
  landingModel,
  rsvpModel,
  eventModel,
  userModel,
};
