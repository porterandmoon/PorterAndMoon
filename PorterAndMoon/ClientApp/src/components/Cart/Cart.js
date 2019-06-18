import React from 'react';
import ShoppingCart from '../../data/PortAndMoonFactory/ShoppingCart';
import ItemInCart from './ItemInCart';
import './Cart.scss';

class Cart extends React.Component {
  state = {
    cart: {
      itemsInCart: [],
    },
  }

  componentDidMount(){
    ShoppingCart.getCartItems(this.props.currentUser.id)
      .then((res) => {
        const cart = res.data;
        this.setState({ cart });
      })
      .catch((err) => console.error(err));
  }

  ShowItems = () => {
    if(this.state.cart.itemsInCart.length > 0){
      return this.state.cart.itemsInCart.map(cartItem => <ItemInCart cartItem={cartItem} key={cartItem.id} />);
    } else {
      return <h2>Your cart it empty!</h2>
    }
  }

  render() {
    return(
      <div>
        <p>cart</p>
        {this.ShowItems()}
      </div>
    );
  }
}

export default Cart;