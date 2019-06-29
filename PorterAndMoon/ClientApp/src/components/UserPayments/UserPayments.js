import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './UserPayments.scss';

import Payment from '../../data/PortAndMoonFactory/Payment';

class UserPayments extends React.Component {
    state = {
        userPayments: {}
    }


    getUserPayments = () => {
        Payment.getPaymentTypes(this.props.currentUser.id)
        .then((results) => {
            const userPayments = results.data;
            this.setState({ userPayments });
        })
        .catch((err) => console.error(err));
    }

    // buildPayment = () => {
    //     const payment = this.props;
    //     if (product !== null) {
    //     return <div className="productDetails">
    //         <div className="container">
    //           <div className="col">
    //             <h1>Flight Details</h1>
    //             <h3>{product.product.title}</h3>
    //             <p>{product.product.description}</p>
    //             <p>${product.product.price}</p>
    //             <p>Qty: {product.product.remainingQty}</p>
    //             </div>
    //         </div>
    //         </div>
    //     }
    //     else return '';
    // }

    render(){
            if(this.state.userPayments !== null) {
                return(

                <div className="container">
                    <div className="row">
                        <div className="userCards">
                            <h3>Your Saved Payment Methods</h3>
                            {/* {this.getUserPayments()} */}
                        </div>
                    </div>
                </div>
                )}
                return (
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
                        </div>)
                     {/* </div>
                </div>); */}
    }
}

export default UserPayments;