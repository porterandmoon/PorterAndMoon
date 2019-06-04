import firebase from 'firebase/app';
import 'firebase/auth';

const currentUser = () => {
  return firebase.auth().currentUser.uid;
}

export default currentUser;