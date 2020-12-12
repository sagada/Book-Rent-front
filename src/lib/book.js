import axios from "axios";
const url = "http://localhost:8080";

const searchKakaoBook = (param) => {
  return axios.get(`${url}/feign/kakao-book-search`, {
    params: {
      query: param.query,
      page: param.page,
      size: param.size,
      target: param.target,
      sort: "accuracy",
    },
  });
};

const getBookCountByIsbnArr = (isbns) => {
  console.log("isbn array in axios request before", isbns);

  return axios.get(`${url}/count`, {
    params: {
      isbns: isbns,
    },
  });
};

const saveKakaoBook = (param) => {
  console.log("saveKakaoBook api call");

  console.log("param : ", param);
  return axios.post(`${url}/api/book/kakao`, param);
};

export { searchKakaoBook, saveKakaoBook, getBookCountByIsbnArr };
