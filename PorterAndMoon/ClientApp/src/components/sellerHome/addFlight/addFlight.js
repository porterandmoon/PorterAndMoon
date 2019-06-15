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
    description: ''
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  }

  newFlight = (event) => {
    event.preventDefault();
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
        <Button className='btn btn-info btn-sm' onClick={this.toggle}>Add Flight</Button>
        <Modal className='addFlightModal' isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader className='addFlightM' toggle={this.toggle}>
            Register A Flight
          </ModalHeader>
          <ModalBody className='addFlightM'>
            <form>
              <div class="form-group">
                <label for="departureDateInput">Departure Time</label>
                <input type="date" class="form-control" id="departureDateInput" onChange={this.select}/>
                <input type="time" class="form-control" id="departureTimeInput" onChange={this.select}/>
              </div>
              <div class="form-group">
                <label for="destinationInput">Destination</label>
                <Menu menuSelector={this.selectorD}/>
              </div>
              <div class="form-group">
                <label for="originInput">Origin</label>
                <Menu menuSelector={this.selectorO}/>
              </div>
              <div class="form-group">
                <label for="arrivalDateInput">Arrival Time</label>
                <input type="date" class="form-control" id="arrivalDateInput" onChange={this.select}/>
                <input type="time" class="form-control" id="arrivalTimeInput" onChange={this.select}/>
              </div>
              <div class="form-group">
                <label for="priceInput">Price</label>
                <input type="number" class="form-control" id="priceInput" onChange={this.select}/>
              </div>
              <div class="form-group">
                <label for="quantityInput">Quantity</label>
                <input type="number" class="form-control" id="quantityInput" onChange={this.select}/>
              </div>
              <div class="form-group">
                <label for="descriptionInput">Description</label>
                <input type="text" class="form-control" id="descriptionInput" onChange={this.select}/>
              </div>
              <button type="submit" class="btn btn-primary" onClick={this.newFlight}>Submit</button>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default addFlight;