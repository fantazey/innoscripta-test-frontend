import config from './config';

const apiURL = url => `${config.apiRoot}${url}`;

const headers = {
  'Content-Type': 'application/json',
};

const requests = {
  get: url => fetch(apiURL(url), {
    headers,
  }).then(res => res.json()),
  post: (url, data) => fetch(apiURL(url), {
    headers,
    method: 'POST',
    body: JSON.stringify(data)
  }).then(res => res.json())
};

const menu = {
  loadCategories: () => requests.get('/types'),
  loadProducts: category => requests.get(`/types/${category}/products`),
};

const cart = {
  loadCart: id => requests.get(`/orders/${id}`),
  addToCart: data => requests.post('/addToCart', data),
  removeFromCart: data => requests.post('/removeFromCart', data),
  confirmOrder: data => requests.post('/confirmOrder', data),
  checkOrder: () => requests.get('/orderCheck'),
  checkAddress: address => requests.post('/addressCheck', {address})
};

const common = {
  loadCurrency: () => fetch(
      'https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR,USD'
  ).then(res => res.json())
};

export default {
  menu,
  cart,
  common
};