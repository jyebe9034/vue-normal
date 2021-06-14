import axios from "axios";

const service = axios.create({
  baseURL: "/api", // api의 base_url
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=utf-8",
  },
});

export default service;
