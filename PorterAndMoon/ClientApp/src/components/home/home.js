import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './home.scss';

class home extends React.Component {
  logOut = () => {
    firebase.auth().signOut();
  }

  getToProfile = () => {
    this.props.history.push("/profile")
  }



  render() {
    return(<div>
      You're home
      <button onClick={this.logOut}>Log out</button>
      <button onClick={this.getToProfile}>Profile</button>

    </div>);
  }
}

export default home;