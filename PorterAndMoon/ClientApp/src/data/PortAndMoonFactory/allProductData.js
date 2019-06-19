import Axios from 'axios';

const getProductById = id => new Promise((resolve, reject) => {
    Axios.get(`http://localhost:62990/api/product/{id}`)
    .then((results) => {
        resolve(results);
    })
    .catch((error) => {
        reject(error);
    });
});

export default { 
    getProductById
}