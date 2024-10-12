import axios from "axios";

const Api = axios.create({
  // set default endpoint API
  baseURL: "http://localhost:4000",
});

export default Api;
