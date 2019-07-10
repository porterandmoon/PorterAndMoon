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

  //Matches up departing rockets with their position on the calendar based on departure date.
  departureMatcher = (date, view) => {
    let flightList = false; 

    //Gets the date of the calendar tiles using the react calendars built in methods
    // and converts them to match the date-time format from the api.
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

    //Loops over the departing rockets list which are grouped by their departure dates,
    // and if their departure date matches the calendar tile date then creates a link to that rocket.
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
            flightList.push(<Link to={`/detail/${flight.title}/?Id=${flight.id}`} key={flight.id} className='calendarFlightD'>{flight.title}</Link>);
          });
        }
      });
    } else {
      flightList = false;
    }
    return flightList;
  }

    //Matches up arriving rockets with their position on the calendar based on arrival date.
  arrivalMatcher = (date, view) => {
    let flightList = false; 

    //Gets the date of the calendar tiles using the react calendars built in methods
    // and converts them to match the date-time format from the api.
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

    //Loops over the arriving rockets list which are grouped by their arrival dates,
    // and if their arrival date matches the calendar tile date then creates a link to that rocket.
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
            flightList.push(<Link to={`/detail/${flight.title}/?Id=${flight.id}`} key={flight.id} className='calendarFlightA'>{flight.title}</Link>);
          });
        }
      });
    } else {
      flightList = false;
    }
    return flightList;
  }

  //Combines the flight icon, departures list, and arrivals list into a single component to render to the calendar tile
  flightCombiner = (date, view) => {
    const icon = [];
    icon.push(<i className="fas fa-rocket calendarIcon"></i>);
    const departures = this.departureMatcher(date, view);
    const arrivals = this.arrivalMatcher(date, view);
    if (departures) {
      return icon.concat(<div className='tileFlights'>{departures.concat(arrivals)}</div>);
    } else {
      return icon.concat(<div className='tileFlights'>{arrivals}</div>);
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