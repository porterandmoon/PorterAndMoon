import React from 'react';
import NavbarC from '../navbar/navbarC';
import freightData from '../../data/PortAndMoonFactory/freightData';
import './freight.scss';

class freight extends React.Component {
  state = {
    rocketInfo: {
      error: ['loading','loading']
    }
  }

  componentDidMount() {
    freightData.getAvailableFreightRockets()
      .then((rockets) => {
        this.setState({ rocketInfo: rockets });
      });
  }

  historyPusher = (path) => {
    this.props.history.push(path);
  }

  rocketCardBuilder = () => {
    const renderArray = [];
     Object.keys(this.state.rocketInfo).forEach((destination) => {
      renderArray.push(<div><h3>{destination}</h3></div>);
      if (this.state.rocketInfo[destination].length > 2) {
        for (let i = 0; i < this.state.rocketInfo[destination].length; i++) {
          renderArray.push(<div>{this.state.rocketInfo[destination][i].description}</div>);
        }   
       } else {
        this.state.rocketInfo[destination].forEach((rocket) => {
          renderArray.push(<div>{rocket.description}</div>);
      });  
    };
  });
  return renderArray;
}

  render() {
    return(
      <div className='freight'>
        <NavbarC historyPusher={this.historyPusher}/>
        {this.rocketCardBuilder()}
      </div>
    );
  }
}

export default freight;