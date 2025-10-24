import axios from "axios";

// read raw host from env or fallback
const rawHost = process.env.REACT_APP_API_URL || "http://localhost:5000";
// strip trailing slash
const host = rawHost.replace(/\/$/, "");
// if host already ends with /api use it as base, otherwise append /api
const API_BASE = host.endsWith("/api") ? host : `${host}/api`;

const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export default axiosInstance;
