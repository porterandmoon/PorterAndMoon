import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './UserPayments.scss';

import Payment from '../../data/PortAndMoonFactory/Payment';

class UserPayments extends React.Component {
    state = {
        userPayments: {}
    }

    componentDidMount() {
        Payment.getPaymentTypes(this.props.currentUser.id)
        .then((res) => {
            const userPayments = res.data;
            this.setState({ userPayments });
        })
        .catch((err) => console.error(err));
    }

    buildPayment = () => {
            if (this.state.userPayments !== null) {
                console.log(this.state.userPayments)
                const paymentArray = []
                Object.keys(this.state.userPayments).forEach((payment) => {
                    paymentArray.push(
                    <div key={payment} className="paymentDetails">
                        <p>{payment.type}</p>
                        <p>{payment.bankAccountNumber}</p>
                        <p>{payment.cardNumber}</p>
                    </div>
                )});
            return paymentArray
            }     
        else return ("You don't have any saved payment methods");
    }

    render(){
        return(
            <div>
                <div className="container">
                <div className="row">
                    <div className="userCards">
                        <h3>Your Saved Payment Methods</h3>
                        {this.buildPayment()}
                    </div>
                </div>
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
    )}
                     

}

export default UserPayments;