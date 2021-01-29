import axios from "axios";

const url = "http://localhost:8080";

const searchSavedBookApi = (param) => {
    console.log("savedBook.js searchSavedBook", param);

    return axios.get(`${url}/api/book/search`, {
        params: param,
    });
};
export {searchSavedBookApi};
