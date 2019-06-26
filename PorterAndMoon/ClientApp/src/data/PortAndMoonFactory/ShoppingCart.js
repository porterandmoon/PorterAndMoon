import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.baseUrl;

const currentProduct = (searchParam) => new Promise((Resolve,Reject) => {
  // Gets the prouct for the product detail page
  axios.get(`${baseUrl}/product${searchParam}`)
    .then((res) => Resolve(res))
    .catch((rej) => Reject(rej));
});

// Adds a product to the user's shopping cart. Matches the user, product and quantity requested to purchase
const addProductToCart = (userId, productId, quantOrdered) => new Promise((Resolve, Reject) => {
  // Passes UserId, ProductId, and OrderQuantity as the body of this request
 axios.post(`${baseUrl}/cart`, { 
    UserId: userId,
    ProductId: productId,
    OrderQuantity: quantOrdered,
  })
    .then((res) => Resolve(res))
    .catch((err) => Reject(err));
});

// Gets all cart items of the user
const getCartItems = (userId) => new Promise((Resolve, Reject) => {
  axios.get(`${baseUrl}/cart`, {
    // params translates to '?Id={userId}' in the URL
    params: {
      Id: userId
    }
  })
    .then((res) => Resolve(res))
    .catch((err) => Reject(err));
});

// Removes products from the current cart
const removeCartItem = (ordProdId) => new Promise((Resolve, Reject) => {
  axios.delete(`${baseUrl}/cart`,{
    // params translates to '?Id={ordProdId}' in the URL
    params: {
      Id: ordProdId,
    }
  })
    .then((res) => Resolve(res))
    .catch((err) => Reject(err));
});

const purchaseItemsInCart = (purchase) => new Promise((Resolve, Reject) => {
  axios.put(`${baseUrl}/cart`, purchase)
    .then((res) => Resolve(res))
    .catch((err) => Reject(err));
});

export default { 
  currentProduct,
  addProductToCart,
  getCartItems,
  removeCartItem,
  purchaseItemsInCart,
};