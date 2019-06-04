import React from 'react';
import { 
  Button,
  Badge
 } from 'reactstrap';
import ProfileCalls from '../../data/PortAndMoonFactory/Profile';
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
    ProfileCalls.currentUserInfo(this.props.uid)
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
    console.log();
  }

  getToOrderHistory = () => {
    this.props.history.push("/order-history")
  }

  render() {
    return (
      <div className="profile-container">
        <h1>Profile info</h1>
        <Badge color="warning" className="username">{this.state.userName}</Badge>
        <h6 className="date-time">DateCreated: {this.state.creationDate}</h6>
        <h4>FirstName: {this.state.firstName}</h4>
        <h4>LastName: {this.state.lastName}</h4>
        <div>
          <Button color="primary" onClick={this.getToOrderHistory}>OrderHistoryButton</Button>
          <Button color="primary">Productbuttonstings</Button>
          <Button color="primary">PaymentInfoButton</Button>
        </div>
      </div>
    );
  }
}

export default Profile;