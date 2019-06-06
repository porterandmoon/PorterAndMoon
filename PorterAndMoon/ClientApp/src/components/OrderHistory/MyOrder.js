import React from 'react';

class MyOrder extends React.Component {

  render() {

    return (
      <div className="card">
        <div className="card-body">
          <p className="card-text">Date: {this.props.order.date}</p>
          <p className="card-text">Refunded {this.props.order.isRefunded}</p>
          <p className="card-text">Itemization w/ quantity and product</p>
          <p className="card-text">Payment info redacted</p>
        </div>
      </div>
    );
  }
}

export default MyOrder;