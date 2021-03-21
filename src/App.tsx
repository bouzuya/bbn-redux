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

function PostListWrapper(): JSX.Element {
  const history = useHistory();
  return <PostList onClickPost={(date) => history.push(`/${date}`)} />;
}

function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            path="/:date"
            render={({ match }) => <PostDetail date={match.params.date} />}
          />
        </Switch>
        <PostListWrapper />
      </div>
    </Router>
  );
}

export default App;
