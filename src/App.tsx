import React, { useState } from "react";
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
import {
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
} from "@material-ui/icons";
import {
  AppBar,
  createStyles,
  fade,
  Grid,
  Hidden,
  IconButton,
  InputBase,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
    },
    inputRoot: {
      color: "inherit",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      // marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

function PostPage(): JSX.Element {
  const [query, setQuery] = useState<string>("");
  const classes = useStyles();
  const history = useHistory();
  const date = useRouteMatch<{ date: string }>("/:date")?.params?.date ?? null;
  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down("xs"));
  const detail = useSelector(selectPostDetail(date ?? ""));
  const title =
    (date !== null ? date : "blog.bouzuya.net") +
    (!isXsDown && detail !== undefined ? ` ${detail.title}` : "");
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
          {date === null && isXsDown ? null : (
            <Typography variant="h6">{title}</Typography>
          )}
          {date === null ? (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  input: classes.inputInput,
                  root: classes.inputRoot,
                }}
                inputProps={{ "aria-label": "search" }}
                defaultValue={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          ) : null}
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
            <PostList
              onClickPost={(date) => history.push(`/${date}`)}
              query={query}
            />
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
