import React from 'react';
import './rocketSpace.scss';

class rocketSpace extends React.Component {
  state = {
    expanded: false
  }

  hovered = (event) => {
    event.preventDefault();
    const link = event.currentTarget;
    if (link.className.includes(' hovered') === false) {
      link.className += ' hovered';
    }
  }

  hoveredOut = (event) => {
    event.preventDefault();
    const link = event.currentTarget;
    if (link.className.includes(' hovered')) {
      link.className = link.className.replace(' hovered', '');
    }
  }

  plusMinus = (event) => {
    event.preventDefault();
    this.setState({ expanded: !this.state.expanded });
  }

  orderDetails = (event) => {
    
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
      renderArray.push(<tr key={purchase.username} onMouseEnter={this.hovered} onMouseLeave={this.hoveredOut} onClick={this.orderDetails}>
        <th scope="col">{purchase.username}</th>
        <th scope="col">{purchase.firstName} {purchase.lastName}</th>
        <th scope="col">{purchase.purchasedQty}</th>
        <th scope="col">{purchase.date.replace('T00:00:00', '')}</th>
        <th scope="col">{purchase.isRefunded ? 'Refunded' : 'Not Refunded'}</th>
      </tr>);
    })
    return renderArray;
  }

  render() {
    return(
      <div className='rocketSpaceC'>
        <div className='rocketSpaceProductHeader'>
          {this.props.purchases[0].purchasedQty !== 0 ? 
          <button onClick={this.plusMinus} className='plusMinusButton'>{this.state.expanded ? '-' : '+'}</button> : <div className='placeholder'></div>}
          <p className='rocketSpaceProduct'>Flight #: {this.props.productTitle}</p>
          <p className='rocketSpaceProductQty'>Total Quantity: {this.props.productQty}</p>
          <p className='rocketSpaceProductQty'>Remaining Quantity: {this.props.remainingQty}</p>
          <p className='rocketSpaceProduct'>Price: {this.props.price}</p>
          <p className='rocketSpaceProduct'>{this.props.numPurchases} Purchases</p>
        </div>
        {this.state.expanded ? this.purchasesBuilder() : null}
      </div>
    );
  }
}

export default rocketSpace;