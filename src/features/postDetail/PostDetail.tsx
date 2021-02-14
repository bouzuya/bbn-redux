import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostDetail, selectPostDetail } from "./postDetailSlice";

interface PostDetailProps {
  date: string;
}

export function PostDetail({ date }: PostDetailProps) {
  const dispatch = useDispatch();
  const post = useSelector(selectPostDetail(date));
  useEffect(() => {
    if (post === null) dispatch(fetchPostDetail(date));
  }, [date, dispatch, post]);
  return (
    <div className="post-detail">
      {post === null ? null : (
        <article>
          <time dateTime={post.date}>{post.date}</time>
          <span className="title">{post.title}</span>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      )}
    </div>
  );
}
