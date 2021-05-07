import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { HouseDto } from "../model/house.dto";
import { ResourceURL } from "../model/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "blue",
    },
    dataRow: {
      margin: `${theme.spacing(1)}px 0`,
      display: "flex",
    },
    key: {
      display: "inline-block",
      width: 150,
    },
    value: {
      display: "inline-block",
      "& > ul": {
        paddingLeft: "15px",
        margin: 0,
      },
    },
  })
);

function HouseDetail(): ReactElement {
  const classes = useStyles();
  const location = useLocation<{ currentHouse: HouseDto | undefined }>();
  const [house, setHouse] = useState<HouseDto | undefined>(
    location.state?.currentHouse
  );
  const { houseId } = useParams<Record<string, string | undefined>>();

  const loadHouse = useCallback(
    (id: string): void => {
      const url = `https://www.anapioficeandfire.com/api/houses/${id}`;
      axios
        .get<HouseDto>(url)
        .then((response) => response.data)
        .then((houseResponse) => {
          setHouse(houseResponse);
        });
    },
    [setHouse]
  );

  useEffect(() => {
    console.log("house and houseId", house?.name, houseId);
    if (!house && houseId) {
      loadHouse(houseId);
    }
  }, [loadHouse, house, houseId]);

  const HouseProperty = (props: {
    propName: string;
    name?: string;
  }): ReactElement | null => {
    const { propName, name } = props;
    const houseObj = house
      ? ((house as unknown) as Record<string, string | string[] | undefined>)
      : {};
    const toUl = (list: string[]): ReactElement => (
      <ul>
        {list?.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
    let prop: string | string[] | undefined = houseObj[propName];
    if (Array.isArray(prop)) {
      prop = prop.filter((item) => !!item);
    }

    return prop && prop.length !== 0 ? (
      <div className={classes.dataRow}>
        <div className={classes.key}>{name ?? propName}:</div>
        <div className={classes.value}>
          {Array.isArray(prop) ? toUl(prop) : prop}
        </div>
      </div>
    ) : null;
  };

  return (
    <div className={classes.root}>
      {!!house && (
        <Card>
          <CardHeader title={house.name} />
          <CardContent>
            <HouseProperty propName="region" />
            <HouseProperty propName="coatOfArms" />
            <HouseProperty propName="words" />
            <HouseProperty propName="titles" />
            <HouseProperty propName="seats" />
            <HouseProperty propName="founded" />
            <HouseProperty propName="diedOut" />
            <HouseProperty propName="ancestralWeapons" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default HouseDetail;
