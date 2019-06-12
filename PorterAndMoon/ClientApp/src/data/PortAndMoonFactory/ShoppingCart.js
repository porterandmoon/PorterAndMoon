import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.baseUrl;

const currentProduct = (searchParam) => new Promise((Resolve,Reject) => {
  axios.get(`${baseUrl}/product${searchParam}`)
    .then((res) => Resolve(res))
    .catch((rej) => Reject(rej));
});

const addProductToCart = (product) => new Promise((Resolve, Reject) => {
 axios.post(`${baseUrl}/order${product}`,
 { data: {

 }})
});

export default { currentProduct };