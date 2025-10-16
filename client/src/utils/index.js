import axios from "axios";

//const url = "http://localhost:5000";
const url = "https://log-monitor-client.onrender.com";

export const customFetch = axios.create({
  baseURL: url,
});
