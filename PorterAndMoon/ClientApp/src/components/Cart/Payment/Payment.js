import React from 'react';
import PaymentType from '../../../data/PortAndMoonFactory/Payment';
import SinglePaymentType from './SinglePaymentType';
import './Payment.scss';

class Payment extends React.Component{
  state = {
    paymentTypes: {}
  }

  componentDidMount(){
    PaymentType.getPaymentTypes(this.props.currentUser.id)
      .then((res) => {
        var paymentTypes = res.data;
        this.setState({ paymentTypes });
      })
      .catch((err) => console.error(err));
  }


  render() {
    if(this.state.paymentTypes !== null ){
      if(this.state.paymentTypes.length > 0){
        return (
          <div>
            {this.state.paymentTypes.map(payment => <SinglePaymentType paymentInfo={payment}/>)}
          </div>
        )
      }
    }
    return(
      <div>payment</div>
    );
  }
}

export default Payment;