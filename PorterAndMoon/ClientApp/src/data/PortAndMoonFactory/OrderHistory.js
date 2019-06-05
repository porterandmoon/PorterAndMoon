import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.baseUrl;

const getCompletedOrders = (customerId) => new Promise((Resolve,Reject) => {
  axios.get
})