import React from 'react';
import seatsData from '../../data/PortAndMoonFactory/seatsData';
import './seatSelector.scss';

class seatSelector extends React.Component {
  state = {
    seatInfo: null
  }

  componentDidMount() {
    seatsData.getSeats()
      .then((seatInfo) => {
        this.setState({ seatInfo });
      });
  }

  render() {
    return(
      <div className='seatSelector'>

      </div>
    );
  }
}

export default seatSelector;