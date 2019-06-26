import React from 'react';
import ShoppingCart from '../../../data/PortAndMoonFactory/ShoppingCart';
import { Button } from 'reactstrap';

class SinglePaymentType extends React.Component {

  PurchaseClick = (e) => {
    const purchase = { UserId: this.props.currentUser.id, PaymentId: this.props.paymentInfo.id }
    ShoppingCart.purchaseItemsInCart(purchase)
      .catch((err) => console.error(err));
    e.preventDefault();
  }

  ExecuteOrder = (e) => {
    this.props.toggle();
    this.PurchaseClick(e);
  }

  render(){
    var PaymentKeys = Object.keys(this.props.paymentInfo);
    var PaymentHTML = [];

    for(var i = 0; i < PaymentKeys.length; i++){
      var PaymentDetail = PaymentKeys[i];
      if(this.props.paymentInfo[PaymentDetail] !== undefined && this.props.paymentInfo[PaymentDetail] !== null){
        PaymentHTML.push(<div key={this.props.paymentInfo[PaymentDetail]}>{PaymentDetail}: {this.props.paymentInfo[PaymentDetail]}</div>)
      }
    }

    return(
      <div>
        {PaymentHTML}
        <Button color="success" onClick={this.ExecuteOrder}>Choose this payment</Button>
      </div>
    );
  }
}

export default SinglePaymentType;