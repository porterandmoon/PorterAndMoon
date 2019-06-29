import React from 'react';
import seatsData from '../../data/PortAndMoonFactory/seatsData';
import rocketImg from '../../images/rocketSeats.gif';
import seatImg from '../../images/seat.png';
import seatTakenImg from '../../images/seatTaken.png';
import seatSelectedImg from '../../images/seatSelected.png';
import { Button } from 'reactstrap';
import './seatSelector.scss';

class seatSelector extends React.Component {
  state = {
    seatInfo: null,
    selectedSeat: [],
    seatsPerRow: null,
    numberSeats: 1,
    path: window.location.href.slice(window.location.href.search('/?Id=') + 3)  
  }

  componentDidMount() {
    seatsData.getSeats(this.state.path)
      .then((seatInfo) => {
        this.setState({ seatInfo, seatsPerRow: seatInfo[0].rowLength });
      });
  }

  seatBuilder = () => {
    if (this.state.seatInfo !== null) {
      const renderArray = [];
      this.state.seatInfo.forEach((seat) => {
        renderArray.push(<img key={seat.id} id={seat.seatNumber} className='seatImg' src={this.seatSourcer(seat)}
          value={seat.customerId === 0 ? true : false}
          onMouseEnter={this.hovered} onMouseLeave={this.hoveredOut} onClick={this.selectSeat}/>);
      });
      return renderArray;
    }
  }

  seatSourcer = (seat) => {
    console.log(this.state.selectedSeat);
    if (this.state.selectedSeat.includes(seat.seatNumber)) {
      return seatSelectedImg;
    } else {
      return seat.customerId === 0 ? seatImg : seatTakenImg;
    } 
  }

  selectSeat = (event) => {
    const seat = event.target.id;
    if (this.state.selectedSeat.length < this.state.numberSeats && event.target.getAttribute('value')) {
      const updatedState = this.state.selectedSeat;
      updatedState.push(seat);
      this.setState({ selectedSeat: updatedState });
    } else if (event.target.getAttribute('value')) {
      const updatedState = this.state.selectedSeat;
      updatedState.push(seat);
      updatedState.shift();
      this.setState({ selectedSeat: updatedState });
    }
  }

  detailsBuilder = () => {
    if (this.state.selectedSeat.length > 0) {
      const renderArray = [];
      this.state.selectedSeat.forEach((seatNum) => {
        const seat = this.state.seatInfo.find(seatObject => seatObject.seatNumber === seatNum)
        renderArray.push(<div className='seatDetailUnit'>
          <p>Seat Number: {seat.seatNumber}</p>
          <p>Type: {seat.type}</p>
          <p>Price: {seat.premium * seat.price}</p>
        </div>);
      });
      return renderArray;
    }
  }

  updateNumber = (event) => {
    this.setState({ numberSeats: event.target.value });
  }

  completeSelection = (event) => {
    this.props.history.push('/homel');
  }

  render() {
    return(
      <div className='seatSelector'>
        <h5>Select Your Seats</h5>
        <div className='numberSeats'>
          <p className='numberSeatsTitle'>Number of Seats</p>
          <input type='number' min='1' class='numberInput' value={this.state.numberSeats} onChange={this.updateNumber}/>
          <Button className='seatComplete' onClick={this.completeSelection}>Complete Selection</Button>
        </div>
        <div className='containerContainer'>
          <div className='seatDetails'>
            <p className='seatDetailsTitle'>Your Seat Details</p>
            {this.detailsBuilder()}
          </div>
          <div className='seatsContainer' style={{width: this.state.seatsPerRow * 160, height: this.state.seatsPerRow * 275}}>
            <img className='rocketImg' src={rocketImg} style={{width: this.state.seatsPerRow * 150}}/>
            <div className='rocketSeats' style={{
              position: 'relative', left: this.state.seatsPerRow * 66,
              top: this.state.seatsPerRow * -220,
              width: this.state.seatsPerRow * 20 + 20}}>
              {this.seatBuilder()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default seatSelector;