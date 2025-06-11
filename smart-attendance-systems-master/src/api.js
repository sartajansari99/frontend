import axios from "axios";

const Api = axios.create({
  baseURL: "https://finallyback.onrender.com/api/v1", // Common base for all routes
  withCredentials: true, // This allows cookies like refreshToken to be sent
});

export default Api;
