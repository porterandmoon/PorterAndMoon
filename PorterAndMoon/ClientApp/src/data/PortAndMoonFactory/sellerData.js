import apiKeys from '../apiKeys';
import axios from 'axios';

const DBURL = apiKeys.baseUrl;

const getSellerInfo = (id) => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/user/seller/${id}`)
    .then((data) => {
      resolve(data.data);
    })
    .catch((err) => {
      reject(err);
    })
});

const getSellerRockets = (id) => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/product/seller/${id}`)
    .then((data) => {
      resolve(data.data);
    })
    .catch((err) => {
      reject(err);
    })
});

export default {
  getSellerInfo,
  getSellerRockets,
}