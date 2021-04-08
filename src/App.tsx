import React from "react";
import "./App.css";
import { PostList } from "./features/postList/PostList";
import { PostDetail } from "./features/postDetail/PostDetail";
import { selectPostDetail } from "./features/postDetail/postDetailSlice";
import {
  HashRouter as Router,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import {
  AppBar,
  Grid,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useSelector } from "react-redux";

function PostPage(): JSX.Element {
  const history = useHistory();
  const date = useRouteMatch<{ date: string }>("/:date")?.params?.date ?? null;
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const detail = useSelector(selectPostDetail(date ?? ""));
  const title =
    (date !== null ? date : "blog.bouzuya.net") +
    (!isXs && detail !== undefined ? ` ${detail.title}` : "");
  return (
    <>
      <AppBar>
        <Toolbar>
          {date !== null ? (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => history.goBack()}
            >
              <ArrowBackIcon />
            </IconButton>
          ) : null}
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Grid
        alignItems="stretch"
        container
        direction="row-reverse"
        justify="center"
        style={{ height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)` }}
      >
        <Hidden xsDown={date === null}>
          <Grid item xs={12} sm={8}>
            {date !== null ? <PostDetail date={date} /> : "post not selected"}
          </Grid>
        </Hidden>
        <Hidden xsDown={date !== null}>
          <Grid item xs={12} sm={4}>
            <PostList onClickPost={(date) => history.push(`/${date}`)} />
          </Grid>
        </Hidden>
      </Grid>
    </>
  );
}

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path="*">
          <PostPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
