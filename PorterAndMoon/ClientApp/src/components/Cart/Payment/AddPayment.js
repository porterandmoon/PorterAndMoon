import React from 'react';
import { Label, Input } from 'reactstrap';
import AddCard from './AddDetail/AddCard';
import AddBankInfo from './AddDetail/AddBankInfo';
import AddPaypal from './AddDetail/AddPaypal';

class AddPayment extends React.Component {
  state = {
    paymentType: "Card"
  }

  selectPaymentType = () => {
    if(this.state.paymentType === "Card"){
      return <AddCard AddPaymentToAcct={this.props.AddPaymentToAcct}/>
    } else if (this.state.paymentType === "Bank Account") {
      return <AddBankInfo AddPaymentToAcct={this.props.AddPaymentToAcct} type={this.state.paymentType}/>
    } else if (this.state.paymentType === "Paypal"){
      return <AddPaypal AddPaymentToAcct={this.props.AddPaymentToAcct}/>
    } else {
      return <span>Error</span>
    }
  }


  render() {
    const getValue = () => {
      this.setState({ paymentType: document.getElementById("paymentType").value });
    }
    return(
      <div>
        <Label for="exampleSelect">Payment Type</Label>
        <Input type="select" name="payment type" id="paymentType" onChange={getValue}>
          <option>Card</option>,
          <option>Bank Account</option>,
          <option>Paypal</option>,
        </Input>
        {this.selectPaymentType()}
      </div>
    );
  }
}

export default AddPayment;