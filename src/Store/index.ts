import { init, Models, RematchDispatch, RematchRootState } from "@rematch/core";
import persistPlugin from "@rematch/persist";
import storage from "redux-persist/lib/storage";
import selectPlugin from "@rematch/select";
import { commentsModel } from "@/Store/models/commentsModel";
import { eventModel } from "@/Store/models/eventModel";
import { guestStatusModel } from "@/Store/models/guestStatusModel";
import { userModel, UserState } from "@/Store/models/userModel";
import createTransform from "redux-persist/lib/createTransform";
import { DAY_IN_MILLISECONDS } from "./constants";

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

const expireTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    const castedState = inboundState as UserState;
    // Save the current time
    return { ...castedState, _persistedAt: Date.now() };
  },
  // transform state being rehydrated
  (outboundState, key) => {
    if (outboundState && outboundState._persistedAt) {
      const currentTime = Date.now();
      // Check if the persisted state is older than a day
      if (currentTime - outboundState._persistedAt > DAY_IN_MILLISECONDS) {
        // If older, return undefined to invalidate
        return undefined;
      }
    }
    // Otherwise return the state as is
    return outboundState;
  },
  // configuration options
  { whitelist: ["userModel"] }
);

/** Local Storage Persist for Audio Model */
const persistConfig = {
  key: "root",
  storage,
  version: 2,
  whitelist: ["userModel"],
  transforms: [expireTransform],
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
