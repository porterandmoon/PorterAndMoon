import React from 'react';
import NavbarC from '../navbar/navbarC';
import sellerData from '../../data/PortAndMoonFactory/sellerData';
import './seller.scss';

class seller extends React.Component {
  state = {
    rocketInfo: null,
    sellerInfo: null,
    destinations: ['Mercury', 'Venus', 'Earth', 'Moon', 'Mars', 'Europa', 'Ganymede', 'Io', 'Callisto', 'Titan', 'Rhea'],
    selectedDestinationP: 'Moon',
    selectedDestinationF: 'Moon',
    selectedOriginP: 'Earth',
    selectedOriginF: 'Earth',
  }

  componentDidMount() {
    const path = this.props.history.location.pathname;
    const sellerId = path.replace('/seller/', '');
    sellerData.getSellerInfo(sellerId)
      .then((sellerInfo) => {
        this.setState({ sellerInfo }, () => {
          this.rocketsGetter();
        });
      });
  }

  rocketsGetter = () => {
    sellerData.getSellerRockets(this.state.sellerInfo.id)
      .then((rocketInfo) => {
        this.setState({ rocketInfo });
      });
  }

  historyPusher = (path) => {
    this.props.history.push(path);
  }

  sellerInfoBuilder = () => {
    if (this.state.sellerInfo != null) {
      return <div className='sellerInfoDiv'>
        <h4>{this.state.sellerInfo.userName}</h4>
        <p>{this.state.sellerInfo.creationDate}</p>
        <p>Rating will go here</p>
      </div>;
    }
  }

  rocketsAggregateBuilder = () => {
    if (this.state.rocketInfo != null) {
      const renderArray = [];
      Object.keys(this.state.rocketInfo).forEach(destination)
      return renderArray;
    }
  }

  render() {
    return(
      <div className='seller'>
        <NavbarC historyPusher={this.historyPusher}/>
        {this.sellerInfoBuilder()}
        <div className='passengerRocketsAggregateDiv'>
          {this.rocketsAggregateBuilder()}
        </div>
      </div>
    );
  }
}

export default seller;