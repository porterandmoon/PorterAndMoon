import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './UserPayments.scss';

class UserPayments extends React.Component {

    render(){

        return(<div>
                <h1>UserPayments</h1>
                    <Form>
                    <FormGroup>
                    <Label>Name</Label>
                    <Input type="text" id="cardName" placeholder="Name on card" />
                    </FormGroup>
                    <FormGroup>
                    <Label>Card Number</Label>
                    <Input type="text"id="cardName" placeholder="#" />
                    </FormGroup>
                    <FormGroup>
                    <Label for="exampleSelect">Select Payment Type</Label>
                    <Input type="select" name="select" id="exampleSelect">
                        <option>Visa</option>
                        <option>MasterCard</option>
                        <option>American Express</option>
                        <option>Paypal</option>
                    </Input>
                    </FormGroup>  
                    <FormGroup check>
                    <Label check>
                        <Input type="checkbox" />
                        Make my preferred payment type
                    </Label>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
        </div>);
    }
}

export default UserPayments;