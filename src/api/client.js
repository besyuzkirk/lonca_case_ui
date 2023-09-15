import axios from "axios";

export const API_BASE_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:5001/api/v1"
        : process.env.REACT_APP_API_URL;

axios.defaults.baseURL = API_BASE_URL;

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status === 404) {
            console.log("404")
            window.location.href = '/error';
            return;
        }

        return Promise.reject(error);
    }
);

export default axios;