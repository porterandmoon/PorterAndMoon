import Axios from 'axios';

const getSearchData = input => new Promise((resolve, reject) => {
    Axios.get(`http://localhost:62990/api/user/customer?input=${input}`)
    .then((results) => {
        const resultsArray = [];
        const searchObject = results.data;
        if (searchObject !== null) {
            Object.keys(searchObject).forEach((resultId) => {
                resultsArray.push(searchObject[resultId]);
            });
        }
        resolve(resultsArray);
    })
    .catch((error) => {
        reject(error);
    });
});

const getProductsSearchData = input => new Promise((resolve, reject) => {
    Axios.get(`http://localhost:62990/api/product/product?input=${input}`)
    .then((results) => {
        const resultsArray = [];
        const searchObject = results.data;
        if (searchObject !== null) {
            Object.keys(searchObject).forEach((resultId) => {
                resultsArray.push(searchObject[resultId]);
            });
        }
        resolve(resultsArray);
    })
    .catch((error) => {
        reject(error);
    });
});

export default {
    getSearchData,
    getProductsSearchData
};