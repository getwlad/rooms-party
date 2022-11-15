import axios from "axios";

const serverUrl = "http://localhost:3001/";

const api = axios.create({
  baseURL: serverUrl,
});

export default api;
