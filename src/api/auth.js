import axios from "axios";

const registerApi = async (ctx) => {
  // 회원가입
  return axios.post("/api/signup", ctx);
};

const loginApi = async (ctx) => {
  // 로그인
  return axios.post("http://localhost:8080/api/auth/authenticate", ctx);
};

const check = async (ctx) => {
  return axios.post("http://localhost:8080/api/auth/log", ctx);
};

const logout = async (ctx) => {
  // 로그아웃
};

export { loginApi, registerApi, check };
