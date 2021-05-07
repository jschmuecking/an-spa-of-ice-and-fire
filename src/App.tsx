import {
  AppBar,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { ReactElement } from "react";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/home.page";
import HouseDetail from "./pages/house-detail.page";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    content: {
      padding: theme.spacing(2),
    },
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

      <div className={classes.content}>
        <Switch>
          <Route path="/houses/:houseId">
            <HouseDetail />
          </Route>
          <Route path="/houses">
            <Home />
          </Route>
          <Redirect from="/" to="/houses" exact />
        </Switch>
      </div>
    </div>
  );
}

export default App;
