import { CATEGORIES_LOADED, CATEGORY_PRODUCTS_LOAD } from './../actionTypes'

const initialState = {
  categories: [],
  categoriesByName: [],
  categoriesLoaded: false,
  productsByCategory: {},
  categoryIsEmpty: {},
  error: null
};

export default (state = initialState, action) => {
  let productsByCategory, categoryIsEmpty;
  switch (action.type) {
    case CATEGORIES_LOADED:
      let categories = action.payload.types;
      if (!categories) {
        return {
          ...state,
          error: 'Empty categories. Something gone wrong'
        };
      }
      const categoriesByName = categories.map( x => x.name );
      productsByCategory = {...state.productsByCategory};
      categoryIsEmpty = {...state.categoryIsEmpty};
      categoriesByName.forEach(category => {
        if (!productsByCategory.hasOwnProperty(category)) {
          productsByCategory[category] = [];
        }
        if (!categoryIsEmpty.hasOwnProperty(category)) {
          categoryIsEmpty[category] = true;
        }
      });
      return {
        ...state,
        categories: action.payload.types,
        categoryIsEmpty,
        productsByCategory,
        categoriesByName,
        categoriesLoaded: true
      };
    case CATEGORY_PRODUCTS_LOAD:
      const category = action.category;
      const products = action.payload.products;
      productsByCategory = {...state.productsByCategory};
      if (!productsByCategory[category]) {
        return {
          ...state
        };
      }
      categoryIsEmpty = {...state.categoryIsEmpty};
      if (products.length === 0 && productsByCategory[category].length === 0) {
        categoryIsEmpty[category] = true;
        return {
          ...state,
          categoryIsEmpty
        };
      }

      products.forEach(product => {
        let existed = productsByCategory[category].find(x => x.id === product.id);
        if (existed) {
          Object.assign(existed, product);
        } else {
          productsByCategory[category].push(product);
        }
      });
      categoryIsEmpty[category] = false;
      return {
        ...state,
        productsByCategory,
        categoryIsEmpty
      };
    default:
      return {
        ...state
      };
  }
}