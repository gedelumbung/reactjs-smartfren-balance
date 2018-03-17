import axios from "axios";
import { BASE_URL } from './constant';

export default function api() {
  const request = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, PATCH"
    }
  });
  request.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      throw error;
    }
  );
  return request;
}
