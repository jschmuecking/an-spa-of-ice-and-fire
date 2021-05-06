import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { ReactElement } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "blue",
    },
  })
);

function HouseDetail(): ReactElement {
  const classes = useStyles();

  return <div className={classes.root}>House Detail</div>;
}

export default HouseDetail;
