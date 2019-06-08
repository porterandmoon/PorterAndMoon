import React from 'react';
import RefundInfo from './RefundInfo';
import './MyOrder.scss';

class MyOrder extends React.Component {

  render() {
    const paymentSorter = (order) => {
      if(order.bankAccountNumber !== null){
        return <p className="card-text">Account: {order.bankAccountNumber}</p>
      }
      if(order.cardNumber !== null){
        return(<div className="card-text">
                <p>Card Holder: {order.cardHolderName}</p>
                <p>Card: {order.cardNumber}</p>
              </div>)
      }
      if(order.paypalReference !== null){
        return <p className="card-text">Paypal Reference #: {order.paypalReference}</p>
      }
    }

    const orderTotal = () => {
      const total = (this.props.order.quantityOrdered * this.props.order.price).toFixed(2);
      const locale = document.documentElement.lang;
      const currency = total.toLocaleString(locale, { currency: "USD"});

      return currency;
    }

    const dateFormatter = (datetime) => {
      const date = new Date(datetime);
      const month = date.getMonth();
      const day = date.getDate();
      const year = date.getFullYear();

      const dateString = `Purchased on ${month}/${day}/${year}`;

      return dateString
    }

    const orderSummary = (orderQuantity, productType, productTitle) => {
      switch(productType){
        case "Passenger" : {
          return `${orderQuantity} seats on ${productTitle}`;
        }

        case "Cargo Hold" : {
          return `${orderQuantity} with ${productTitle}`;
        }

        case "First Class Passenger" : {
          return `${orderQuantity} first class accommodation on ${productTitle}`;
        }

        default: {
          return `${orderQuantity} on ${productTitle}`;
        }
      }
    }

    return (
      <div className="card">
        <div className="card-body">
          <p className="">{
            orderSummary(
              this.props.order.quantityOrdered,
              this.props.order.type,
              this.props.order.title
              )
            }
          </p>
          <p className="card-text">{dateFormatter(this.props.order.date)}</p>
          <p className="card-text">detail: {this.props.order.description}</p>
          <p className="card-text">Sold by {this.props.order.seller}</p>
          <p className="card-text">Quantity: {this.props.order.quantityOrdered}</p>
          <p className="card-text">Price: {this.props.order.price}</p>
          <p className="card-text">Total: ${orderTotal()}</p>
          <p className="card-text">Payment Type: {this.props.order.paymentType}</p>
          {paymentSorter(this.props.order)}
          <RefundInfo refunded={this.props.order.isRefunded} />
        </div>
      </div>
    );
  }
}

export default MyOrder;