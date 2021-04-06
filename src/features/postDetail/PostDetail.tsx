import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPostDetail, selectPostDetail } from "./postDetailSlice";
import styles from "./PostDetail.module.css";
import { Card, CardContent, CardHeader } from "@material-ui/core";

interface PostDetailProps {
  date: string;
}

export function PostDetail({ date }: PostDetailProps) {
  const dispatch = useAppDispatch();
  const postDetail = useAppSelector(selectPostDetail(date));
  useEffect(() => {
    if (postDetail === undefined) dispatch(fetchPostDetail(date));
  }, [date, dispatch, postDetail]);
  return (
    <div className={styles.postDetailContainer}>
      {postDetail === undefined ? null : (
        <Card>
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
