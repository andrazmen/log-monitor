import axios from "axios";

//const url = "http://localhost:5000";
const url = "https://log-monitor-w6xh.onrender.com/";

export const customFetch = axios.create({
  baseURL: url,
});
