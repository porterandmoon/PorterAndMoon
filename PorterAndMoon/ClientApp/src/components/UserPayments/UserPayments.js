import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './UserPayments.scss';

class UserPayments extends React.Component {

    render(){

        return(<div>
                <div className="container">
                    <div className="row">
                        <div className="userCards">
                            <h3>Your Saved Payment Methods</h3>
                        </div>
                        <div className="cardForm">
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
                            <Label>Security Number</Label>
                            <Input type="text"id="securityNumber" placeholder="#" />
                            </FormGroup>
                            <FormGroup>
                            <Label>Month/Year Expiration</Label>
                            <Input type="month"id="cardDate" placeholder="" />
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
                        </div>
                    </div>
                </div>
        </div>);
    }
}

export default UserPayments;