import { init, Models, RematchDispatch, RematchRootState } from "@rematch/core";
import selectPlugin from "@rematch/select";
import { commentsModel } from "@/Store/models/commentsModel";
import { eventModel } from "@/Store/models/eventModel";
import { guestStatusModel } from "@/Store/models/guestStatusModel";

export interface RootModel extends Models<RootModel> {
  commentsModel: typeof commentsModel;
  eventModel: typeof eventModel;
  guestStatusModel: typeof guestStatusModel;
}

export const models: RootModel = {
  commentsModel,
  eventModel,
  guestStatusModel,
};

export const store = init<RootModel>({
  plugins: [selectPlugin()],
  models,
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
