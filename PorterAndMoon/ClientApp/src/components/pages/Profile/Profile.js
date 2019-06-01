import React from 'react';
import { 
  Button,
  Badge
 } from 'reactstrap';
import ProfileCalls from '../../../data/PortAndMoonFactory/Profile'
import './Profile.scss'
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
        <span className="username">testing <p className="badge badge-info"> {this.state.userName}</p></span>
        <h6>DateCreated: {this.state.creationDate}</h6>
        <h4>FirstName: {this.state.firstName}</h4>
        <h4>LastName: {this.state.lastName}</h4>
        <Button color="primary">OrderHistoryButton</Button>
        <Button color="primary">Productbuttonstings</Button>
        <Button color="primary">PaymentInfoButton</Button>
      </div>
    );
  }
}

export default Profile;