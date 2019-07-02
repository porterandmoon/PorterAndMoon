import React from 'react';
import { Button, Form } from 'reactstrap';

class AddPaypal extends React.Component {
  state = {
    type: "PayPal",
    payPalAuth: (Math.random().toString(36).substr(2, 5) + 1),
  }

  render() {
    const fakePaypal = () => {
      window.alert("this won't actually add your paypal stuff... Sorry")
    }
    return(
      <Form onSubmit={(e) => this.props.AddPaymentToAcct(e, this.state)}>
        <img src="http://www.userlogos.org/files/paypal-circle-png.png" onClick={fakePaypal}/>
        <Button>Submit</Button>
      </Form>

    );
  }
}

export default AddPaypal;