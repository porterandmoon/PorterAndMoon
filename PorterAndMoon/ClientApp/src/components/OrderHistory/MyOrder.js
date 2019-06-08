import React from 'react';
import RefundInfo from './RefundInfo';
import ProductDetail from './ProductDetail'
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


    const dateFormatter = (datetime) => {
      const date = new Date(datetime);
      const month = date.getMonth();
      const day = date.getDate();
      const year = date.getFullYear();

      const dateString = `Purchased on ${month}/${day}/${year}`;

      return dateString
    }


    const listProducts = () => {
      return this.props.order.productDetail.map(product => <ProductDetail detail={product}/>);
    }

    return (
      <div className="card">
        <div className="card-body">
          <p className="card-text">Payment Type: {this.props.order.paymentType}</p>
          {listProducts()}
          <p className="card-text">{dateFormatter(this.props.order.date)}</p>
          {paymentSorter(this.props.order)}
          <RefundInfo refunded={this.props.order.isRefunded} />
        </div>
      </div>
    );
  }
}

export default MyOrder;