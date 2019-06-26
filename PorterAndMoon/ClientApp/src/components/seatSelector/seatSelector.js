import React from 'react';
import seatsData from '../../data/PortAndMoonFactory/seatsData';
import './seatSelector.scss';

class seatSelector extends React.Component {
  state = {
    seatInfo: null,
    path: window.location.href.slice(window.location.href.search('/?Id=') + 3)  
  }

  componentDidMount() {
    seatsData.getSeats(this.state.path)
      .then((seatInfo) => {
        this.setState({ seatInfo });
      });
  }

  render() {
    return(
      <div className='seatSelector'>
        <h5>Select Your Seats</h5>
        <div>
          <p>Number of Seats</p>
          <input type='number'/>
        </div>
      </div>
    );
  }
}

export default seatSelector;