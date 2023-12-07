import { init, Models, RematchDispatch, RematchRootState } from "@rematch/core";
import persistPlugin from "@rematch/persist";
import storage from "redux-persist/lib/storage";
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

/** Local Storage Persist for Audio Model */
const persistConfig = {
  key: "root",
  storage,
  version: 2,
  whitelist: ["userModel"],
  // transforms: [],
};

export const store = init<RootModel>({
  redux: {
    devtoolOptions: {
      disabled: true,
    },
  },
  plugins: [selectPlugin(), persistPlugin(persistConfig)],
  models,
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
