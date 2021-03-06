import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface PostDetail {
  data: string;
  date: string;
  html: string;
  idTitle: string;
  minutes: number;
  pubdate: string;
  tags: string[];
  title: string;
}

const postDetailAdapter = createEntityAdapter<PostDetail>({
  selectId: (postDetail) => postDetail.date,
  sortComparer: (a, b) => a.date.localeCompare(b.date),
});

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
  initialState: postDetailAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostDetail.fulfilled, (state, action) => {
      postDetailAdapter.upsertOne(state, action.payload);
    });
  },
});

const postDetailSelectors = postDetailAdapter.getSelectors<RootState>(
  (state) => state.postDetail
);

export const selectPostDetail = (date: string) => (state: RootState) =>
  postDetailSelectors.selectById(state, date);

export default postsSlice.reducer;
