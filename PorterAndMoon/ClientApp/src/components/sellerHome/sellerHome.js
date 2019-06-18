import React from 'react';
import sellerHomeData from '../../data/PortAndMoonFactory/sellerHomeData';
import RocketSpace from './rocketSpace/rocketSpace';
import SalesHistory from './salesHistory/salesHistory';
import AddFlight from './addFlight/addFlight';
import './sellerHome.scss';

class sellerHome extends React.Component {
  state = {
    orderInfo: null
  }
  
  componentDidMount() {
    sellerHomeData.getSellerOrders(this.props.currentUser.id)
      .then((orderInfo) => {
        this.setState({ orderInfo });
      });
  }

  rocketSpaceBuilder = () => {
    if (this.state.orderInfo != null) {
      const renderArray = [];
      Object.keys(this.state.orderInfo).forEach((productId) => {
        const product = this.state.orderInfo[productId];
        renderArray.push(<RocketSpace key={productId} productTitle={product[0].title} numPurchases={product.length}
          productQty={product[0].quantity} remainingQty={product[0].remainingQty} price={product[0].price} purchases={product}/>);
      });
      return renderArray;
    }
  }

  viewHistory = () => {

  }

  render() {
    return(
      <div className='sellerHome'>
        <div className='currentRockets'>
          <h5 className='rocketSpaceHeader'>Your Current Rocketspace For Sell</h5>
          <div className='rocketSpaceContainer'>
            {this.rocketSpaceBuilder()}
          </div>
        </div>
        <div className='dashboard'>
          <p>dashboard</p>
          <div className='sellerBtnDiv'>
            <AddFlight userId={this.props.currentUser.id}/>
            <SalesHistory userId={this.props.currentUser.id}/>
          </div>
        </div>
      </div>
    );
  }
}

export default sellerHome;