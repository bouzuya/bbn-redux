import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface PostDetailState {
  postDetail: PostDetail | null;
}

interface PostDetail {
  data: string;
  date: string;
  html: string;
  minutes: number;
  pubdate: string;
  tags: string[];
  title: string;
  idTitle: string;
}

const initialState: PostDetailState = {
  postDetail: null,
};

export const fetchPostDetail = createAsyncThunk<PostDetail, string>(
  "fetchPostDetail",
  async (date) => {
    const m = date.match(/^(\d\d\d\d)-(\d\d)-(\d\d)$/);
    if (m === null) throw new Error("invalid post date format");
    const [yyyy, mm, dd] = m.slice(1);
    const response = await window.fetch(
      `https://blog.bouzuya.net/${yyyy}/${mm}/${dd}.json`
    );
    return response.json();
  }
);

export const postsSlice = createSlice({
  name: "postDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostDetail.fulfilled, (state, action) => {
      state.postDetail = action.payload;
    });
  },
});

export const selectPostDetail = (date: string) => (
  state: RootState
): PostDetail | null =>
  state.postDetail.postDetail === null
    ? null
    : state.postDetail.postDetail.date === date
    ? state.postDetail.postDetail
    : null;

export default postsSlice.reducer;
