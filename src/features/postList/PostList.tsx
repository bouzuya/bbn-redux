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
  query: string;
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

export function PostList(props: PostListProps) {
  const { query } = props;
  const dispatch = useAppDispatch();
  const postList = useAppSelector(selectPostList);
  const filtered = postList.filter((p) =>
    query
      .split(/\s/)
      .every((q) => p.title.indexOf(q) !== -1 || p.date.indexOf(q) !== -1)
  );
  useEffect(() => {
    dispatch(fetchPostList());
  }, [dispatch]);
  return (
    <div className={styles.postListContainer}>
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            height={height}
            itemCount={filtered.length}
            itemData={filtered}
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
