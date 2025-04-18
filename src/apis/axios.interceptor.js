import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
  headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Request sent to:', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response received:', response);
    return response;
  },
  (error) => {
    console.error('Error occurred:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
