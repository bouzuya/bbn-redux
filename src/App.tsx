import React from "react";
import "./App.css";
import { PostList } from "./features/postList/PostList";
import { PostDetail } from "./features/postDetail/PostDetail";
import {
  HashRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { Grid } from "@material-ui/core";

function PostListWrapper(): JSX.Element {
  const history = useHistory();
  return <PostList onClickPost={(date) => history.push(`/${date}`)} />;
}

function App(): JSX.Element {
  return (
    <Grid
      alignItems="stretch"
      container
      direction="row-reverse"
      justify="center"
    >
      <Router>
        <Switch>
          <Route
            path="/:date"
            render={({ match }) => <PostDetail date={match.params.date} />}
          />
        </Switch>
        <PostListWrapper />
      </Router>
    </Grid>
  );
}

export default App;
