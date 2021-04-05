import { ListItem, ListItemText } from "@material-ui/core";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Post, fetchPostList, selectPostList } from "./postListSlice";
import styles from "./PostList.module.css";

interface PostListProps {
  onClickPost: (date: string) => void;
}

function Row({ data, index, style }: ListChildComponentProps & { data: Post }) {
  const post = data[index];
  return (
    <ListItem
      button={true}
      component={NavLink}
      activeClassName="Mui-selected"
      style={style}
      to={post.date}
    >
      <ListItemText primary={post.title} secondary={post.date} />
    </ListItem>
  );
}

export function PostList(_: PostListProps) {
  const dispatch = useAppDispatch();
  const postList = useAppSelector(selectPostList);
  useEffect(() => {
    dispatch(fetchPostList());
  }, [dispatch]);
  return (
    <div className={styles.postListContainer}>
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            height={height}
            itemCount={postList.length}
            itemData={postList}
            itemSize={72}
            width={width}
          >
            {Row}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
}
