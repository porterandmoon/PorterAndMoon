import React from 'react';

class ProductDetail extends React.Component {
  render() {

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

    const orderTotal = (quant, price) => {
      const total = (quant * price).toFixed(2);
      const locale = document.documentElement.lang;
      const currency = total.toLocaleString(locale, { currency: "USD"});

      return currency;
    }

    return (
      <div>
        <p>{
          orderSummary(
            this.props.detail.quantityOrdered,
            this.props.detail.type,
            this.props.detail.title
            )
          }
        </p>
        <p className="card-text">detail: {this.props.detail.description}</p>
        <p className="card-text">Sold by {this.props.detail.seller}</p>
        <p className="card-text">Quantity: {this.props.detail.quantityOrdered}</p>
        <p className="card-text">Price: {this.props.detail.price}</p>
        <p className="card-text">Total: ${orderTotal(this.props.detail.quantityOrdered, this.props.detail.price)}</p>
      </div>
    );
  }
}

export default ProductDetail;