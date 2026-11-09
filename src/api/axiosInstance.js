import axios from "axios";

const axiosinstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 10000,
});

// Request Interceptor: Attach userToken to headers
axiosinstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global error logging for axiosinstance
axiosinstance.interceptors.response.use(
  (response) => {
    console.log("API response Received");
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      console.log("Status:", status);
      console.log("Server Response:", error.response.data);

      if (status === 401) {
        console.log("Unauthorized error");
      } else if (status === 404) {
        console.log("API is not found");
      } else if (status === 500) {
        console.log("Something went wrong on server");
      }
    } else if (error.request) {
      console.log("No response from the server");
    } else {
      console.log("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosinstance;