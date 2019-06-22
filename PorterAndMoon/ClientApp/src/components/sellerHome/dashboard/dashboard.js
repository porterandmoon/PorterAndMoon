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
      return <div className='currentMonthDataDiv'>
        <h5 className='monthlyTitle'>Monthly Sales</h5>
        <div className='monthlyUnit'>   
          <p className='monthlyDataTitle'>Total Sales:</p>
          <p className='monthlyData'>{sales.total}</p>
        </div>
        <div className='monthlyUnit'>
          <p className='monthlyDataTitle'>Number of Purchases:</p>
          <p className='monthlyData'>{sales.quantity}</p>
        </div>
        <div className='monthlyUnit'>
          <p className='monthlyDataTitle'>Average per Flight:</p>
          <p className='monthlyData'>{(sales.total / this.state.numRocketsMonth).toFixed(2)}</p>
        </div>
        <div className='monthlyUnit'>
          <p className='monthlyDataTitle'>Number of Customers:</p>
          <p className='monthlyData'>{sales.customers.length}</p>
        </div>
        <div className='monthlyUnit'>
          <p className='monthlyDataTitle'>Average Purchase:</p>
          <p className='monthlyData'>{(sales.total / sales.quantity).toFixed(2)}</p>
        </div>
        <div className='monthlyUnit'>
          <p className='monthlyDataTitle'>Average per Customer:</p>
          <p className='monthlyData'>{(sales.total / sales.customers.length).toFixed(2)}</p>
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
      return <div className='totalDataDiv'>
        <h5 className='monthlyTitle'>Lifetime Totals</h5>
        <div className='monthlyUnit'>   
          <p className='monthlyDataTitle'>Total Sales:</p>
          <p className='monthlyData'>{sales.total}</p>
        </div>
        <div className='monthlyUnit'>
          <p className='monthlyDataTitle'>Number of Purchases:</p>
          <p className='monthlyData'>{sales.quantity}</p>
        </div>
        <div className='monthlyUnit'>
          <p className='monthlyDataTitle'>Average per Flight:</p>
          <p className='monthlyData'>{(sales.total / this.state.numRockets).toFixed(2)}</p>
        </div>
        <div className='monthlyUnit'>
          <p className='monthlyDataTitle'>Number of Customers:</p>
          <p className='monthlyData'>{sales.customers.length}</p>
        </div>
        <div className='monthlyUnit'>
          <p className='monthlyDataTitle'>Average Purchase:</p>
          <p className='monthlyData'>{(sales.total / sales.quantity).toFixed(2)}</p>
        </div>
        <div className='monthlyUnit'>
          <p className='monthlyDataTitle'>Average per Customer:</p>
          <p className='monthlyData'>{(sales.total / sales.customers.length).toFixed(2)}</p>
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