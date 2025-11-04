import axios from "axios";
import queryString from 'query-string';
import api from "./api";

const axiosClient = axios.create({
  baseURL: api.url,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify({ ...params, api_key: api.key })
});

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use(response => {
  if (response && response.data) {
    return response.data;
  }

  return response;
}, (error) => {
  throw error;
});

export default axiosClient;