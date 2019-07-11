import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './UserPayments.scss';

import Payment from '../../data/PortAndMoonFactory/Payment';
import SinglePayment from './SinglePayment/SinglePayment';

class UserPayments extends React.Component {
    state = {
        userPayments: {}
    }

    // deletePayment = (paymentId) => {
    //     Payment.deletePaymentType(paymentId)
    // }

    componentDidMount() {
        Payment.getPaymentTypes(this.props.currentUser.id)
        .then((res) => {
            const userPayments = res.data;
            this.setState({ userPayments })
        })
        .catch((err) => console.error(err));
    }

    render() {
        const { payments } = this.state.userPayments;
        
        if (payments !== null) {
            const paymentComponents = payments.map(payment => (
                <SinglePayment
                payment={payment}
                key={payment.id}
                />
            ));

            return (
                <div className="payments">
                    <div className="container">
                    <div className="row">
                            <div className="paymentsCard">
                                <h3>Your Saved Payment Methods</h3>
                                {paymentComponents}
                            </div>
                            <div className="cardForm">
                                <Form className="user-payment-form">
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
                </div>)
        } else return  <div className="payments">
                <div className="container">
                <div className="row">
                        <div className="paymentsCard">
                            <h3>Your Saved Payment Methods</h3>
                            <p>Please add a payment method</p>
                        </div>
                        <div className="cardForm">
                            <Form className="user-payment-form">
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
            </div>

        }
}               


export default UserPayments;