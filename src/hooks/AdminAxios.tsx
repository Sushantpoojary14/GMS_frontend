import Axios from "axios";

const adminTokenAxios = Axios.create({
  baseURL: import.meta.env.VITE_ADMIN_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept":"application/json"
  },
});

adminTokenAxios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("adminToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

adminTokenAxios.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    console.log("server error " + error);
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      sessionStorage.removeItem("adminToken");
      sessionStorage.removeItem("admin");
      // window.location.reload();
    }
    // originalRequest._retry = true;
    return error.response;
  }
);
export default adminTokenAxios;
