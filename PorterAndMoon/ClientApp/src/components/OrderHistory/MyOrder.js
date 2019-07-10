import React from 'react';
import ProductDetail from './ProductDetail'
import './MyOrder.scss';

class MyOrder extends React.Component {

  revealCurrency = (moneyAmount) => {
    return moneyAmount.toLocaleString('en-US', {style: 'currency', currency:'USD'})
  }


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

    const total = () => {
      let sumTotal = 0;
      const items = this.props.order.productDetail;

      for(let i=0; i < items.length; i++){
        sumTotal += (items[i].price * items[i].quantityOrdered);
      }

      return this.revealCurrency(sumTotal);
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
      return this.props.order.productDetail.map(product => <ProductDetail detail={product} revealCurrency={this.revealCurrency}/>);
    }

    const showMoreDetail = (e) => {
      const clickedCard = e.currentTarget;
      if(clickedCard.classList.contains("order-card")){
        clickedCard.classList.replace("order-card", "order-card-expanded")
      } else {
        clickedCard.classList.replace("order-card-expanded", "order-card")
      }
    }

    return (
      <div className="card order-card" onClick={showMoreDetail}>
        <div className="card-body">
          <div className="history-detail">
            <p className="card-text">{dateFormatter(this.props.order.date)}</p>
            <div className="list-products-container">
              {listProducts()}
            </div>
            <p className="card-text">TOTAL: {total()}</p>
            <p className="card-text">Payment Type: {this.props.order.paymentType}</p>
            {paymentSorter(this.props.order)}
          </div>
        </div>
      </div>
    );
  }
}

export default MyOrder;