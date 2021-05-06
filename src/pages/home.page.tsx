import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { ReactElement } from "react";
import Link from "../components/link.component";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "red",
    },
  })
);

function Home(): ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6">Home</Typography>
      <Link to="/house-detail">House Detail</Link>
    </div>
  );
}

export default Home;
