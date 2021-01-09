import axios from "axios";
const url = "http://localhost:8080";

const getOrders = (param) => {
  console.log("order.js getOrders", param);

  return axios.get(`${url}/api/order`, {
    params: param,
  });
};
export { getOrders };
