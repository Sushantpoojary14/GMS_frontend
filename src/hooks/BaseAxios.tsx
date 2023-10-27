import Axios from 'axios';
const axiosBaseURL = Axios.create({
    // baseURL:'http://127.0.0.1:8000/api/',
    baseURL:import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept":"application/json"
      }
});
axiosBaseURL.interceptors.response.use(
  (response) => response,

  async (error) => {
    // const originalRequest = error.config;
    console.log("server error " + error);
    // originalRequest._retry = true;
    return error.response;
  }
);
export default axiosBaseURL;