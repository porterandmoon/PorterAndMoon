import React from 'react';
import seatsData from '../../data/PortAndMoonFactory/seatsData';
import rocketImg from '../../images/rocketSeats.gif';
import seatImg from '../../images/seat.png';
import seatTakenImg from '../../images/seatTaken.png';
import seatFirstImg from '../../images/seatFirst.png';
import seatSelectedImg from '../../images/seatSelected.png';
import shoppingCart from '../../data/PortAndMoonFactory/ShoppingCart';
import AddedModal from '../rocketDetail/AddedModal';
import { Button } from 'reactstrap';
import './seatSelector.scss';

class seatSelector extends React.Component {
  state = {
    seatInfo: null,
    selectedSeat: [],
    seatsPerRow: null,
    numberSeats: 1,
    path: window.location.href.slice(window.location.href.search('/?Id=') + 3),
    modal: false
  }

  componentDidMount() {
    seatsData.getSeats(this.state.path)
      .then((seatInfo) => {
        this.setState({ seatInfo, seatsPerRow: seatInfo[0].rowLength });
      });
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }


  seatBuilder = () => {
    //Renders the seat images with their ids and seat numbers based on the data returned from the api
    if (this.state.seatInfo !== null) {
      const renderArray = [];
      this.state.seatInfo.forEach((seat) => {
        renderArray.push(<img key={seat.id} id={seat.seatNumber} className='seatImg' alt="seat on rocket" src={this.seatSourcer(seat)}
          value={seat.customerId === 0 ? true : false}
          onMouseEnter={this.hovered} onMouseLeave={this.hoveredOut} onClick={this.selectSeat}/>);
      });
      return renderArray;
    }
  }

  seatSourcer = (seat) => {
    //determines the src attribute for the seat images based on the status of the seat (first class, coach, purchased, selected)
    console.log(this.state.selectedSeat);
    if (this.state.selectedSeat.includes(seat.seatNumber)) {
      return seatSelectedImg;
    } else if (seat.customerId !== 0) {
      return seatTakenImg;
    } else {
      return seat.type === 'First Class' ? seatFirstImg : seatImg;
    }
  }

  selectSeat = (event) => {
    //gets the id of the selected seat and then pushes it into the list of selected seats. 
    //Removes the oldest seat from the list if number of selected seats would exceed the chosen purchase quantity
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
    //Renders the details of each selected seat using the array of selected seat ids and finding the relevant seat in the data returned from api
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
    //Adds an item to the users cart for each selected seat and then returns the user to the home page.
    const promiseArray = [];
    this.state.selectedSeat.forEach((seat) => {
      const seatObj = this.state.seatInfo.find(seatObject => seatObject.seatNumber === seat)
      promiseArray.push(shoppingCart.addProductWithSeatToCart(this.props.currentUser.id, this.state.seatInfo[0].productId, this.state.numberSeats, seatObj.id));
    });
    Promise.all(promiseArray)
      .then(() => {
        this.toggle();
      }); 
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
          <div className='seatsContainer' style={{width: this.state.seatsPerRow * 160, height: this.state.seatsPerRow * 320}}>
            <div className='seatsKey'>
              <p>Key</p>
              <div><img className='seatImg' src={seatImg} alt="coach seat"/> : Open Coach Seat</div>
              <div><img className='seatImg' src={seatFirstImg} alt="first class seat"/> : Open First Class Seat</div>
              <div><img className='seatImg' src={seatTakenImg} alt="unavailable seat"/> : Unavailable Seat</div>
              <div><img className='seatImg' src={seatSelectedImg} alt="selected seat"/> : Currently Selected Seat</div>
            </div>
            <img className='rocketImg' src={rocketImg} style={{width: this.state.seatsPerRow * 150}} alt="rocket background"/>
            <div className='rocketSeats' style={{
              position: 'relative', left: this.state.seatsPerRow * 66,
              top: this.state.seatsPerRow * -220,
              width: this.state.seatsPerRow * 20 + 20}}>
              {this.seatBuilder()}
            </div>
          </div>
        </div>
        <AddedModal toggle={this.toggle} history={this.props.history} modal={this.state.modal}/>
      </div>
    );
  }
}

export default seatSelector;