import axios from "axios";

const registerApi = async (ctx) => {
  // 회원가입
  return axios.post("/api/signup", ctx)
  .then((response) => ({response}))
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }

            console.log(error.config);
 return Promise.reject(error.response);
          }
        )
};

const loginApi = async (ctx) => {
  // 로그인
  return axios.post("http://localhost:8080/api/auth/authenticate", ctx).then(
  (response) => {
            
            let token = response.data.token;
            localStorage.setItem("token", 'Bearer ' + token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        return response
  });
};



const logout = async (ctx) => {
  // 로그아웃
};

export { loginApi, registerApi };
