import apiKeys from '../apiKeys';
import axios from 'axios';

const DBURL = apiKeys.baseUrl;

const getAvailableFreightRockets = () => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/product/all/1`)
    .then((data) => {
      resolve(data.data);
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  getAvailableFreightRockets,
}