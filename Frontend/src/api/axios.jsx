import axios from "axios";
const api = import.meta.env.VITE_SERVER_API;

const token = localStorage.getItem("token");
if (!token) {
  console.log("Error: Token Not Found");
}
// console.log(token);

const instant = axios.create({
  baseURL: `${api}`,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default instant;
