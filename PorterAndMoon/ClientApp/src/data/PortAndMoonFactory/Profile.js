import axios from 'axios';

const currentUserInfo = () => {
  axios.get("http://localhost:51450/api/user/1")
  .then(res => {
    return res;
  })
  .catch(err => {
    console.error(err);
  });
}

export default { currentUserInfo }