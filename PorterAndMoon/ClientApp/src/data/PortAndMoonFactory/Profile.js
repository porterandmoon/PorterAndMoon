import axios from 'axios';
import userInfo from '../FirebaseFactory/userInfo';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.firebaseKeys.baseUrl

const currentUserInfo = () => new Promise ((resolve, reject) => {
  axios.get(`${baseUrl}/user/${userInfo()}`)
  .then(res => resolve(res))
  .catch(err => reject(err));
});

export default { currentUserInfo }