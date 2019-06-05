import React from 'react';
import OrderHistoryList from '../../data/PortAndMoonFactory/OrderHistory';
import './OrderHistory.scss';

class OrderHistory extends React.Component {
  state = {
    orders: undefined
  }

  componentDidMount() {
    OrderHistoryList.getCompletedOrders()
      .then(res => {
        if(res.status === 200){
          this.setState({ orders: res.data })
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    return(
      <div className="order-container">
        hello
      </div>
    );
  }
}

export default OrderHistory;