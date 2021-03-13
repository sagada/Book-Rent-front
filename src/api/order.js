import axios from "axios";

const url = "http://localhost:8080/api/order";

const getOrders = (param) => {
  console.log("order.js getOrders", param);

  return axios.get(`${url}`, {
    params: param,
  });
};

const modifyOrder = (param) => {
  console.log("order.js modifyOrder", param);

  return axios
    .put(`${url}/modify/${param.orderId}/${param.status}`)
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

const deleteOrderBook = (param) => {
  return axios.delete(`${url}/${param.orderBookId}`);
};
export { getOrders, modifyOrder, deleteOrderBook };
