import React from 'react';
import {
  Modal, ModalHeader, ModalBody
} from 'reactstrap';
import './orderDetail.scss';

class orderDetail extends React.Component {
  state = {
    modal: false
  }

  detailsBuilder = () => {
    //Renders the order payment details based on the type of payment (payPal, bank account, card, card is default)
    switch (this.props.payType) {
      case 'PayPal' : return <div className='orderDetailsDiv'>
        <div className='orderDetailUnit'>
          <p className='orderDetailText'>Payment: </p>
          <p className='orderDetailText'>{this.props.payType}</p>
        </div>
        <div className='orderDetailUnit'>
          <p className='orderDetailText'>PayPal Account Holder: </p>
          <p className='orderDetailText'>{this.props.payName}</p>
        </div>
      </div>;
      case 'BankAccount' : return <div className='orderDetailsDiv'>
        <div className='orderDetailUnit'>
          <p className='orderDetailText'>Payment: </p>
          <p className='orderDetailText'>{this.props.payType}</p>
        </div>
        <div className='orderDetailUnit'>
          <p className='orderDetailText'>Name on Account: </p>
          <p className='orderDetailText'>{this.props.payName}</p>
        </div>
        <div className='orderDetailUnit'>
          <p className='orderDetailText'>Bank Account Number: </p>
          <p className='orderDetailText'>{this.props.bankAccountNumber}</p>
        </div>
        <div className='orderDetailUnit'>
          <p className='orderDetailText'>Routing Number: </p>
          <p className='orderDetailText'>{this.props.routingNumber}</p>
        </div>
      </div>;
      default : return <div className='orderDetailsDiv'>
        <div className='orderDetailUnit'>
          <p className='orderDetailText'>Payment: </p>
          <p className='orderDetailText'>{this.props.payType}</p>
        </div>
        <div className='orderDetailUnit'>
          <p className='orderDetailText'>Name on Account: </p>
          <p className='orderDetailText'>{this.props.payName}</p>
        </div>
        <div className='orderDetailUnit'>
          <p className='orderDetailText'>Card Number: </p>
          <p className='orderDetailText'>{this.props.cardNumber}</p>
        </div>
        <div className='orderDetailUnit'>
          <p className='orderDetailText'>Expiration Date: </p>
          <p className='orderDetailText'>{this.props.expirationDate.replace('T00:00:00', '')}</p>
        </div>
        <div className='orderDetailUnit'>
          <p className='orderDetailText'>Security Number: </p>
          <p className='orderDetailText'>{this.props.securityNumber}</p>
        </div>
      </div>;
    }
  }

  render() {
    return(
      <div>
        <Modal className='orderDetailModal' isOpen={this.props.modal} toggle={this.props.toggle}>
          <ModalHeader className='orderDetailM' toggle={this.props.toggle}>
            Order Details
          </ModalHeader>
          <ModalBody className='addFlightM'>
            {this.detailsBuilder()}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default orderDetail;