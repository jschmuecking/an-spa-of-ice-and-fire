import {
  Button,
  Card,
  CardContent,
  CardHeader,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Skeleton } from "@material-ui/lab";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useLocation, useParams } from "react-router-dom";
import axios from "../common/axios-adapter";
import Link from "../components/link.component";
import { CharacterDto } from "../model/character.dto";
import { HouseDto } from "../model/house.dto";
import { ResourceURL } from "../model/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
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
    propSekeleton: {
      height: 21,
      width: 300,
      margin: "8px 0",
    },
    navigationBar: {
      marginTop: theme.spacing(3),
    },
  })
);

interface HouseShort {
  id: string;
  name: string;
}

interface AsyncHouseProps {
  currentLord?: string; // name of the current Lord
  heir?: string; // name of the heir
  overlord?: { name: string; id: string }; // name and id of the house that this house answeres to
  founder?: string; // name of the character that founded this house
  cadetBranches?: HouseShort[]; // names and ids of houses that were founded from this house
  swornMembers?: string[]; // names of characters that are sworn to this house
}

function HouseDetail(): ReactElement {
  const classes = useStyles();
  const { t } = useTranslation();
  const location = useLocation<{ currentHouse: HouseDto | undefined }>();
  const [house, setHouse] = useState<HouseDto | undefined>(
    location.state?.currentHouse
  );
  const [asyncProps, setAsyncProps] = useState<AsyncHouseProps | undefined>(
    undefined
  );
  const { houseId } = useParams<Record<string, string | undefined>>();

  const loadHouse = useCallback(
    (id: string): void => {
      const url: ResourceURL = `https://www.anapioficeandfire.com/api/houses/${id}`;
      requestResourceUrl<HouseDto>(url).then((houseResponse) => {
        if (typeof houseResponse !== "string") {
          setHouse(houseResponse);
        }
      });
    },
    [setHouse]
  );

  useEffect(() => {
    if (
      (!house && houseId) ||
      (house && houseId && getIdFromResourceUrl(house.url) !== houseId)
    ) {
      setAsyncProps(undefined);
      loadHouse(houseId);
    }
  }, [loadHouse, house, houseId]);

  useEffect(() => {
    if (house) {
      const characters = [
        house.currentLord, // character
        house.heir, // character
        house.founder, // character
      ];
      const characterPromises = Promise.all(
        characters
          .filter((item) => !!item)
          .map((url) => requestResourceUrl<CharacterDto>(url))
      );
      const cadetBranchesPromises = Promise.all(
        house.cadetBranches
          .filter((item) => !!item)
          .map((url) => requestResourceUrl<HouseDto>(url))
      );
      const swornMembersPromises = Promise.all(
        house.swornMembers
          .filter((item) => !!item)
          .map((url) => requestResourceUrl<CharacterDto>(url))
      );
      Promise.all([
        characterPromises,
        house.overlord
          ? requestResourceUrl<HouseDto>(house.overlord)
          : Promise.resolve(""),
        cadetBranchesPromises,
        swornMembersPromises,
      ]).then((results) => {
        const [
          characterResults,
          overlordResult,
          cadetBranchesResults,
          swornMembersResults,
        ] = results;
        setAsyncProps({
          currentLord:
            typeof characterResults[0] === "string"
              ? characterResults[0]
              : characterResults[0]?.name,
          heir:
            typeof characterResults[1] === "string"
              ? characterResults[1]
              : characterResults[1]?.name,
          overlord:
            overlordResult && typeof overlordResult !== "string"
              ? {
                  name: overlordResult.name,
                  id: getIdFromResourceUrl(overlordResult.url),
                }
              : undefined,
          founder:
            typeof characterResults[2] === "string"
              ? characterResults[2]
              : characterResults[2]?.name,
          cadetBranches: cadetBranchesResults
            .filter((item) => typeof item !== "string")
            .map((branch) => ({
              name: (branch as HouseDto).name,
              id: getIdFromResourceUrl((branch as HouseDto).url),
            })),
          swornMembers: swornMembersResults
            .filter((item) => typeof item !== "string")
            .map((member) => (member as CharacterDto).name),
        });
      });
    }
  }, [house]);

  return (
    <div className={classes.root}>
      {!!house && (
        <Card>
          <CardHeader title={house.name} />
          <CardContent>
            <HouseProperty
              name={t("houseDetail.region")}
              value={house.region}
            />
            <HouseProperty
              name={t("houseDetail.coatOfArms")}
              value={house.coatOfArms}
            />
            <HouseProperty name={t("houseDetail.words")} value={house.words} />
            <HouseProperty
              name={t("houseDetail.titles")}
              value={house.titles.filter((item) => !!item)}
            />
            <HouseProperty
              name={t("houseDetail.seats")}
              value={house.seats.filter((item) => !!item)}
            />
            {!!asyncProps?.currentLord && (
              <HouseProperty
                name={t("houseDetail.currentLord")}
                value={asyncProps.currentLord}
              />
            )}
            {!asyncProps && <Skeleton className={classes.propSekeleton} />}
            {!!asyncProps?.heir && (
              <HouseProperty
                name={t("houseDetail.heir")}
                value={asyncProps.heir}
              />
            )}
            {!asyncProps && <Skeleton className={classes.propSekeleton} />}
            {!!asyncProps?.overlord && (
              <HouseProperty
                name={t("houseDetail.overlord")}
                value={asyncProps.overlord}
              />
            )}
            {!asyncProps && <Skeleton className={classes.propSekeleton} />}
            <HouseProperty
              name={t("houseDetail.founded")}
              value={house.founded}
            />
            {!!asyncProps?.founder && (
              <HouseProperty
                name={t("houseDetail.founder")}
                value={asyncProps.founder}
              />
            )}
            {!asyncProps && <Skeleton className={classes.propSekeleton} />}
            <HouseProperty
              name={t("houseDetail.diedOut")}
              value={house.diedOut}
            />
            <HouseProperty
              name={t("houseDetail.ancestralWeapons")}
              value={house.ancestralWeapons.filter((item) => !!item)}
            />
            {!!asyncProps?.cadetBranches && (
              <HouseProperty
                name={t("houseDetail.cadetBranches")}
                value={asyncProps.cadetBranches}
              />
            )}
            {!asyncProps && <Skeleton className={classes.propSekeleton} />}
          </CardContent>
        </Card>
      )}
      <div className={classes.navigationBar}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          component={RouterLink}
          to="/"
        >
          {t("houseDetail.ui.backButton")}
        </Button>
      </div>
    </div>
  );
}

