import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-type"] = "application/json"
axios.defaults.timeout = 10000;

export default axios;