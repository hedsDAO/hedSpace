import { init, Models, RematchDispatch, RematchRootState } from "@rematch/core";
import selectPlugin from "@rematch/select";
import { eventModel } from "@/Store/models/eventModel";
// import { commentsModel } from "./models/commentsModel";

export interface RootModel extends Models<RootModel> {
//   commentsModel: typeof commentsModel;
//   eventModel: typeof eventModel;
}

export const models: RootModel = {
//   commentsModel,
  eventModel,
};

export const store = init({

  plugins: [selectPlugin()],
    models,
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
