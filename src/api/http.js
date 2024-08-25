import axios from "axios";

export const API_URL = "http://192.168.88.26:8000";

export const $api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

export default $api;
