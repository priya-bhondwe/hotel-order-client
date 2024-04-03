import axios from "axios";
import endpoints from "./endpoints";
import AuthService from "../services/AuthService";

const API = axios.create({
  baseURL: `${endpoints?.serverBaseUrl}/api/v1`,
});

API.interceptors.request.use((req) => {
  const token = sessionStorage.getItem("accessToken");
  console.log("AccessToken", token);
  if (token) {
    req.headers["Authorization"] = token;
  }
  return req;
});

API.interceptors.response.use(
  (response) => {
    const successCode = [200, 201];
    const code = response?.status;
    if (successCode.includes(code)) return response;
    return Promise.reject(response);
  },
  (err) => {
    if (err?.response?.status === 401) {
      //it token is invalid / expired then serer return 401  response status code
      const token = sessionStorage.getItem("refreshToken");
      console.log("RefreshToken", token);

      AuthService?.refreshToken(token as string)
        .then((response) => {
          console.log("refreshToken...", response?.data?.data);

          const { accessToken, refreshToken } = response?.data?.data;

          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("refreshToken", refreshToken);
        })

        .catch(console.error);
    } else if (err?.response?.status === 403) {
      sessionStorage.clear();
      // window.location.href = "http://localhost:3000/login";
    }
    return Promise.reject(err);
  }
);

export default API;
