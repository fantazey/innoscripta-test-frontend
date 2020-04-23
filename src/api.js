const API_ROOT = 'http://localhost:8000/api';

const apiURL = url => `${API_ROOT}${url}`;

const requests = {
  get: url => fetch(apiURL(url), {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json()),
  post: (url, data) => fetch(apiURL(url), {
    headers: {
      'Content-Type': 'application/json',
    },
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
  checkOrder: () => requests.get('/orderCheck')
};

export default {
  menu,
  cart
};