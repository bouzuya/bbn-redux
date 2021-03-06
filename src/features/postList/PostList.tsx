import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostList, selectPostList } from "./postListSlice";

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
    <div className="post-list">
      <ul>
        {postList.map((post) => {
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
