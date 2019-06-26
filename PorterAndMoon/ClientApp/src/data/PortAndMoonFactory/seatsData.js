import apiKeys from '../apiKeys';
import axios from 'axios';

const DBURL = apiKeys.baseUrl;

const getSeats = (productId) => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/seat/${productId}`)
    .then((data) => {
      resolve(data.data);
    })
    .catch((err) => {
      reject(err);
    });
});

const addSeats = (seats) => new Promise((resolve, reject) => {
  axios.post(`${DBURL}/seat`, seats)
    .then((data) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  getSeats,
  addSeats,
}