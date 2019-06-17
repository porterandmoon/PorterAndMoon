import React from 'react';
import ShoppingCart from '../../data/PortAndMoonFactory/ShoppingCart';
import './Cart.scss';

class Cart extends React.Component {

  componentDidMount(){
    ShoppingCart.getCartItems(1)
      .then((res) => {
        const cart = res.data;
        this.setState({ cart });
      })
      .catch((err) => console.error(err));
  }

  render() {
    return(
      <div>
        <p>cart</p>
      </div>
    );
  }
}

export default Cart;