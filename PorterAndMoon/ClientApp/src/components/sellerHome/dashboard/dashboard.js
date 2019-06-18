import React from 'react';
import sellerHomeData from '../../../data/PortAndMoonFactory/sellerHomeData';
import './dashboard.scss';

class dashboard extends React.Component {
  state = {
    currentMonthSales: null,
    totalSales: null,
    numRockets: 0,
    numRocketsMonth: 0
  }

  componentDidMount() {
    sellerHomeData.getMonthSales(this.props.userId)
      .then((currentMonthSales) => {
        this.setState({ currentMonthSales });
      });
    sellerHomeData.getAllSales(this.props.userId)
      .then((totalSales) => {
        this.setState({ totalSales });
      })
    sellerHomeData.getNumRockets(this.props.userId)
      .then((numRockets) => {
        this.setState({ numRockets });
      });
      sellerHomeData.getNumRocketsMonth(this.props.userId)
      .then((numRocketsMonth) => {
        this.setState({ numRocketsMonth });
      });
  }

  currentMonthBuilder = () => {
    if (this.state.currentMonthSales != null) {
      const sales = this.monthTotalizer();
      return <div>
        <h5 className='monthlyTitle'>Monthly Sales</h5>
        <div className='monthlyUnit'>   
          <p>Total Sales:</p>
          <p>{sales.total}</p>
        </div>
        <div className='monthlyUnit'>
          <p>Number of Purchases:</p>
          <p>{sales.quantity}</p>
        </div>
        <div className='monthlyUnit'>
          <p>Average per Flight:</p>
          <p>{sales.total / this.state.numRocketsMonth}</p>
        </div>
        <div className='monthlyUnit'>
          <p>Number of Customers:</p>
          <p>{sales.customers.length}</p>
        </div>
        <div className='monthlyUnit'>
          <p>Average Purchase:</p>
          <p>{sales.total / sales.quantity}</p>
        </div>
        <div className='monthlyUnit'>
          <p>Average per Customer:</p>
          <p>{sales.total / sales.customers.length}</p>
        </div>
      </div>
    }
  }

  monthTotalizer = () => {
    let sales = {
      total: 0,
      quantity: 0,
      customers: []
    };
    Object.keys(this.state.currentMonthSales).forEach((productId) => {
      const product = this.state.currentMonthSales[productId];
      product.forEach((sale) => {
        sales.total+= (sale.price * sale.purchasedQty);
        sales.quantity+= 1;
        if (!sales.customers.includes(sale.customerId)) {
          sales.customers.push(sale.customerId);
        }
      });
    });
    return sales;
  }

  totalSalesBuiler = () => {
    if (this.state.totalSales != null) {
      const sales = this.totalizer();
      return <div>
        <h5 className='monthlyTitle'>Lifetime Totals</h5>
        <div className='monthlyUnit'>   
          <p>Total Sales:</p>
          <p>{sales.total}</p>
        </div>
        <div className='monthlyUnit'>
          <p>Number of Purchases:</p>
          <p>{sales.quantity}</p>
        </div>
        <div className='monthlyUnit'>
          <p>Average per Flight:</p>
          <p>{sales.total / this.state.numRockets}</p>
        </div>
        <div className='monthlyUnit'>
          <p>Number of Customers:</p>
          <p>{sales.customers.length}</p>
        </div>
        <div className='monthlyUnit'>
          <p>Average Purchase:</p>
          <p>{sales.total / sales.quantity}</p>
        </div>
        <div className='monthlyUnit'>
          <p>Average per Customer:</p>
          <p>{sales.total / sales.customers.length}</p>
        </div>
      </div>
    }
  }

  totalizer = () => {
    let sales = {
      total: 0,
      quantity: 0,
      customers: []
    };
    Object.keys(this.state.totalSales).forEach((productId) => {
      const product = this.state.totalSales[productId];
      product.forEach((sale) => {
        sales.total+= (sale.price * sale.purchasedQty);
        sales.quantity+= 1;
        if (!sales.customers.includes(sale.customerId)) {
          sales.customers.push(sale.customerId);
        }
      });
    });
    return sales;
  }

  render() {
    return(
      <div className='dashboardC'>
        {this.currentMonthBuilder()}
        {this.totalSalesBuiler()}
      </div>
    );
  }
}

export default dashboard;