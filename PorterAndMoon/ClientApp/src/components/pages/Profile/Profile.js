import React from 'react';
import ProfileCalls from '../../../data/PortAndMoonFactory/Profile'
import './Profile.scss';

class Profile extends React.Component {
  state = {
    creationDate: undefined,
    firstName: undefined,
    id: undefined,
    lastName: undefined,
    userName: undefined
  }


  componentDidMount() {
    ProfileCalls.currentUserInfo()
      .then(profileInfo => {
        const content = profileInfo.data
          this.setState({
            creationDate: content.creationDate,
            firstName: content.firstName,
            id: content.id,
            lastName: content.lastName,
            userName: content.userName
          });
        })
      .catch(err => {
        console.error(err);
      });
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