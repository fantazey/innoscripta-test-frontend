const API_ROOT = 'http://localhost:8000/api';

const apiURL = url => `${API_ROOT}${url}`;

const requests = {
  get: url => fetch(apiURL(url)).then(res => res.json()),
  post: (url, data) => fetch(apiURL(url), {
    method: 'POST',
    body: data
  }).then(res => res.json())
};

const menu = {
  loadCategories: () => requests.get('/types'),
  loadProducts: category => requests.get(`/types/${category}/products`),
};

const cart = {
  loadCart: id => requests.get(`/orders/${id}`),
  addToCart: (order, product) => requests.post('/addToCart', {order, product}),
  removeFromCart: (order, product) => requests.post('/removeFromCart', {order, product}),
  confirmOrder: data => requests.post('/confirmOrder', data)
};

export default {
  menu,
  cart
};