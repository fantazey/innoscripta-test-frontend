import {
  CATEGORIES_LOADED,
  CATEGORY_PRODUCTS_LOAD
} from '../actionTypes';

const initialState = {
  categories: [],
  categoriesByName: [],
  categoriesLoaded: false,
  productsByCategory: {},
  productsByCategoryCount: {},
  categoryIsEmpty: {},
  error: null
};

export default (state = initialState, action) => {
  let categories,
    categoriesByName,
    productsByCategory,
    categoryIsEmpty,
    category,
    products,
    meta,
    productsByCategoryCount;
  switch (action.type) {
    case CATEGORIES_LOADED:
      categories = action.payload.types;
      if (!categories) {
        return {
          ...state,
          error: 'Empty categories. Something gone wrong'
        };
      }
      categoriesByName = categories.map(x => x.name);
      productsByCategory = { ...state.productsByCategory };
      categoryIsEmpty = { ...state.categoryIsEmpty };
      productsByCategoryCount = { ...state.productsByCategoryCount };
      categoriesByName.forEach(item => {
        if (!productsByCategory.hasOwnProperty(item)) {
          productsByCategory[item] = [];
        }
        if (!categoryIsEmpty.hasOwnProperty(item)) {
          categoryIsEmpty[item] = false;
        }
        if (!productsByCategoryCount.hasOwnProperty(item)) {
          productsByCategoryCount[item] = 0;
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
      category = action.category;
      products = action.payload.products;
      meta = action.payload.meta;
      productsByCategory = { ...state.productsByCategory };
      productsByCategoryCount = { ...state.productsByCategoryCount };
      if (!productsByCategory[category] || !products) {
        return {
          ...state
        };
      }
      productsByCategoryCount[category] = meta && meta.total ? meta.total : 0;
      categoryIsEmpty = { ...state.categoryIsEmpty };
      if (products.length === 0 && productsByCategory[category].length === 0) {
        categoryIsEmpty[category] = true;
        return {
          ...state,
          categoryIsEmpty
        };
      }
      productsByCategory[category] = [];
      products.forEach(product => {
        const existed = productsByCategory[category].find(x => x.id === product.id);
        if (existed) {
          Object.assign(existed, product);
        } else {
          productsByCategory[category].push(product);
        }
      });
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
};
