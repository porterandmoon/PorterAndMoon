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

const getMonthSales = (id) => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/dashboard/${id}`)
    .then((data) => {
      resolve(data.data);
    })
    .catch((err) => {
      reject(err);
    })
});

const getAllSales = (id) => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/dashboard/${id}/all`)
    .then((data) => {
      resolve(data.data);
    })
    .catch((err) => {
      reject(err);
    })
});

const getNumRockets = (id) => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/dashboard/${id}/num`)
    .then((data) => {
      resolve(data.data);
    })
    .catch((err) => {
      reject(err);
    })
});

const getNumRocketsMonth = (id) => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/dashboard/${id}/month`)
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
  getMonthSales,
  getAllSales,
  getNumRockets,
  getNumRocketsMonth,
}