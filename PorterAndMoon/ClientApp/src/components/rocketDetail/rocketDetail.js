import React from 'react';
import ShoppingCart from '../../data/PortAndMoonFactory/ShoppingCart';
import './rocketDetail.scss';

import ProductDetail from '../productDetail/productDetail'

class rocketDetail extends React.Component {
  state = {
    value: "",
  }

  componentDidMount(){
    ShoppingCart.currentProduct(this.props.location.search)
      .then((res) => {
        var product = res.data;
        this.setState({ product })
    })
      .catch((err) => console.error(err));
  }


  handleChange = (event) => {
    if(!isNaN(event.target.value)){
      this.setState({ value: event.target.value});
    }
  }

  handleSubmit = (event) => {
    this.AddProduct();
    event.preventDefault();
  }

  addToInput = () => {
    if(!isNaN(this.state.value) && this.state.value > 0){
      var newValue = parseFloat(this.state.value) + 1;
      this.setState({value: newValue});
    } else {
      this.setState({value: "1"})
    }
  }

  subtractFromInput = () => {
    if(!isNaN(this.state.value) && this.state.value > 1){
      var newValue = parseFloat(this.state.value) - 1;
      this.setState({value: newValue});
    } else {
      this.setState({ value: "" })
    }
  }

  AddProduct = () => {
    if(this.state.value > 0 && !isNaN(this.state.value) && this.state.product.quantity >= this.state.value){
      var requestedQuantity = this.state.value;
      ShoppingCart.addProductToCart(this.props.currentUser.id, this.state.product.id, requestedQuantity)
    }
  }
  
  CheckAvailability = () => {
    if(this.state.product !== undefined){
      if(this.state.product.available){
        return(
          <form onSubmit={this.handleSubmit}>
            <label>
              number to add
              <svg onClick={this.subtractFromInput} className="minus-icon-background" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
                <path className="minus-icon-foreground" d="M13.5,3.1875C7.804688,3.1875,3.1875,7.804688,3.1875,13.5C3.1875,19.195313,7.804688,23.8125,13.5,23.8125C19.195313,23.8125,23.8125,19.195313,23.8125,13.5C23.8125,7.804688,19.195313,3.1875,13.5,3.1875ZM19,15L8,15L8,12L19,12Z"></path>
              </svg>
              <input type="text" value={this.state.value} onChange={this.handleChange}/>
            </label>
            <svg onClick={this.addToInput} className="plus-icon-background" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 26 26">
              <path className="plus-icon-foreground" d="M13.5,3.188C7.805,3.188,3.188,7.805,3.188,13.5S7.805,23.813,13.5,23.813S23.813,19.195,23.813,13.5 S19.195,3.188,13.5,3.188z M19,15h-4v4h-3v-4H8v-3h4V8h3v4h4V15z"></path>
            </svg>
            <input className="btn btn-light" type="submit" value="Add Product" />
          </form>
        )
      }
      return <h1>This item is no longer available</h1>;
    }
  }

  render() {
    
      if(this.state.product !== undefined){
        const product = this.state.product;
        return(
          <div className='rocketDetail'>
            <div className="container">
              <div className="col">
                <ProductDetail 
                product={product}
                />
                {this.CheckAvailability()}
              </div>
            </div>
          </div>
        )
      }
      return <h1>unavailable</h1>;
  }
}

export default rocketDetail;