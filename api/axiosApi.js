import axios from "axios";
import Cookies from "js-cookie";

export const domainApi = process.browser
  ? process.env.NEXT_PUBLIC_API_BASE_URL
  : process.env.API_BASE_URL;

export const typeHttp = process.browser
  ? process.env.NEXT_PUBLIC_USE_HTTPS
  : process.env.USE_HTTPS;

export const config = {
  baseURL: `${typeHttp}://${domainApi}/`,
  headers: {
    "Content-Type": "application/json",
  },
};

export const axiosApi = axios.create(config);

axiosApi.interceptors.request.use(
  (req) => {
    let session = Cookies.get("token");
    if (session) {
      session = JSON.parse(session);
      req.headers.Authorization = `Bearer ${session.access_token}`;
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  async function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosApi;
