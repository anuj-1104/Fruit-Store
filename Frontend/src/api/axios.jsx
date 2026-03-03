import axios from "axios";
const api = import.meta.env.VITE_SERVER_API;

const token = localStorage.getItem("token");
const admin_token = localStorage.getItem("admin-token");

const instant = axios.create({
  baseURL: `${api}`,
  headers: {
    Authorization: `${token ? `Bearer ${token}` : `bearer ${admin_token}`}`,
  },
  withCredentials: true,
});

export default instant;
