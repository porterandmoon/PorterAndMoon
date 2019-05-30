import React from 'react';
import ProfileCalls from '../../../data/PortAndMoonFactory/Profile'
import './Profile.scss';

class Profile extends React.Component {
  state = {

  }


  componentDidMount() {
    console.log(ProfileCalls.currentUserInfo());
  }

  render() {
    return (
      <div>
        <h1>Profile info</h1>
        <ul>
          <li>Username</li>
          <li>FirstName</li>
          <li>LastName</li>
          <li>DateCreated</li>
          <li>OrderHistoryButton</li>
          <li>ProductListings</li>
          <li>PaymentInfoButton</li>
        </ul>
      </div>
    );
  }
}

export default Profile;