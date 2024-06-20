import axios from "axios";

export const API_URL = "https://v5v6p13d-8000.inc1.devtunnels.ms/";

export const $api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

export default $api;
