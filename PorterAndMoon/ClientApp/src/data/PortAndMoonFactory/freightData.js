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

const getAvailableFreightRocketsToDestination = (destination) => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/product/all/freight/${destination}`)
    .then((data) => {
      let returnObj = null;
      if (data.data[0] !== undefined) {
        returnObj = {
          [data.data[0].destination] : data.data
        }
      } 
      resolve(returnObj);
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  getAvailableFreightRockets,
  getAvailableFreightRocketsToDestination,
}