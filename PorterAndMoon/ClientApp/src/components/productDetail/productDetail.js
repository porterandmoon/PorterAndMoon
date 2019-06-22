import React from 'react';
import './productDetail.scss';

class ProductDetail extends React.Component {

    buildProduct = () => {
        const product = this.props;
        console.log(product);
        if (product !== null) {
        return <div className="productDetails">
            <div className="container">
              <div className="col">
                <h1>Flight Details</h1>
                <h3>{product.product.title}</h3>
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