import React from 'react';
import {
  Toast,
  ToastBody,
  ToastHeader,
} from 'reactstrap';

class ItemInCart extends React.Component {
  render() {
    var { 
      arrival,
      departure,
      description,
      destination,
      isAvailable,
      origin,
      quantity,
      remainingQty,
      title,
      type,
    } = this.props.cartItem
    return(
      <Toast>
        <ToastHeader>
          <div className="cart-item-header">
            <div>Takeoff: {new Date(departure).toLocaleDateString()} at {new Date(departure).toLocaleTimeString()}</div>
            <div>Destination Planet: {destination}</div>
          </div>
        </ToastHeader>
        <ToastBody>
          <div className="cart-item-body">
            <div className="cart-item-title">Flight # {title} :: {description}</div>
            <div className="cart-item-details">
              <div className="cart-item-takeoff">
                <div>Takeoff: {new Date(departure).toLocaleDateString()} at {new Date(departure).toLocaleTimeString()}</div>
                <div>Planet of Origin: {origin}</div>
              </div>
              <div className="cart-item-touchdown">
                <div>Touchdown: {new Date(arrival).toLocaleDateString()} at approximately {new Date(arrival).toLocaleTimeString()}</div>
                <div>Destination Planet: {destination} </div>
              </div>
            </div>
            <div>
              <div>Total Capacity: {quantity}</div>
              <div>Space Available: {remainingQty}</div>
            </div>
          </div>
        </ToastBody>
      </Toast>
    );
  }
}

export default ItemInCart;