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
                <h1>Flight Details</h1>
                <Link to={`/seat/${product.product.title}/?Id=${product.product.id}`}>{product.product.title}</Link>
                <p>{product.product.description}</p>
                <p>${product.product.price}</p>
                <p>Qty: {product.product.remainingQty}</p>
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