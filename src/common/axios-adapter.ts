import axios from "axios";
import { setupCache } from "axios-cache-adapter";

const cache = setupCache({
  // Tell adapter to attempt using response headers
  // readHeaders: true,
  exclude: { query: false },

  // apioficeandfire seems to not set cache-control headers -> set manually to 15min
  maxAge: 15 * 60 * 1000,
});

const axiosWithAdapter = axios.create({
  adapter: cache.adapter,
});

export default axiosWithAdapter;
