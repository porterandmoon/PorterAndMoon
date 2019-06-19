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

  CheckCart = () => {
    ShoppingCart.getCartItems(this.props.currentUser.id)
    .then((res) => {
      const cart = res.data;
      this.setState({ cart });
    })
    .catch((err) => console.error(err));
  }

  componentDidMount(){
    this.CheckCart();
  }

  ShowItems = () => {
    if(this.state.cart.itemsInCart.length > 0){
      return this.state.cart.itemsInCart
        .map(cartItem => <ItemInCart
            cartItem={cartItem}
            key={cartItem.ordProdId}
            RemoveItem={this.RemoveItem}
            CheckCart={this.CheckCart}
          />);
    } else {
      return <h2>Your cart it empty!</h2>
    }
  }

  RemoveItem(ordProdId){
    ShoppingCart.removeCartItem(ordProdId)
      .then((res) => {
        if(res.status === 204){
          this.CheckCart();
        }
      })
      .catch((err) => console.error(err));
  }

  render() {
    return(
      <div className="container">
        {this.ShowItems()}
      </div>
    );
  }
}

export default Cart;