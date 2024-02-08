import { Models } from "@rematch/core";
import { globalModel } from "@/models/global";
import { landingModel } from "@/models/landing";

export interface RootModel extends Models<RootModel> {
  globalModel: typeof globalModel;
  landingModel: typeof landingModel;
}
export const models: RootModel = {
  globalModel,
  landingModel,
};
