import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPostList, selectPostList } from "./postListSlice";
import styles from "./PostList.module.css";

interface PostListProps {
  onClickPost: (date: string) => void;
}

export function PostList({ onClickPost }: PostListProps) {
  const dispatch = useAppDispatch();
  const postList = useAppSelector(selectPostList);
  useEffect(() => {
    dispatch(fetchPostList());
  }, [dispatch]);
  return (
    <div className={styles.postListContainer}>
      <ul className={styles.postList}>
        {postList.map((post) => (
          <li className={styles.postListItem} key={post.date}>
            {/* Don't use <Link /> to avoid slowdown to redrawing from using Context. */}
            <a
              className={styles.post}
              href={`#/${post.date}`}
              onClick={(_) => onClickPost(post.date)}
            >
              <time className={styles.date} dateTime={post.date}>
                {post.date}
              </time>
              <span className={styles.title}>{post.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
