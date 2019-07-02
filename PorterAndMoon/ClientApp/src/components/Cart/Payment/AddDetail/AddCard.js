import React from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';


class AddCard extends React.Component {
  state = {
    type: "VISA",
    cardNumber: "",
    ExpirationDate: "",
    cardFirstName: "",
    cardLastName: "",
    securityNumber: ""
  }

  render() {
    const getValue = (e) => {
      this.setState({ [e.target.id]: e.target.value} );
    }

    return(
      <Form onSubmit={(e) => this.props.AddPaymentToAcct(e, this.state)}>
        <FormGroup>
          <Label for="cardType">Card Type</Label>
          <Input type="select" name="select" id="cardType" onChange={getValue}>
            <option>VISA</option>,
            <option>MASTER CARD</option>,
            <option>AMEX</option>,
            <option>DISCOVER</option>,
            <option>DINERS INTERNATIONAL</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="cardNumber">Card Number</Label>
          <Input type="text" name="cardNumber" id="cardNumber" placeholder="0000 0000 0000 0000" onChange={getValue}/>
        </FormGroup>
        <FormGroup>
          <Label for="ExpirationDate">Expiration Date</Label>
          <Input type="text" name="ExpirationDate" id="ExpirationDate" placeholder="MM/YY" onChange={getValue}/>
        </FormGroup>
          <Row>
            <Col>
              <FormGroup>
                <Label for="cardFirstName">First Name</Label>
                <Input type="text" name="FirstName" id="cardFirstName" placeholder="Davy" onChange={getValue}/>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="cardLastName">Last Name</Label>
                <Input type="text" name="LastName" id="cardLastName" placeholder="Crockett" onChange={getValue}/>
              </FormGroup>
            </Col>
          </Row>
        <FormGroup>
          <Label for="securityNumber">Security Code</Label>
          <Input type="text" name="securityNumber" id="securityNumber" placeholder="555" onChange={getValue}/>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddCard;