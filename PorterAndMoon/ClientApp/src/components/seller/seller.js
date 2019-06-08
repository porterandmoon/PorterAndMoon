import React from 'react';
import NavbarC from '../navbar/navbarC';
import Menu from './menu/menu';
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
    listOrigin: 'Earth',
    listDestination: 'Moon',
    listType: 1
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

  rocketsAggregateBuilder = (type) => {
    if (this.state.rocketInfo != null) {
      const renderArray = [];
      renderArray.push(<div className='aggregateRow'>
        <p className='aggregateUnit'>{this.state[`selectedOrigin${type}`]}</p>
        <p className='aggregateUnit'>{this.state[`selectedDestination${type}`]}</p>
        <p className='aggregateUnit'>{this.rocketsTotalizer(this.state[`selectedOrigin${type}`], this.state[`selectedDestination${type}`])}</p>
      </div>);
      this.state.destinations.forEach((destination) => {
        if (destination !== this.state[`selectedDestination${type}`] && destination !== this.state[`selectedOrigin${type}`])
        renderArray.push(<div className='aggregateRow'>
        <p className='aggregateUnit'></p>
        <p className='aggregateUnit'>{destination}</p>
        <p className='aggregateUnit'>{this.rocketsTotalizer(this.state[`selectedOrigin${type}`], destination)}</p>
      </div>);
      });
      return renderArray;
    }
  }

  rocketsTotalizer = (origin, destination) => {
    let total = 0;
    this.state.rocketInfo.forEach((rocket) => {
      if (rocket.origin === origin && rocket.destination === destination) {
        total++;
      }
    });
    return total;
  }

  rocketListBuilder = () => {
    if (this.state.rocketInfo !== null) {
      const renderArray = [];
      this.state.rocketInfo.forEach((rocket) => {
        if (rocket.origin === this.state.listOrigin && rocket.destination === this.state.listDestination && rocket.type == this.state.listType) {

        }
      });

      return renderArray;
    }
  }

  selectorOP = (selection) => {
    this.setState({ selectedOriginP : selection });
  }

  selectorOF = (selection) => {
    this.setState({ selectedOriginF : selection });
  }

  selectorDP = (selection) => {
    this.setState({ selectedDestinationP : selection });
  }

  selectorDF = (selection) => {
    this.setState({ selectedDestinationF : selection });
  }

  render() {
    return(
      <div className='seller'>
        <NavbarC historyPusher={this.historyPusher}/>
        {this.sellerInfoBuilder()}
        <div className='sellerRocketsDiv'>
          <div className='RocketsAggregateDiv'>
            <h4>Passenger Rockets</h4>
            <div className='aggregateHeader'>
              <p className='aggregateUnit'>Origin</p>
              <p className='aggregateUnit'>Destination</p>
              <p className='aggregateUnit'>Quantity</p>
            </div>
            {this.rocketsAggregateBuilder('P')}
            <div className='aggregateSelector'>
              <h5>Select a Route</h5>
              <div className='aggregateMenus'>
                <div className='menuUnit'>
                  <p className='menuTitle'>Origin</p>
                  <Menu selector={this.selectorOP} default='Earth'/>
                </div>
                <div className='menuUnit'>
                  <p className='menuTitle'>Destination</p>
                  <Menu selector={this.selectorDP} default='Moon'/>
                </div>
              </div>
            </div>
          </div>
          <div className='RocketsAggregateDiv'>
            <h4>Freight Rockets</h4>
            <div className='aggregateHeader'>
                <p className='aggregateUnit'>Origin</p>
                <p className='aggregateUnit'>Destination</p>
                <p className='aggregateUnit'>Quantity</p>
            </div>
            {this.rocketsAggregateBuilder('F')}
            <div className='aggregateSelector'>
              <h5>Select a Route</h5>
              <div className='aggregateMenus'>
                <div className='menuUnit'>
                  <p className='menuTitle'>Origin</p>
                  <Menu selector={this.selectorOF}  default='Earth'/>
                </div>
                <div className='menuUnit'>
                  <p className='menuTitle'>Destination</p>
                  <Menu selector={this.selectorDF}  default='Moon'/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='sellerRocketList'>
          {this.rocketListBuilder()}
        </div>
      </div>
    );
  }
}

export default seller;