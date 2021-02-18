import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectPosts } from "./postListSlice";

interface PostListProps {
  onClickPost: (date: string) => void;
}

export function PostList({ onClickPost }: PostListProps) {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  return (
    <div className="post-list">
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.date} onClick={(_) => onClickPost(post.date)}>
              <time dateTime={post.date}>{post.date}</time>
              <span className="title">{post.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
