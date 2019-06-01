import axios from 'axios';

import apiKeys from '../apiKeys';

const baseUrl = apiKeys.firebaseKeys.baseUrl

const currentUserInfo = () => new Promise ((resolve, reject) => {
  axios.get(`${baseUrl}/user/1`)
  .then(res => resolve(res))
  .catch(err => reject(err));
});

export default { currentUserInfo }