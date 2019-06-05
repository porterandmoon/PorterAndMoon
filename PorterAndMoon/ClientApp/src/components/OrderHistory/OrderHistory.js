import React from 'react';
import OrderHistoryList from '../../data/PortAndMoonFactory/OrderHistory';
import MyOrder from './MyOrder';
import './OrderHistory.scss';

class OrderHistory extends React.Component {
  state = {
    orders: []
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

    const listOrders = () => {
      const orders = this.state.orders;
      if(orders.length > 0) {
        return orders.map(order => <MyOrder order={order} key={order.id}/>);
      }
    }
    
    return(
      <div className="order-container">
        hello
        { listOrders() }
      </div>
    );
  }
}

export default OrderHistory;