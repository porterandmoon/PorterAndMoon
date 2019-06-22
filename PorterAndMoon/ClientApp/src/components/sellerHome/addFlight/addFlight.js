import React from 'react';
import {
  Modal, ModalHeader, ModalBody, Button
} from 'reactstrap';
import Menu from './menu/menu';
import sellerHomeData from '../../../data/PortAndMoonFactory/sellerHomeData';
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
    type: 1,
    description: '',
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
    this.validator()
      .then(() => {
        if (!this.state.error) {
          const departure = `${this.state.departureDate}T${this.state.departureTime}Z`;
          const arrival = `${this.state.arrivalDate}T${this.state.arrivalTime}Z`;
      
          const flight = {
            destination: this.state.destination,
            origin: this.state.origin,
            departure,
            arrival,
            price: this.state.price,
            quantity: this.state.quantity,
            type: this.state.type,
            description: this.state.description,
            sellerId: this.props.userId
          }
          sellerHomeData.addNewFlight(flight)
            .then(() => {
              this.toggle();
            });
        }
      });
  }

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
              <div class="form-group">
                <label for="departureDateInput">Departure Time</label>
                <div className='timeInputs'>
                  <input type="date" className="form-control addFlightInput dateInput" id="departureDateInput" onChange={this.select}/>
                  <input type="time" className="form-control addFlightInput" id="departureTimeInput" onChange={this.select}/>
                </div>
              </div>
              <div class="form-group">
                <label for="arrivalDateInput">Arrival Time</label>
                <div className='timeInputs'>
                  <input type="date" className="form-control addFlightInput dateInput" id="arrivalDateInput" onChange={this.select}/>
                  <input type="time" className="form-control addFlightInput" id="arrivalTimeInput" onChange={this.select}/>
                </div>
              </div>
              <div className='addFlightRouteDiv'>
                <div class="form-group menuDiv">
                  <label for="destinationInput" className='menuLabel'>Destination: </label>
                  <Menu menuSelector={this.selectorD}/>
                </div>
                <div class="form-group menuDiv">
                  <label for="originInput" className='menuLabel'>Origin: </label>
                  <Menu menuSelector={this.selectorO}/>
                </div>
              </div>            
              <div className='addFlightNumbersDiv'>
                <div class="form-group">
                  <label for="priceInput">Price</label>
                  <input type="number" className="form-control addFlightInput" id="priceInput" onChange={this.select}/>
                </div>
                <div class="form-group">
                  <label for="quantityInput">Quantity</label>
                  <input type="number" className="form-control addFlightInput" id="quantityInput" onChange={this.select}/>
                </div>
              </div>
              <div class="form-group">
                <label for="descriptionInput">Description</label>
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