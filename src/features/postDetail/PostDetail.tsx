import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostDetail, selectPostDetail } from "./postDetailSlice";

interface PostDetailProps {
  date: string;
}

export function PostDetail({ date }: PostDetailProps) {
  const dispatch = useDispatch();
  const postDetail = useSelector(selectPostDetail(date));
  useEffect(() => {
    if (postDetail === undefined) dispatch(fetchPostDetail(date));
  }, [date, dispatch, postDetail]);
  return (
    <div className="post-detail">
      {postDetail === undefined ? null : (
        <article>
          <time dateTime={postDetail.date}>{postDetail.date}</time>
          <span className="title">{postDetail.title}</span>
          <div dangerouslySetInnerHTML={{ __html: postDetail.html }} />
        </article>
      )}
    </div>
  );
}
