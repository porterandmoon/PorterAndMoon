import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import NavbarC from '../navbar/navbarC';
import homeData from '../../data/PortAndMoonFactory/homeData';
import './home.scss';

class home extends React.Component {
  state = {
    rocketInfo: null
  }

  componentDidMount() {
    homeData.getMostRecentRockets()
      .then((rocketInfo) => {
        this.setState({ rocketInfo });
      });
  }

  logOut = () => {
    firebase.auth().signOut();
  }

  historyPusher = (path) => {
    this.props.history.push(path);
  }

  getToProfile = () => {
    this.props.history.push("/profile")
  }

  tableRowBuilder = (dest) => {
    const renderArray = [];
    this.state.rocketInfo[dest].forEach((rocket) => {
      renderArray.push(<tr key={rocket.id}>
        <th scope="row">{rocket.title}</th>
        <td>{rocket.username}</td>
        <td>{rocket.destination}</td>
        <td>{rocket.origin}</td>
        <td>{rocket.price}</td>
        <td>{rocket.quantity}</td>
        <td>{rocket.description}</td>
      </tr>);
    }); 
    return renderArray;
  }

  rocketCardBuilder = () => {
    const renderArray = [];
    if (this.state.rocketInfo !== null) {
      Object.keys(this.state.rocketInfo).forEach((destination) => {
         
          renderArray.push(<div key={destination}><h4 className='topFlightsTitle'>
            Recent flights to {destination} ({this.state.rocketInfo[destination].length} Total)</h4>
          <table className="table table-striped table-dark flightTable">
          <thead>
            <tr>
              <th scope="col">Flight #</th>
              <th scope="col">Spaceline</th>
              <th scope="col">Destination</th>
              <th scope="col">Origin</th>
              <th scope="col">Price</th>
              <th scope="col">Space Available</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {this.tableRowBuilder(destination)}
            </tbody>
            </table>
            </div>);
    });
    } else {
      renderArray.push(<div key='0'><h4 className='topFlightsTitle'>
      Recent Flights</h4>
    <table className="table table-striped table-dark flightTable">
    <thead>
      <tr>
        <th scope="col">Flight #</th>
        <th scope="col">Spaceline</th>
        <th scope="col">Destination</th>
        <th scope="col">Origin</th>
        <th scope="col">Price</th>
        <th scope="col">Space Available</th>
        <th scope="col">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
      <th scope="col-7">No flights available</th>
      </tr>
    </tbody>
    </table>
    </div>);
    }
     
  return renderArray;
  }

  render() {
    return(<div className='home'>
      <NavbarC historyPusher={this.historyPusher}/>
      {this.rocketCardBuilder()}
      <button onClick={this.logOut}>Log out</button>
      <button onClick={this.getToProfile}>Profile</button>

    </div>);
  }
}

export default home;