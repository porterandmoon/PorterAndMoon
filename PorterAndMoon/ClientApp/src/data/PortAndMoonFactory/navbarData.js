import apiKeys from '../apiKeys';
import axios from 'axios';

const DBURL = apiKeys.baseUrl;

const getAvailableRockets = (type) => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/product/all/${type}`)
    .then((data) => {
      resolve(data.data);
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  getAvailableRockets,
}