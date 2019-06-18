import apiKeys from '../apiKeys';
import axios from 'axios';

const DBURL = apiKeys.baseUrl;

const getDepartures = (id) => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/dashboard/${id}/departures`)
    .then((data) => {
      resolve(data.data);
    })
    .catch((err) => {
      reject(err);
    });
});

const getArrivals = (id) => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/dashboard/${id}/arrivals`)
    .then((data) => {
      resolve(data.data);
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  getDepartures,
  getArrivals,
}