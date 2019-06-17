import React from 'react';
import Calendar from 'react-calendar';
import sellerRocketsData from '../../data/PortAndMoonFactory/sellerRocketsData';
import './sellerRockets.scss';

class sellerRockets extends React.Component {
  state = {
    departures: null,
    arrivals: null
  } 
  
  componentDidMount() {
    sellerRocketsData.getDepartures(this.props.currentUser.id)
      .then((departures) => {
        this.setState({ departures });
      });
      sellerRocketsData.getArrivals(this.props.currentUser.id)
      .then((arrivals) => {
        this.setState({ arrivals });
      });
  }

  render() {
    return(
      <div className='sellerRockets'>
        <Calendar className='sellerCalendar'/>
      </div>
    );
  }
}

export default sellerRockets;