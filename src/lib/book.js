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
  return axios
    .post(`${url}/api/book/kakao`, param)
    .then((response) => ({ response }))
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
    });
};

export { searchKakaoBook, saveKakaoBook, getBookCountByIsbnArr };
