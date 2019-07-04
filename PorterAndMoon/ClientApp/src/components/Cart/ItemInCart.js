import React from 'react';
// Fancy style used for info. I'm using it wrong (in the sense of styling), but it looks good.
import {
  Toast,
  ToastBody,
  ToastHeader,
} from 'reactstrap';

class ItemInCart extends React.Component {
  seatsBuilder = () => {
    if (this.props.cartItem.seatNumber !== null) {
      return <div>
        <p>Your Seat</p>
        <p>{this.props.cartItem.seatType}</p>
        <p>Seat number: {this.props.cartItem.seatNumber}</p>
      </div>;
    }
  }

  render() {
    // some vars aren't used yet. Intend to use them later for stretch goals
    var { 
      arrival,
      departure,
      description,
      destination,
      origin,
      quantity,
      remainingQty,
      title,
      ordProdId,
    } = this.props.cartItem
    
    return(
      <Toast>
        <ToastHeader>
          <div className="cart-item-header">
            <div>Takeoff: {new Date(departure).toLocaleDateString()} at {new Date(departure).toLocaleTimeString()}</div>
              <div className="remove-from-cart">
                <div className="title-destination">Destination Planet: {destination}</div>
                <span className="remove-container" onClick={() => this.props.RemoveItem(ordProdId)} title="Remove from Cart">
                  <svg  className="remove-from-cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -256 1792 1792">
                    <path xmlns="http://www.w3.org/2000/svg" d="m 1149,414 q 0,26 -19,45 l -181,181 181,181 q 19,19 19,45 0,27 -19,46 l -90,90 q -19,19 -46,19 -26,0 -45,-19 L 768,821 587,1002 q -19,19 -45,19 -27,0 -46,-19 l -90,-90 q -19,-19 -19,-46 0,-26 19,-45 L 587,640 406,459 q -19,-19 -19,-45 0,-27 19,-46 l 90,-90 q 19,-19 46,-19 26,0 45,19 L 768,459 949,278 q 19,-19 45,-19 27,0 46,19 l 90,90 q 19,19 19,46 z m 387,226 Q 1536,431 1433,254.5 1330,78 1153.5,-25 977,-128 768,-128 559,-128 382.5,-25 206,78 103,254.5 0,431 0,640 0,849 103,1025.5 206,1202 382.5,1305 559,1408 768,1408 977,1408 1153.5,1305 1330,1202 1433,1025.5 1536,849 1536,640 z"/>
                  </svg>
                </span>
              </div>
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
            <div>
              {this.seatsBuilder()}
            </div>
          </div>
        </ToastBody>
      </Toast>
    );
  }
}

export default ItemInCart;