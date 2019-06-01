import axios from 'axios';

const currentUserInfo = () => new Promise ((resolve, reject) => {
  axios.get("http://localhost:51450/api/user/1")
  .then(res => resolve(res))
  .catch(err => reject(err));
});

export default { currentUserInfo }