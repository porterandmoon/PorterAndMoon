import React from 'react';
import {
  Modal, ModalHeader, ModalBody, Button
} from 'reactstrap';
import Menu from './menu/menu';
import sellerHomeData from '../../../data/PortAndMoonFactory/sellerHomeData';
import seatsData from '../../../data/PortAndMoonFactory/seatsData';
import './addFlight.scss';

class addFlight extends React.Component {
  state = {
    modal: false,
    destination: 'Moon',
    origin: 'Earth',
    departureDate: null,
    departureTime: null,
    arrivalDate: null,
    arrivalTime: null,
    price: 0,
    quantity: 0,
    description: '',
    freight: false,
    passenger: true,
    premiumPrice: null,
    premiumSeat: null,
    coachPrice: null,
    coachSeat: null,
    rowSeats: null,
    error: false
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  }

  validator = () => new Promise((resolve) => {
    this.setState({ error: false });
    if (this.state.departureDate === null) {
      this.setState({ error: 'Enter a departure date' });
    } else if (this.state.arrivalDate === null) {
      this.setState({ error: 'Enter an arrival date' }); 
    } else if (this.state.price === 0) {
      this.setState({ error: 'Enter a price' }); 
    } else if (this.state.quantity === 0) {
      this.setState({ error: 'Enter a quantity' }); 
    } else if (this.state.description === null) {
      this.setState({ error: 'Enter a description' }); 
    } else if (this.state.departureTime === null) {
      this.setState({ error: 'Enter a departure time' }); 
    } else if (this.state.arrivalTime === null) {
      this.setState({ error: 'Enter an arrival time' }); 
    }
    resolve(); 
  })

  newFlight = (event) => {
    event.preventDefault();
    // this.validator()
    //   .then(() => {
        if (!this.state.error) {
          const departure = `${this.state.departureDate}T${this.state.departureTime}Z`;
          const arrival = `${this.state.arrivalDate}T${this.state.arrivalTime}Z`;
      
          //Creates flight object based on the form inputs
          const flight = {
            destination: this.state.destination,
            origin: this.state.origin,
            departure,
            arrival,
            price: this.state.freight ? this.state.price : this.state.coachPrice,
            quantity: this.state.freight ? this.state.quantity : parseInt(this.state.coachSeat, 10)  + parseInt(this.state.premiumSeat, 10),
            remainingQuantity: this.state.freight ? this.state.quantity : parseInt(this.state.coachSeat, 10)  + parseInt(this.state.premiumSeat, 10),
            type: this.state.freight ? 1 : 2,
            description: this.state.description,
            sellerId: this.props.userId
          }
          
          //Posts the new flight to the database and then if the new flight is a passenger flight will post the flights seats to the database as well.
          sellerHomeData.addNewFlight(flight)
            .then((newFlight) => {
              if (this.state.passenger) {
                const seats = {
                  numSeats: parseInt(this.state.coachSeat, 10) + parseInt(this.state.premiumSeat, 10),
                  numPremium: this.state.premiumSeat,
                  premium: this.state.premiumPrice / this.state.coachPrice,
                  rowSeats: this.state.rowSeats,
                  productId: newFlight.id
                }
                seatsData.addSeats(seats)
                  .then(() => {
                    // this.props.updateAfterAddition();
                    this.toggle();
                  });
              } else {
                this.toggle();
              }   
            });
        }
      // });
  }

  //These selector methods update component state based on the various form inputs.
  selectorD = (selection) => {
    this.setState({ destination: selection });
  }

  selectorO = (selection) => {
    this.setState({ origin: selection });
  }

  select = (event) => {
    const tar = event.target.id;
    this.setState({ [tar.replace('Input', '')]: event.target.value });
  }

  selectType = () => {
    this.setState({ freight: !this.state.freight, passenger: !this.state.passenger  });
  }

