import React from 'react';

class ProductDetail extends React.Component {
  render() {
    return (
      <div className="product-detail-item">
        <div className="order-product-detail-container">
          <p className="ordered-product-title">Flight #<span className="product-title">{this.props.detail.title}</span></p>
          <p className="card-text">details: {this.props.detail.description}</p>
        </div>
        <p className="card-text order-sold-by">Sold by {this.props.detail.seller}</p>
        <div className="order-product-detail-container">
          <p>Quantity x Price</p>
          <p className="card-text">
            {this.props.detail.quantityOrdered} x {this.props.revealCurrency(this.props.detail.price)} = {this.props.revealCurrency((this.props.detail.quantityOrdered * this.props.detail.price))}
          </p>
        </div>
      </div>
    );
  }
}

export default ProductDetail;