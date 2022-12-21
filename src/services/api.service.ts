import axios from "axios";

//Url de conexão  com o socket, caso a url abaixo não funcione, você pode usar esta api e roda-la localmente: https://github.com/getwlad/api-rooms-party
const serverUrl = "https://api-rooms-party-production.up.railway.app/";

const api = axios.create({
  baseURL: serverUrl,
});

export default api;