  render() {
    return(
      <div className='addFlight'>
        <Button className='btn btn-info btn-sm sellerButton' onClick={this.toggle}><i className="fas fa-rocket"></i> Add Flight</Button>
        <Modal className='addFlightModal' isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader className='addFlightM' toggle={this.toggle}>
            Register A Flight
          </ModalHeader>
          <ModalBody className='addFlightM'>
            <form className='addFlightForm'>
              <div className="form-group">
                <label htmlFor="departureDateInput">Departure Time</label>
                <div className='timeInputs'>
                  <input type="date" className="form-control addFlightInput dateInput" id="departureDateInput" onChange={this.select}/>
                  <input type="time" className="form-control addFlightInput" id="departureTimeInput" onChange={this.select}/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="arrivalDateInput">Arrival Time</label>
                <div className='timeInputs'>
                  <input type="date" className="form-control addFlightInput dateInput" id="arrivalDateInput" onChange={this.select}/>
                  <input type="time" className="form-control addFlightInput" id="arrivalTimeInput" onChange={this.select}/>
                </div>
              </div>
              <div className='addFlightRouteDiv'>
                <div className="form-group menuDiv">
                  <label htmlFor="destinationInput" className='menuLabel'>Destination: </label>
                  <Menu menuSelector={this.selectorD}/>
                </div>
                <div className="form-group menuDiv">
                  <label htmlFor="originInput" className='menuLabel'>Origin: </label>
                  <Menu menuSelector={this.selectorO}/>
                </div>
              </div>
              <div className='flightTypeDiv'>
                <p className='flightTypeTitle'>Flight Type</p>
                <div className='flightRadioDiv'>    
                  <div className='form-check form-check-inline'>
                      <label className="form-check-label radioLabel" htmlFor="freightInput">Freight</label>
                      <input type="radio" className="form-check-input" value='option1' id="freightInput" checked={this.state.freight} onChange={this.selectType}/>
                  </div>        
                  <div className='form-check form-check-inline'>
                      <label className="form-check-label radioLabel" htmlFor="passengerInput">Passenger</label>
                      <input type="radio" className="form-check-input" value='option2' id="passengerInput" checked={this.state.passenger} onChange={this.selectType}/>
                  </div>
                </div>   
              </div>

              {this.state.freight ? 
                <div className='addFlightNumbersDiv'>
                  <div className="form-group">
                    <label htmlFor="priceInput">Price</label>
                    <input type="number" className="form-control addFlightInput" id="priceInput" onChange={this.select}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="quantityInput">Quantity</label>
                    <input type="number" className="form-control addFlightInput" id="quantityInput" onChange={this.select}/>
                  </div>
                </div> 
                :
                <div className='addFlightNumbersDiv'>
                  <div className='passengerNumbersDiv'>
                    <p className='seatsTitle'>First Class Seats</p>
                    <div className='imARow'>
                      <div className="form-group">
                        <label htmlFor="premiumPriceInput">Price</label>
                        <input type="number" className="form-control addFlightInput" id="premiumPriceInput" onChange={this.select}/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="premiumSeatInput">Quantity</label>
                        <input type="number" className="form-control addFlightInput" id="premiumSeatInput" onChange={this.select}/>
                      </div>
                    </div>
                  </div>
                  <div className='passengerNumbersDiv'>
                    <p className='seatsTitle'>Coach Seats</p>
                    <div className='imARow'>
                      <div className="form-group">
                        <label htmlFor="coachPriceInput">Price</label>
                        <input type="number" className="form-control addFlightInput" id="coachPriceInput" onChange={this.select}/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="coachSeatInput">Quantity</label>
                        <input type="number" className="form-control addFlightInput" id="coachSeatInput" onChange={this.select}/>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="rowSeatsInput">Seats Per Row</label>
                    <input type="number" className="form-control addFlightInput" id="rowSeatsInput" onChange={this.select}/>
                  </div>
                </div>}

              <div className="form-group">
                <label htmlFor="descriptionInput">Description</label>
                <input type="text" className="form-control" id="descriptionInput" onChange={this.select}/>
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.newFlight}>Submit</button>
            </form>
            <p className='errorMsg'>{this.state.error ? this.state.error : null}</p>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default addFlight;