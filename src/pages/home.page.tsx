import {
  createStyles,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { Pagination, Skeleton } from "@material-ui/lab";
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import axios from "../common/axios-adapter";
import { HouseDto } from "../model/house.dto";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
  })
);

interface PaginationMeta {
  pageSize: number;
  pages: number;
}

const parseLink = (linkInfo: string): PaginationMeta => {
  const info = linkInfo
    .split(",")
    .filter((line) => line.indexOf('rel="last"') !== -1);
  if (info.length > 0) {
    const lastUrlWrapper = info[0].split(";")[0];
    const lastUrl = lastUrlWrapper.slice(1, lastUrlWrapper.length - 1);
    const params = lastUrl
      .split("?")[1]
      .split("&")
      .map((paramString) => {
        const paramArray = paramString.split("=");
        return { key: paramArray[0], value: paramArray[1] };
      })
      .reduce((previousValue, currentValue) => {
        const paramMap = previousValue;
        paramMap[currentValue.key] = +currentValue.value;
        return paramMap;
      }, {} as Record<string, number>);
    if (params.pageSize && params.page) {
      return { pageSize: params.pageSize, pages: params.page };
    }
  }
  return { pageSize: 0, pages: 0 };
};

function Home(): ReactElement {
  const classes = useStyles();
  const history = useHistory();
  const [houses, setHouses] = useState<HouseDto[]>([]);
  const paginationMeta = useRef<PaginationMeta>({ pageSize: 0, pages: 0 });
  const { t } = useTranslation();

  const loadPage = useCallback(
    (pageNumber?: number, createMeta?: boolean): void => {
      const url = "https://www.anapioficeandfire.com/api/houses";
      const params = pageNumber ? `?page=${pageNumber}&pageSize=10` : "";
      setHouses([]);
      axios
        .get<HouseDto[]>(url + params)
        .then((response) => {
          if (createMeta) {
            paginationMeta.current = parseLink(response.headers.link);
          }
          setHouses(response.data);
        })
        .catch((error) => {
          // handle error
          // eslint-disable-next-line no-console
          console.log(error);
        });
    },
    [setHouses]
  );

  useEffect(() => {
    loadPage(undefined, true);
  }, [loadPage]);

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    loadPage(value);
  };

  const handleClick = (house: HouseDto) => {
    const houseId = house.url.split("/").pop();
    history.push(`/houses/${houseId}`, {
      currentHouse: house,
    });
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h6">{t("overview.header")}</Typography>
      <List>
        {houses.length === 0
          ? [...Array(10)].map((e, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <ListItem key={i}>
                <ListItemText>
                  <Skeleton width="20em" />
                </ListItemText>
              </ListItem>
            ))
          : houses.map((house: HouseDto) => (
              <ListItem
                button
                key={house.name}
                onClick={() => handleClick(house)}
              >
                <ListItemText>{house.name}</ListItemText>
              </ListItem>
            ))}
      </List>
      <Pagination
        count={paginationMeta.current.pages}
        onChange={handlePagination}
      />
    </Paper>
  );
}

export default Home;
