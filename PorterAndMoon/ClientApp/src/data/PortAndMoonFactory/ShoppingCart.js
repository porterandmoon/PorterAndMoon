import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.baseUrl;

const currentProduct = (searchParam) => new Promise((Resolve,Reject) => {
  axios.get(`${baseUrl}/product${searchParam}`)
    .then((res) => Resolve(res))
    .catch((rej) => Reject(rej));
});

const addProductToCart = (userId, productId, quantOrdered) => new Promise((Resolve, Reject) => {
 axios.post(`${baseUrl}/cart`, { 
   data: {
      UserId: userId,
      ProductId: productId,
      OrderQuantity: quantOrdered,
    }
  })
    .then((res) => Resolve(res))
    .catch((err) => Reject(err));
});

export default { 
  currentProduct,
  addProductToCart,
};