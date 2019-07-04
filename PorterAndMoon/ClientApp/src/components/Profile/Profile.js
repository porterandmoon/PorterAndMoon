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

  getToSellerDashboard = () => {
    this.props.history.push("/sellerhome")
  }

  getToUserPayments = () => {
    this.props.history.push("/payment-types")
  }

  render() {
    return (
      <div className="profile-container container">
        <h1>Profile info</h1>
        <Badge color="warning" className="username">{this.props.currentUser.userName}</Badge>
        <h6 className="date-time">DateCreated: {this.props.currentUser.creationDate}</h6>
        <h4>FirstName: {this.props.currentUser.firstName}</h4>
        <h4>LastName: {this.props.currentUser.lastName}</h4>
        <div className="profile-button-container">
          <Button className="internal-profile-links" color="primary" onClick={this.getToOrderHistory}>OrderHistoryButton</Button>
          <Button className="internal-profile-links" color="primary" onClick={this.getToSellerDashboard}>Productbuttonstings</Button>
          <Button className="internal-profile-links" color="primary" onClick={this.getToUserPayments}>PaymentInfoButton</Button>
        </div>
      </div>
    );
  }
}

export default Profile;