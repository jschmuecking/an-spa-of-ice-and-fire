import {
  AppBar,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { ReactElement } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Home from "./pages/home.page";
import HouseDetail from "./pages/house-detail.page";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      color: "inherit",
      textDecoration: "none",
      "&:hover": {
        cursor: "pointer",
      },
    },
  })
);

function App(): ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            component={Link}
            to="/"
          >
            An SPA of Ice and Fire
          </Typography>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route path="/house-detail">
          <HouseDetail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
