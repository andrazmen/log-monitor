import axios from "axios";

//const url = "http://localhost:5000";
//const url = "https://log-monitor-w6xh.onrender.com";
const url = "https://affectionate-charm-production-0fac.up.railway.app";

export const customFetch = axios.create({
  baseURL: url,
});
