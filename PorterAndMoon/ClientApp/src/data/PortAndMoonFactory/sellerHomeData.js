import apiKeys from '../apiKeys';
import axios from 'axios';

const DBURL = apiKeys.baseUrl;

const getSellerOrders = (id) => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/user/dashboard/${id}`)
    .then((data) => {
      resolve(data.data);
    })
    .catch((err) => {
      reject(err);
    })
});

const getSellerHistory = (id) => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/user/history/${id}`)
    .then((data) => {
      resolve(data.data);
    })
    .catch((err) => {
      reject(err);
    })
});

const addNewFlight = (newFlight) => new Promise((resolve, reject) => {
  axios.post(`${DBURL}/product`, newFlight)
    .then((data) => {
      resolve(data.data);
    })
    .catch((err) => {
      reject(err);
    })
});

export default {
  getSellerOrders,
  getSellerHistory,
  addNewFlight,
}