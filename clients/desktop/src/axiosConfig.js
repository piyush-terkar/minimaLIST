import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const axiosInstance = axios.create({});
axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.baseURL = "http://localhost:8080";

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      secureLocalStorage.clear();
    }
    return response;
  },
  (error) => {
    if (error.status === 401) {
      secureLocalStorage.clear();
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
