import React from 'react';
import Calendar from 'react-calendar';
import sellerRocketsData from '../../data/PortAndMoonFactory/sellerRocketsData';
import { Link } from 'react-router-dom';
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

  departureMatcher = (date, view) => {
    let flightList = false; 

    const dateConverter = (startDate) => {
      let month = startDate.getMonth();
      let day = startDate.getDate();
      if (parseInt(month) < 10) {
        month = '0' + (parseInt(month) + 1);
      }
      if (parseInt(day) < 10) {
        day = '0' + day;
      }
      const convertedDate = `${startDate.getFullYear()}-${month}-${day}`;
      return convertedDate;
    }

    if (view === 'month' && this.state.departures !== null) {
      Object.keys(this.state.departures).forEach((day) => {
        const flightDate = day.replace('T00:00:00', '');
        if (flightDate === dateConverter(date)) {
          if (flightList === false) {
            flightList = [];
            flightList.push(<p className='calendarDepartureTitle'>Departures</p>)
          }

          const flights = this.state.departures[day];
          flights.forEach((flight) => {
            flightList.push(<Link to={`/detail/${flight.title}/?Id=${flight.id}`} key={flight.id} className='calendarFlight'>{flight.title}</Link>);
          });
        }
      });
    } else {
      flightList = false;
    }
    return flightList;
  }

  arrivalMatcher = (date, view) => {
    let flightList = false; 

    const dateConverter = (startDate) => {
      let month = startDate.getMonth();
      let day = startDate.getDate();
      if (parseInt(month) < 10) {
        month = '0' + (parseInt(month) + 1);
      }
      if (parseInt(day) < 10) {
        day = '0' + day;
      }
      const convertedDate = `${startDate.getFullYear()}-${month}-${day}`;
      return convertedDate;
    }

    if (view === 'month' && this.state.arrivals !== null) {
      Object.keys(this.state.arrivals).forEach((day) => {
        const flightDate = day.replace('T00:00:00', '');
        if (flightDate === dateConverter(date)) {
          if (flightList === false) {
            flightList = [];
            flightList.push(<p className='calendarArrivalTitle'>Arrivals</p>)
          }

          const flights = this.state.arrivals[day];
          flights.forEach((flight) => {
            flightList.push(<Link to={`/detail/${flight.id}`} key={flight.id} className='calendarFlight'>{flight.title}</Link>);
          });
        }
      });
    } else {
      flightList = false;
    }
    return flightList;
  }

  flightCombiner = (date, view) => {
    const departures = this.departureMatcher(date, view);
    const arrivals = this.arrivalMatcher(date, view);
    if (departures) {
      return departures.concat(arrivals);
    } else {
      return arrivals;
    }
  }

  render() {
    return(
      <div className='sellerRockets'>
        <Calendar className='sellerCalendar'
          tileContent={({ date, view }) => {
            if (this.departureMatcher(date, view) || this.arrivalMatcher(date, view)) {
              return this.flightCombiner(date, view);
            } else {
              return null;
            }
            }}/>
      </div>
    );
  }
}

export default sellerRockets;