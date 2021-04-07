import React from "react";
import "./App.css";
import { PostList } from "./features/postList/PostList";
import { PostDetail } from "./features/postDetail/PostDetail";
import {
  HashRouter as Router,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { Grid, Hidden } from "@material-ui/core";

function PostPage(): JSX.Element {
  const history = useHistory();
  const detailMatch = useRouteMatch<{ date: string }>("/:date");
  return (
    <Grid
      alignItems="stretch"
      container
      direction="row-reverse"
      justify="center"
    >
      <Hidden xsDown={detailMatch === null}>
        <Grid item xs={12} sm={8}>
          {detailMatch !== null ? (
            <PostDetail date={detailMatch.params.date} />
          ) : (
            "post not selected"
          )}
        </Grid>
      </Hidden>
      <Hidden xsDown={detailMatch !== null}>
        <Grid item xs={12} sm={4}>
          <PostList onClickPost={(date) => history.push(`/${date}`)} />
        </Grid>
      </Hidden>
    </Grid>
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
