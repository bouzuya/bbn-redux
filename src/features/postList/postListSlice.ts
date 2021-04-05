import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface Post {
  date: string;
  minutes: number;
  pubdate: string;
  tags: string[];
  title: string;
}

const postListAdapter = createEntityAdapter<Post>({
  selectId: (post) => post.date,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

export const fetchPostList = createAsyncThunk<Post[]>(
  "fetchPosts",
  async () => {
    const response = await window.fetch("https://blog.bouzuya.net/posts.json");
    return response.json();
  }
);

export const postListSlice = createSlice({
  name: "postList",
  initialState: postListAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostList.fulfilled, (state, action) => {
      postListAdapter.setAll(state, action.payload);
    });
  },
});

const postListSelectors = postListAdapter.getSelectors<RootState>(
  (state) => state.postList
);

export const selectPostList = postListSelectors.selectAll;

export default postListSlice.reducer;
