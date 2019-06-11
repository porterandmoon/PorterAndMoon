import apiKeys from '../apiKeys';
import axios from 'axios';

const DBURL = apiKeys.baseUrl;

const getMostRecentRockets = () => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/product/recent`)
    .then((data) => {
      resolve(data.data);
    })
    .catch((err) => {
      reject(err);
    })
});

export default {
  getMostRecentRockets,
}