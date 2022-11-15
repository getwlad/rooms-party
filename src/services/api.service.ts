import axios from "axios";

const serverUrl = "https://room-api-party.herokuapp.com/";

const api = axios.create({
  baseURL: serverUrl,
});

export default api;
