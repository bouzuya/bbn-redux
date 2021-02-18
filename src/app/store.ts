import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import postDetailReducer from "../features/postDetail/postDetailSlice";
import postListReducer from "../features/postList/postListSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    postDetail: postDetailReducer,
    postList: postListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
