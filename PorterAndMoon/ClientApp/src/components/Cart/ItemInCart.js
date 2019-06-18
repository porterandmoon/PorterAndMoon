import React from 'react';

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
      <div>
        <p>
          <h3>arrival</h3><h2>{arrival}</h2>
          <h3>departure</h3><h2>{departure}</h2>
          <h3>description</h3><h2>{description} </h2>
          <h3>destination</h3><h2>{destination} </h2>
          <h3>isAvailable</h3><h2>{isAvailable}</h2>
          <h3>origin</h3> <h2>{origin}</h2>
          <h3>quantity</h3><h2>{quantity} </h2>
          <h3>remainingQty</h3><h2>{remainingQty} </h2>
          <h3>title</h3><h2>{title} </h2>
          <h3>type</h3><h2>{type}</h2>
        </p>
      </div>
    );
  }
}

export default ItemInCart;