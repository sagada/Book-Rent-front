import axios from "axios";
const url = "http://localhost:8080";

export const searchKakaoBook = (param) => {
  console.log("api", param);
  axios.get(`${url}/feign/kakao-book-search`, {
    params: {
      query: param.query,
      page: param.page,
    },
  });
};
