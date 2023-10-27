import Axios from "axios";

const userTokenAxios = Axios.create({
  baseURL: import.meta.env.VITE_USER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

userTokenAxios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("userToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

userTokenAxios.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    console.log("server error " + error);
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      sessionStorage.removeItem("userToken");
      sessionStorage.removeItem("user");
    //   window.location.reload();
    }
    // originalRequest._retry = true;
    return error.response;
  }
);
export default userTokenAxios;
