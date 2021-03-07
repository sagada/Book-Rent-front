import axios from "axios";

const checkApi = async (ctx) => {
  console.log("체크 날림")
  return axios.post("http://localhost:8080/api/auth/log", ctx, {headers: {
    'Authorization': window.localStorage.getItem('token')
  }});
};
export { checkApi };
