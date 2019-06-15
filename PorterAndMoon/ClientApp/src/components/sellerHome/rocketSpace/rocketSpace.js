import React from 'react';
import './rocketSpace.scss';

class rocketSpace extends React.Component {
  state = {
    expanded: false
  }

  plusMinus = (event) => {
    event.preventDefault();
    this.setState({ expanded: !this.state.expanded });
  }

  purchasesBuilder = () => {
    return <table class="table purchasesTable">
    <thead>
      <tr>
        <th scope="col">Username</th>
        <th scope="col">Name</th>
        <th scope="col">Purchased Quantity</th>
        <th scope="col">Purchase Date</th>
        <th scope="col">Refund Status</th>
      </tr>
    </thead>
    <tbody>
      {this.purchaseUnitBuilder()}
    </tbody>
  </table>;
  }

  purchaseUnitBuilder = () => {
    const renderArray = [];
    this.props.purchases.forEach((purchase) => {
      renderArray.push(<tr key={purchase.username}>
        <th scope="col">{purchase.username}</th>
        <th scope="col">{purchase.firstName} {purchase.lastName}</th>
        <th scope="col">{purchase.purchasedQty}</th>
        <th scope="col">{purchase.date}</th>
        <th scope="col">{purchase.isRefunded ? 'Refunded' : 'Not Refunded'}</th>
      </tr>);
    })
    return renderArray;
  }

  render() {
    return(
      <div className='rocketSpaceC'>
        <div className='rocketSpaceProductHeader'>
          
          <p className='rocketSpaceProduct'>Flight #: {this.props.productTitle}</p>
          <p className='rocketSpaceProduct'>Total Quantity: {this.props.productQty}</p>
          <p className='rocketSpaceProduct'>Remaining Quantity: {this.props.remainingQty}</p>
          <p className='rocketSpaceProduct'>Price: {this.props.price}</p>
        </div>
        <div className='rocketSpaceNum'>
          <button onClick={this.plusMinus} className='plusMinusButton'>{this.state.expanded ? '-' : '+'}</button>
          <p className='rocketSpaceNumText'>{this.props.numPurchases} Total Purchases</p>
        </div>
        {this.state.expanded ? this.purchasesBuilder() : null}
      </div>
    );
  }
}

export default rocketSpace;