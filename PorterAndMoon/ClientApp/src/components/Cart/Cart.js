import React from 'react';
import ShoppingCart from '../../data/PortAndMoonFactory/ShoppingCart';
import ItemInCart from './ItemInCart';
import Payment from './Payment/Payment';
import './Cart.scss';

class Cart extends React.Component {
  state = {
    cart: {
      itemsInCart: [],
    }
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

  // loops over each product and displays them separately
  ShowItems = () => {
    if(this.state.cart !== null && this.state.cart.itemsInCart !== undefined){
      return (
        <div>
          <Payment currentUser={this.props.currentUser} checkCart={this.CheckCart}/>
          {this.itemBuilder()}
        </div>)
    } else {
      return <h2>Your cart it empty!</h2>
    }
  }

  itemBuilder = () => {
    const renderArray = [];
    Object.keys(this.state.cart.itemsInCart).forEach((productId) => {
      const items = this.state.cart.itemsInCart[productId];

      const seatsArray = [];
      if (items[0].type === 2) {
        items.forEach((purchase) => {
          seatsArray.push({ seatType: purchase.seatType, seatNumber: purchase.seatNumber });
        });
      }
      
      renderArray.push(<ItemInCart seats={seatsArray} cartItem={items[0]} key={items[0].ordProdId} RemoveItem={this.RemoveItem} CheckCart={this.CheckCart}/>)
    });
    return renderArray;
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