import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import AddPayment from './AddPayment';
import PaymentType from '../../../data/PortAndMoonFactory/Payment';
import SinglePaymentType from './SinglePaymentType';
import './Payment.scss';

class Payment extends React.Component{
  state = {
    paymentTypes: {},
    modal:false,
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  PopulatePayments = () => {
    PaymentType.getPaymentTypes(this.props.currentUser.id)
    .then((res) => {
      var paymentTypes = res.data;
      this.setState({ paymentTypes });
    })
    .catch((err) => console.error(err));
  }

  componentDidMount(){
    this.PopulatePayments();
  }

  AddPaymentToAcct = (e, currentState) => {
    e.preventDefault();
    currentState.customerId = this.props.currentUser.id;
    if(currentState.type !== "BankAccount" && currentState.type !== "PayPal"){
      currentState.Name = `${currentState.cardFirstName} ${currentState.cardLastName}`;
    }

    PaymentType.addPayment(currentState)
      .then(() => {
        this.PopulatePayments();
      })
      .catch((err) => console.error(err));
  }


  render() {
    if(this.state.paymentTypes !== null ){
      if(this.state.paymentTypes.length > 0){
        return (
          <div>
            <Button color="info" onClick={this.toggle}>Purchase</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Choose Your Payment</ModalHeader>
              <ModalBody>
              {this.state.paymentTypes
                .map(payment => <SinglePaymentType
                                  toggle={this.toggle}
                                  paymentInfo={payment}
                                  currentUser={this.props.currentUser}
                                  checkCart={this.props.checkCart}
                                  key={payment.id}/>)}
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        )
      }
    }
    return(
      <div>
        <Button color="outline-warning" onClick={this.toggle}>Purchase</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <AddPayment AddPaymentToAcct={this.AddPaymentToAcct}/>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        
      </div>
    );
  }
}

export default Payment;