import React from 'react';

import productData from '../../data/PortAndMoonFactory/allProductData';


class ProductDetail extends React.Component {
    state = { 
        details: '',
    }

     executeProductSearch = () => {
        productData.getProductById()
        .then((responseData) => {
            this.setState({ details: responseData})
            // buildProduct(this.state.details)
        })
        .catch((err) => console.error(err));
    };
    

    // buildProduct = (details) => {
    //     if (this.state.details !== null) {
    //     return <div>
    //         <h3>{details.title}</h3>
    //         <p>{details.description}</p>
    //         <p>{details.price}</p>
    //         <p>{details.quantitiy}</p>
    //         </div>
    //     }
    // }

    render() {

        return (
            <div className="productDetail">
                <h3>{this.state.details.title}</h3>
                <p>{this.state.details.description}</p>
                <p>{this.state.details.price}</p>
                <p>{this.state.details.quantitiy}</p>
                
            </div>
        );
    }
    
}

export default ProductDetail;