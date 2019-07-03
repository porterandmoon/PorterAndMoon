import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class AddedModal extends React.Component {

  toCart = () => {
    this.props.toggle();
    this.props.history.push('/cart');
  }

  toHome = () => {
    this.props.toggle();
    this.props.history.push('/homel');
  }

  render() {
    return(
      <div>
        <Modal isOpen={this.props.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader className="add-modal-title" toggle={this.toggle}>Item added to cart!</ModalHeader>
          <ModalBody className="add-modal-success-body">
            <Button className="add-modal-go-to-cart" color="secondary" onClick={this.toCart}>Go to Cart</Button>
            <Button color="primary" onClick={this.toHome}>Continue Shopping</Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AddedModal;