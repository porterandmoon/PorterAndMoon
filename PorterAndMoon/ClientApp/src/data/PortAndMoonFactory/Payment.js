import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.baseUrl;

const getPaymentTypes = (userId) => new Promise((Resolve, Reject) => {
  axios.get(`${baseUrl}/payment/${userId}`)
    .then((res) => Resolve(res))
    .catch((err) => Reject(err));
});

const deletePaymentType = paymentId => axios.delete(`${baseUrl}/payment/${paymentId}`)

export default { 
  getPaymentTypes, 
  deletePaymentType
}