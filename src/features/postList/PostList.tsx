import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostList, selectPostList } from "./postListSlice";
import styles from "./PostList.module.css";

interface PostListProps {
  onClickPost: (date: string) => void;
}

export function PostList({ onClickPost }: PostListProps) {
  const dispatch = useDispatch();
  const postList = useSelector(selectPostList);
  useEffect(() => {
    dispatch(fetchPostList());
  }, [dispatch]);
  return (
    <div className={styles.postListContainer}>
      <ul className={styles.postList}>
        {postList.map((post) => {
          return (
            <li
              className={styles.post}
              key={post.date}
              onClick={(_) => onClickPost(post.date)}
            >
              <time className={styles.date} dateTime={post.date}>
                {post.date}
              </time>
              <span className={styles.title}>{post.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
