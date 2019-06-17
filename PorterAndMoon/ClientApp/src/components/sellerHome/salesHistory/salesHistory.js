import React from 'react';
import {
  Modal, ModalHeader, ModalBody, Button
} from 'reactstrap';
import sellerHomeData from '../../../data/PortAndMoonFactory/sellerHomeData';
import RocketSpace from '../rocketSpace/rocketSpace';
import './salesHistory.scss';

class salesHistory extends React.Component {
  state = {
    modal: false,
    salesInfo: null
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  }

  componentDidMount() {
    sellerHomeData.getSellerHistory(this.props.userId)
      .then((salesInfo) => {
        this.setState({ salesInfo });
      });
  }

  rocketSpaceBuilder = () => {
    if (this.state.salesInfo != null) {
      const renderArray = [];
      Object.keys(this.state.salesInfo).forEach((productId) => {
        const product = this.state.salesInfo[productId];
        renderArray.push(<RocketSpace key={productId} productTitle={product[0].title} numPurchases={product.length}
          productQty={product[0].quantity} remainingQty={product[0].remainingQty} price={product[0].price} purchases={product}/>);
      });
      return renderArray;
    }
  }

  render() {
    return(
      <div className='salesHistory'>
        <Button className='btn btn-info btn-sm' onClick={this.toggle}>Sales History</Button>
        <Modal className='salesHistoryModal' isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader className='salesHistoryM' toggle={this.toggle}>
            Sales History
          </ModalHeader>
          <ModalBody className='salesHistoryM'>
            {this.rocketSpaceBuilder()}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default salesHistory;