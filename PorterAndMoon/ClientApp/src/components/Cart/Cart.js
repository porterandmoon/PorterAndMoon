import React from 'react';
import ShoppingCart from '../../data/PortAndMoonFactory/ShoppingCart';
import ItemInCart from './ItemInCart';
import Payment from './Payment/Payment';
import './Cart.scss';

class Cart extends React.Component {
  state = {
    cart: {
      itemsInCart: {},
    },
  }

  // sets state to use current cart and display items in the cart
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

  PurchaseClick = (e) => {
    var x = this.props.currentUser.id;
    console.log(x);
    ShoppingCart.purchaseItemsInCart(x)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
    e.preventDefault();
  }

  // loops over each product and displays them separately
  ShowItems = () => {
    if(this.state.cart.itemsInCart.length > 0 ){
      return (
        <div>
          <button
            className="btn btn-outline-warning" 
            onClick={this.PurchaseClick}>
              Purchase
          </button>
          <Payment currentUser={this.props.currentUser} />
          {this.state.cart.itemsInCart
            .map(cartItem => <ItemInCart
                cartItem={cartItem}
                key={cartItem.ordProdId}
                RemoveItem={this.RemoveItem}
                CheckCart={this.CheckCart}
            />)}
        </div>)
    } else {
      return <h2>Your cart it empty!</h2>
    }
  }

  // remove item from cart function
  RemoveItem(ordProdId){
    ShoppingCart.removeCartItem(ordProdId)
      .then((res) => {
        // status code will be 204 if this executes successfully
        if(res.status === 204){
          // re-sets state to reflect current cart products
          this.CheckCart();
        }
      })
      .catch((err) => console.error(err));
  }

  render() {
    return(
      <div className="container">
        {/* prints each individual item in cart to the page */}
        {this.ShowItems()}
      </div>
    );
  }
}

export default Cart;