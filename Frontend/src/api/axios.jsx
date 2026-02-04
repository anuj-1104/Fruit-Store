import axios from "axios";
const api = import.meta.env.VITE_SERVER_API;

const token = localStorage.getItem("token");
if (!token) {
  console.log("Error: Token Not Found");
  // window.location.href="/login";
  // throw new Error("token not find");
}

const instant = axios.create({
  baseURL: `${api}`,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

// instant.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/login"; // Redirect to login
//     }
//     return Promise.reject(error);
//   },
// );

export default instant;
