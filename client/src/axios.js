import axios from "axios";
import { BASE_URL } from './constant/constant';

const axiosInstance = (tokenName) => {
  const instance = axios.create({
    baseURL: "https://stayspot.jamshad.online/api",
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  instance.interceptors.request.use((request) => {
    const token = localStorage.getItem(tokenName);
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  });

  return instance;
};

export default axiosInstance;
