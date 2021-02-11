import axios from "axios";

const register = async (ctx) => {
  // 회원가입
  axios.post("/api/signup", ctx);
};

const loginApi = async (ctx) => {
  // 로그인
  console.log("api ", ctx);
  return axios.post("http://localhost:8080/api/auth/authenticate", ctx);
};

const check = async (ctx) => {
  // 로그인 상태 확인
};

const logout = async (ctx) => {
  // 로그아웃
};

export { loginApi };
