import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface PostsState {
  posts: Post[];
}

interface Post {
  date: string;
  minutes: number;
  pubdate: string;
  tags: string[];
  title: string;
}

const initialState: PostsState = {
  posts: [],
};

export const fetchPosts = createAsyncThunk<Post[]>("fetchPosts", async () => {
  const response = await window.fetch("https://blog.bouzuya.net/posts.json");
  return response.json();
});

export const postListSlice = createSlice({
  name: "postList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export const selectPosts = (state: RootState): Post[] => state.postList.posts;

export default postListSlice.reducer;
