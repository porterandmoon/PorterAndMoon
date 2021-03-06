import React from 'react';
import Menu from './menu/menu';
import { Link } from 'react-router-dom';
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

  //Gets the sellers rockets for sale based on their id.
  rocketsGetter = () => {
    sellerData.getSellerRockets(this.state.sellerInfo.id)
      .then((rocketInfo) => {
        this.setState({ rocketInfo });
      });
  }

  //Renders the sellers info based on the data returned by the api.
  sellerInfoBuilder = () => {
    if (this.state.sellerInfo != null) {
      return <div className='sellerInfoDiv'>
        <h4>{this.state.sellerInfo.userName}</h4>
        <p>{this.state.sellerInfo.creationDate}</p>
        <p>Rating will go here</p>
      </div>;
    }
  }

  //Renders the list of routes for passenger/freight rockets and the number of flights available on each route.  
  // Sets origin based on selected origin and organizes destinations based on selected destination. 
  rocketsAggregateBuilder = (type) => {
    if (this.state.rocketInfo != null) {
      const renderArray = [];
      renderArray.push(<div className='aggregateRow' onMouseEnter={this.routeHovered} onMouseLeave={this.routeHoveredOut} type={type === 'P' ? 2 : 1}
        origin={this.state[`selectedOrigin${type}`]} destination={this.state[`selectedDestination${type}`]} onClick={this.routeSelect}>
        <p className='aggregateUnit'>{this.state[`selectedOrigin${type}`]}</p>
        <p className='aggregateUnit'>{this.state[`selectedDestination${type}`]}</p>
        <p className='aggregateUnit'>{this.rocketsTotalizer(this.state[`selectedOrigin${type}`], this.state[`selectedDestination${type}`], type)}</p>
      </div>);
      this.state.destinations.forEach((destination) => {
        if (destination !== this.state[`selectedDestination${type}`] && destination !== this.state[`selectedOrigin${type}`]) 
        renderArray.push(<div className='aggregateRow' onMouseEnter={this.routeHovered} onMouseLeave={this.routeHoveredOut} type={type === 'P' ? 2 : 1}
          origin={this.state[`selectedOrigin${type}`]} destination={destination} key={destination} onClick={this.routeSelect}>
        <p className='aggregateUnit'></p>
        <p className='aggregateUnit'>{destination}</p>
        <p className='aggregateUnit'>{this.rocketsTotalizer(this.state[`selectedOrigin${type}`], destination, type)}</p>
      </div>);
      });
      return renderArray;
    }
  }

  //Totals the number of rockets for sale on a route
  rocketsTotalizer = (origin, destination, type) => {
    let total = 0;
    type = (type === 'P' ? 2 : 1);
    this.state.rocketInfo.forEach((rocket) => {
      if (rocket.origin === origin && rocket.destination === destination && rocket.type === type) {
        total++;
      }
    });
    return total;
  }

  //Renders the list of rockets for sale on the selected route
  rocketListBuilder = () => {
    if (this.state.rocketInfo !== null) {
      const renderArray = [];
      renderArray.push(<table className="table table-striped table-dark flightTable">
      <thead>
        <tr>
          <th scope="col">Flight #</th>
          <th scope="col">Price</th>
          <th scope="col">Space Available</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        {this.rocketListSubBuilder()}
        </tbody>
        </table>);
      return renderArray;
    }
  }

  //Builds the table rows for rendering in the rocketListBuilder
  rocketListSubBuilder = () => {
    const renderArray = [];
    this.state.rocketInfo.forEach((rocket) => {
      if (rocket.origin === this.state.listOrigin && rocket.destination === this.state.listDestination && rocket.type === this.state.listType) {
        renderArray.push(<tr key={rocket.id}>
          <th scope="row"><Link to={`/detail/${rocket.title}/?Id=${rocket.id}`}>{rocket.title}</Link></th>
          <td>{rocket.price}</td>
          <td>{rocket.quantity}</td>
          <td>{rocket.description}</td>
        </tr>);
      }
    });
    return renderArray;
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

  //Sets the styling on a route div to be highlighted when hovered over
  routeHovered = (event) => {
    const tar = event.currentTarget;
    if (tar.className.includes('hovering') === false) {
      tar.className += ' hovering';
    }
  }

  //Resets the styling on a route div when no longer hovered over
  routeHoveredOut = (event) => {
    const tar = event.currentTarget;
    if (tar.className.includes('hovering')) {
      tar.className = tar.className.replace(' hovering', '');
    }
  }


  //Sets the relevant states for building the selected route list based on the clicked on route.
  routeSelect = (event) => {
    const tar = event.currentTarget;
    this.setState({
      listOrigin : tar.getAttribute('Origin'),
      listDestination: tar.getAttribute('Destination'),
      listType: parseInt(tar.getAttribute('type'), 10) 
    });
  }

  render() {
    return(
      <div className='seller'>
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
          <h5 className='sellerListTitle'>Flights On Selected Route</h5>
          {this.rocketListBuilder()}
        </div>
      </div>
    );
  }
}

export default seller;