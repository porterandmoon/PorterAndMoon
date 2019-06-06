import React from 'react';
import NavbarC from '../navbar/navbarC';
import freightData from '../../data/PortAndMoonFactory/freightData';
import './freight.scss';

class freight extends React.Component {
  state = {
    rocketInfo: {
      loading: ['loading','loading']
    },
    chosenDestination: '',
    path: '/freightl'
  }

  componentDidMount() {
    const path = this.props.history.location.pathname;
    let parsedPath = path.replace('/freightl', '');
    parsedPath = parsedPath.replace('+', '');
    this.setState({ chosenDestination: parsedPath, path }, () => {this.mounterCallBack()});    
  }

  mounterCallBack = () => {
    if (this.state.chosenDestination === '') {
      freightData.getAvailableFreightRockets()
      .then((rockets) => {
        this.setState({ rocketInfo: rockets });
      });
    } else {
      freightData.getAvailableFreightRocketsToDestination(this.state.chosenDestination)
        .then((rockets) => {
          this.setState({ rocketInfo: rockets });
        });
    }
  }

  componentDidUpdate() {
    if (this.state.path !== this.props.history.location.pathname) {
      const path = this.props.history.location.pathname;
      let parsedPath = path.replace('/freightl', '');
      parsedPath = parsedPath.replace('+', '');
      this.setState({ chosenDestination: parsedPath, path }, () => {this.mounterCallBack()});
    }
  }

  historyPusher = (path) => {
    this.props.history.push(path);
  }

  cardBuilderPart2_3OrMore = (dest) => {
    const renderArray = [];
    for (let i = 0; i < this.state.rocketInfo[dest].length; i++) {
      renderArray.push(<tr key={this.state.rocketInfo[dest][i].id}>
        <th scope="row">{this.state.rocketInfo[dest][i].title}</th>
        <td>{this.state.rocketInfo[dest][i].seller}</td>
        <td>{this.state.rocketInfo[dest][i].destination}</td>
        <td>{this.state.rocketInfo[dest][i].origin}</td>
        <td>{this.state.rocketInfo[dest][i].price}</td>
        <td>{this.state.rocketInfo[dest][i].quantity}</td>
        <td>{this.state.rocketInfo[dest][i].description}</td>
      </tr>);
    }
    return renderArray;   
   }

  cardBuilderPart2_LessThan3 = (dest) => {
    const renderArray = [];
    this.state.rocketInfo[dest].forEach((rocket) => {
      renderArray.push(<tr key={rocket.id}>
        <th scope="row">{rocket.title}</th>
        <td>{rocket.seller}</td>
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
        if (this.state.rocketInfo[destination].length > 2) {
          renderArray.push(<div key={destination}><h4 className='topFlightsTitle'>
            Top flights to {destination} ({this.state.rocketInfo[destination].length} Total)</h4>
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
            {this.cardBuilderPart2_3OrMore(destination)}
            </tbody>
            </table>
            </div>);
        } else {
          renderArray.push(<div key={destination}><h4 className='topFlightsTitle'>
            Top flights to {destination} ({this.state.rocketInfo[destination].length} Total)</h4>
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
            {this.cardBuilderPart2_LessThan3(destination)}
            </tbody>
            </table>
            </div>);
      };
    });
    } else {
      renderArray.push(<div key='0'><h4 className='topFlightsTitle'>
      Top flights to {this.state.chosenDestination}</h4>
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
      <th scope="col-7">No flights to {this.state.chosenDestination}</th>
      </tr>
    </tbody>
    </table>
    </div>);
    }
     
  return renderArray;
}

  render() {
    return(
      <div className='freight'>
        <NavbarC historyPusher={this.historyPusher}/>
        <h4 className='freightTitle'>Available Freight Rockets</h4>
        {this.rocketCardBuilder()}
      </div>
    );
  }
}

export default freight;