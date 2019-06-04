import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import NavbarC from '../navbar/navbarC';
import './home.scss';

class home extends React.Component {
  logOut = () => {
    firebase.auth().signOut();
  }

  historyPusher = (path) => {
    this.props.history.push(path);
  }

  getToProfile = () => {
    this.props.history.push("/profile")
  }

  render() {
    return(<div className='home'>
      <NavbarC historyPusher={this.historyPusher}/>
      You're home
      <button onClick={this.logOut}>Log out</button>
      <button onClick={this.getToProfile}>Profile</button>

    </div>);
  }
}

export default home;