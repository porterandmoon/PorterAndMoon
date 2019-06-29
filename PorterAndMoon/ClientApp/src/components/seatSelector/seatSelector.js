import React from 'react';
import seatsData from '../../data/PortAndMoonFactory/seatsData';
import './seatSelector.scss';

class seatSelector extends React.Component {
  state = {
    seatInfo: null,
    selectedSeat: null,
    path: window.location.href.slice(window.location.href.search('/?Id=') + 3)  
  }

  componentDidMount() {
    seatsData.getSeats(this.state.path)
      .then((seatInfo) => {
        this.setState({ seatInfo });
      });
  }

  hovered = (event) => {
    event.preventDefault();
    const link = event.target;
    if (link.className.includes(' hoveredSeat') === false) {
      link.className += ' hoveredSeat';
    }
  }

  hoveredOut = (event) => {
    event.preventDefault();
    const link = event.target;
    if (link.className.includes(' hoveredSeat')) {
      link.className = link.className.replace(' hoveredSeat', '');
    }
  }

  seatBuilder = () => {
    if (this.state.seatInfo !== null) {
      const renderArray = [];
      this.state.seatInfo.forEach((seat) => {
        renderArray.push(<div key={seat.id} id={seat.seatNumber} className={this.seatClasser(seat)}
          onMouseEnter={this.hovered} onMouseLeave={this.hoveredOut} onClick={this.selectSeat}/>);
      });
      return renderArray;
    }
  }

  seatClasser = (seat) => {
    if (this.state.selectedSeat === seat.seatNumber) {
      return 'seatSelectedImg';
    } else {
      return seat.customerId === 0 ? 'seatImg' : 'seatTakenImg';
    } 
  }

  selectSeat = (event) => {
    const seat = event.target.id;
    this.setState({ selectedSeat: seat });
  }

  render() {
    return(
      <div className='seatSelector'>
        <h5>Select Your Seats</h5>
        <div>
          <p>Number of Seats</p>
          <input type='number'/>
        </div>
        {this.seatBuilder()}
      </div>
    );
  }
}

export default seatSelector;