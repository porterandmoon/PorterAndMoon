import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.baseUrl;

const getCompletedOrders = (customerId) => new Promise((Resolve,Reject) => {
  axios.get(`${baseUrl}/order/my-orders`,
   {
     params: {
        userid: customerId
     }
   })
    .then((res) => Resolve(res))
    .catch((rej) => Reject(rej));
});

export default { getCompletedOrders };