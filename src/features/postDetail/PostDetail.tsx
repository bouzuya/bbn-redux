import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPostDetail, selectPostDetail } from "./postDetailSlice";
import styles from "./PostDetail.module.css";
import {
  Card,
  CardContent,
  CardHeader,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

interface PostDetailProps {
  date: string;
}

export function PostDetail({ date }: PostDetailProps) {
  const dispatch = useAppDispatch();
  const postDetail = useAppSelector(selectPostDetail(date));
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  useEffect(() => {
    if (postDetail === undefined) dispatch(fetchPostDetail(date));
  }, [date, dispatch, postDetail]);
  return (
    <div
      style={isXs ? {} : { height: "100vh", overflow: "scroll" }}
      className={styles.postDetailContainer}
    >
      {postDetail === undefined ? null : (
        <Card style={{ minHeight: "100vh" }}>
          <CardHeader title={postDetail.title} subheader={postDetail.date} />
          <CardContent
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: postDetail.html }}
          />
        </Card>
      )}
    </div>
  );
}
