import axios, { AxiosInstance } from "axios";

const Axios: AxiosInstance = axios.create({
    baseURL: `http://${window.location.hostname}:8080`,
});

export default Axios;
