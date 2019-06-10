import React from 'react';
import { 
  Button,
  Badge
 } from 'reactstrap';
import './Profile.scss';
class Profile extends React.Component {

  getToOrderHistory = () => {
    this.props.history.push("/order-history")
  }

  render() {
    return (
      <div className="profile-container">
        <h1>Profile info</h1>
        <Badge color="warning" className="username">{this.props.currentUser.userName}</Badge>
        <h6 className="date-time">DateCreated: {this.props.currentUser.creationDate}</h6>
        <h4>FirstName: {this.props.currentUser.firstName}</h4>
        <h4>LastName: {this.props.currentUser.lastName}</h4>
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