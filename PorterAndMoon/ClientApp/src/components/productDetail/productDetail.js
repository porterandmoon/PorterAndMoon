import React from 'react';
import { Link } from 'react-router-dom';
import './productDetail.scss';

class ProductDetail extends React.Component {

    buildProduct = () => {
        const product = this.props;
        if (product !== null) {
        return <div className="productDetails">
            <div className="container">
              <div className="col">
                <h1>Details for Flight {product.product.title}</h1>
                <p>{product.product.description}</p>
                <p>Departing from {product.product.origin} on {product.product.departure} and Arriving at {product.product.destination} {product.product.arrival}</p>
                <p>Ticket Price ${product.product.price}</p>
                <p><i className="fas fa-ticket-alt"></i>  Qty Available: {product.product.remainingQty}</p>
                </div>
            </div>
            </div>
        }
        else return '';
    }

    render() {

        return (
            <div className="productDetail">
                {this.buildProduct()}
            </div>
        );
    }
    
}

export default ProductDetail;