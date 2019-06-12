import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.baseUrl;

const currentProduct = (searchParam) => new Promise((Resolve,Reject) => {
  axios.get(`${baseUrl}/order${searchParam}`,)
    .then((res) => Resolve(res))
    .catch((rej) => Reject(rej));
});

export default { currentProduct };