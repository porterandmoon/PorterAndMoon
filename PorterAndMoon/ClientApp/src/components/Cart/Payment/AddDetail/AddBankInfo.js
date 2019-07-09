import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddBankInfo extends React.Component {
  state = {
    type: "BankAccount",
    routingNumber: "",
    bankAccountNumber: ""
  }

  render() {
    const getValue = (e) => {
      this.setState({ [e.target.id]: e.target.value} );
    }

    return(
      <Form onSubmit={(e) => this.props.AddPaymentToAcct(e, this.state)}>
      <FormGroup>
        <Label for="routingNumber">Bank Routing Number</Label>
        <Input type="text" name="routingNumber" id="routingNumber" onChange={getValue}/>
      </FormGroup>
      <FormGroup>
        <Label for="bankAccountNumber">Bank Account Number</Label>
        <Input type="text" name="bankAccountNumber" id="bankAccountNumber" onChange={getValue}/>
      </FormGroup>
      <Button>Submit</Button>
    </Form>

    );
  }
}

export default AddBankInfo;