import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPostDetail, selectPostDetail } from "./postDetailSlice";
import styles from "./PostDetail.module.css";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import {
  AppBar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@material-ui/core";
import { useHistory } from "react-router";

interface PostDetailProps {
  date: string;
}

export function PostDetail({ date }: PostDetailProps) {
  const dispatch = useAppDispatch();
  const postDetail = useAppSelector(selectPostDetail(date));
  useEffect(() => {
    if (postDetail === undefined) dispatch(fetchPostDetail(date));
  }, [date, dispatch, postDetail]);
  const title = postDetail === undefined ? "bbn-redux" : postDetail.date;
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const trigger = useScrollTrigger();
  const history = useHistory();
  return (
    <>
      {isXs ? (
        <Slide appear={false} direction="down" in={!trigger}>
          <AppBar position="sticky">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => history.goBack()}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6">{title}</Typography>
            </Toolbar>
          </AppBar>
        </Slide>
      ) : null}
      <div
        style={isXs ? {} : { height: "100vh", overflow: "scroll" }}
        className={styles.postDetailContainer}
      >
        {postDetail === undefined ? null : (
          <Card style={{ minHeight: "100vh" }}>
            <CardHeader title={postDetail.title} subheader={postDetail.date} />
            <CardContent
              className={styles.body}
              dangerouslySetInnerHTML={{ __html: postDetail.html }}
            />
          </Card>
        )}
      </div>
    </>
  );
}
