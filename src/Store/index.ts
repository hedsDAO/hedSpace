import { init, Models, RematchDispatch, RematchRootState } from "@rematch/core";
import selectPlugin from "@rematch/select";
import { commentsModel } from "@/Store/models/commentsModel";
import { eventModel } from "@/Store/models/eventModel";
import { guestStatusModel } from "@/Store/models/guestStatusModel";
import { userModel } from "@/Store/models/userModel";

export interface RootModel extends Models<RootModel> {
  commentsModel: typeof commentsModel;
  eventModel: typeof eventModel;
  guestStatusModel: typeof guestStatusModel;
  userModel: typeof userModel;
}

export const models: RootModel = {
  commentsModel,
  eventModel,
  guestStatusModel,
  userModel,
};

export const store = init<RootModel>({
  plugins: [selectPlugin()],
  models,
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
