import React from 'react';

class MyOrder extends React.Component {

  render() {
/* 
  bankAccountNumber:
  cardHolderName:
  cardNumber:
  date:
  description:
  id:
  isRefunded:
  paymentType:
  paypalReference:
  price:
  quantityOrdered:
  seller:
  title:
  type:
*/

    const paymentSorter = (order) => {
      if(order.bankAccountNumber !== null){
        return <p className="card-text">Account: {order.bankAccountNumber}</p>
      }
      if(order.cardNumber !== null){
        return(<p className="card-text">
                <div>Card Holder: {order.cardHolderName}</div>
                <div>Card: {order.cardNumber}</div>
              </p>)
      }
      if(order.paypalReference !== null){
        return <p className="card-text">Paypal Reference #: {order.paypalReference}</p>
      }
    }

    return (
      <div className="card">
        <div className="card-body">
          <p className="card-text">Date: {this.props.order.date}</p>
          <p className="card-text">Refunded: {this.props.order.isRefunded}</p>
          <p className="card-text">Quantity: {this.props.order.quantityOrdered}</p>
          <p className="card-text">Price: {this.props.order.price}</p>
          <p className="card-text">Title: {this.props.order.title}</p>
          <p className="card-text">Description: {this.props.order.description}</p>
          <p className="card-text">Seller: {this.props.order.seller}</p>
          <p className="card-text">Type: {this.props.order.type}</p>
          <p className="card-text">Payment Type: {this.props.order.paymentType}</p>
          {paymentSorter(this.props.order)}
        </div>
      </div>
    );
  }
}

export default MyOrder;