function HouseProperty(props: {
  value: string | string[] | HouseShort | HouseShort[];
  name: string;
}): ReactElement {
  const { value, name } = props;
  const classes = useStyles();
  const toLink = (house: HouseShort): ReactElement => (
    <Link to={`/houses/${house.id}`}>{house.name}</Link>
  );
  const toUl = (list: string[] | HouseShort[]): ReactElement | string =>
    list.length > 0 ? (
      <ul>
        {list?.map((item: string | HouseShort) =>
          typeof item === "string" ? (
            <li key={item}>{item}</li>
          ) : (
            <li key={item.id}>{toLink(item)}</li>
          )
        )}
      </ul>
    ) : (
      "-"
    );
  let renderValue: ReactElement | string;
  if (Array.isArray(value)) {
    renderValue = toUl(value);
  } else if (typeof value === "object") {
    renderValue = toLink(value);
  } else if (value) {
    renderValue = value;
  } else {
    renderValue = "-";
  }
  return (
    <div className={classes.dataRow}>
      <div className={classes.key}>{name}:</div>
      <div className={classes.value}>{renderValue}</div>
    </div>
  );
}

function requestResourceUrl<T>(url: ResourceURL): Promise<T | string> {
  return axios
    .get<T>(url)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return Promise.resolve("");
    });
}

function getIdFromResourceUrl(url: ResourceURL): string {
  return url.split("/").pop() ?? "";
}

export default HouseDetail;
