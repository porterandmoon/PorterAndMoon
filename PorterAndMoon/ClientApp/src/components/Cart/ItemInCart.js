import React from 'react';
// Fancy style used for info. I'm using it wrong (in the sense of styling), but it looks good.
import {
  Toast,
  ToastBody,
  ToastHeader,
} from 'reactstrap';

class ItemInCart extends React.Component {
  seatsBuilder = () => {
    if (this.props.seats.length > 0) {
      const renderArray = [<p>Your Seats</p>];
      this.props.seats.forEach((seat) => {
        renderArray.push(<div key={seat.seatNumber}>
          <p>{seat.seatType}</p>
          <p>Seat number: {seat.seatNumber}</p>
        </div>);
      });
      return renderArray;
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
    
    const dateFormatter = (datetime) => {
      const date = new Date(datetime);
      const month = date.getMonth();
      const day = date.getDate();
      const year = date.getFullYear();

      const dateString = `${month}/${day}/${year}`;

      return dateString
    }

    const timeFormatter = (datetime) => {
      const date = new Date(datetime);
      let hour = date.getHours();
      let minute = date.getMinutes();
      let tod;

      if(hour === 0){
        hour = 12;
        tod = "am";
      } else if(0 < hour < 12) {
        tod = "am";
      } else {
        hour = (hour-12);
        tod = "pm";
      }

      if(minute === 0){
        minute = "00";
      }

      const dateString = `${hour}:${minute} ${tod}`;

      return dateString
    }

    return(
      <Toast>
        <ToastHeader>
          <div className="cart-item-header">
            <div>Takeoff: {dateFormatter(departure)} at {timeFormatter(departure)}</div>
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
                <div>Takeoff: {dateFormatter(departure)} at {timeFormatter(departure)}</div>
                <div>Planet of Origin: {origin}</div>
              </div>
              <div className="cart-item-touchdown">
                <div>Touchdown: {dateFormatter(arrival)} at {timeFormatter(arrival)}</div>
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