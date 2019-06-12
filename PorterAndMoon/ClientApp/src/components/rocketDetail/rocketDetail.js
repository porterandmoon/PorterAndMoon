import React from 'react';
import ShoppingCart from '../../data/PortAndMoonFactory/ShoppingCart';
import './rocketDetail.scss';

class rocketDetail extends React.Component {

  componentDidMount(){
    ShoppingCart.currentProduct(this.props.location.search)
      .then((res) => {
        var data = res.data;
        this.setState({ data })
    })
      .catch((err) => console.error(err));
  }

  render() {
    return(
      <div className='rocketDetail'>
        <h1>ROCKET DETAIL PAGE</h1>
        <button className="btn btn-light">Add Product</button>
      </div>
    );
  }
}

export default rocketDetail;