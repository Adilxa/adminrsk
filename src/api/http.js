import axios from "axios";

export const API_URL = "https://j1xlz783-8000.euw.devtunnels.ms/";

export const $api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

export default $api;
