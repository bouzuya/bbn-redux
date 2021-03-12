import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPostDetail, selectPostDetail } from "./postDetailSlice";
import styles from "./PostDetail.module.css";

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
        <article className={styles.postDetail}>
          <header className={styles.header}>
            <time className={styles.date} dateTime={postDetail.date}>
              {postDetail.date}
            </time>
            <span className={styles.title}>{postDetail.title}</span>
          </header>
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: postDetail.html }}
          />
        </article>
      )}
    </div>
  );
}
