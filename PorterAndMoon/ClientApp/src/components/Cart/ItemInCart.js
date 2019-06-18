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
            <h3>Takeoff</h3><h2>{new Date(departure).toLocaleDateString()} at {new Date(departure).toLocaleTimeString()}</h2>
            <h3>Touchdown</h3><h2>{new Date(departure).toLocaleDateString()} at {new Date(departure).toLocaleTimeString()}</h2>
            <h2>Flight # {title}</h2>
            <h3>Details</h3><h2>{description} </h2>
            <h3>Planet of Origin</h3><h2>{origin}</h2>
            <h3>Destination Planet</h3><h2>{destination} </h2>
            <h3>isAvailable</h3><h2>{isAvailable}</h2>
            <h3>quantity</h3><h2>{quantity} </h2>
            <h3>Space Available</h3><h2>{remainingQty} </h2>
            <h3>type</h3><h2>{type}</h2>
          </div>
        </ToastBody>
      </Toast>
    );
  }
}

export default ItemInCart;