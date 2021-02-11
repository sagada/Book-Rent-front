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

  return axios.put(`${url}/modify/${param.orderId}/${param.status}`);
};

const deleteOrderBook = (param) => {
  return axios.delete(`${url}/${param.orderBookId}`);
};
export { getOrders, modifyOrder, deleteOrderBook };
