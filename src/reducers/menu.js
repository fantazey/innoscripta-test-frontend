import {
  CATEGORIES_LOADED,
  CATEGORY_PRODUCTS_LOAD
} from '../actionTypes';
import { deepClone } from '../utils';

export const initialState = {
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
      if (!action.payload || !action.payload.types) {
        return {
          ...deepClone(state),
          error: 'Empty categories. Something gone wrong'
        };
      }
      categories = action.payload.types;
      categoriesByName = categories.map(x => x.name);

      productsByCategory = deepClone(state.productsByCategory);
      categoryIsEmpty = deepClone(state.categoryIsEmpty);
      productsByCategoryCount = deepClone(state.productsByCategoryCount);

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
        ...deepClone(state),
        categories,
        categoryIsEmpty,
        productsByCategory,
        productsByCategoryCount,
        categoriesByName,
        categoriesLoaded: true
      };
    case CATEGORY_PRODUCTS_LOAD:
      if (!action.category || !action.payload || !action.payload.products) {
        return {
          ...deepClone(state),
          error: 'Error. Incorrect payload or category',
        };
      }

      category = action.category;
      if (!state.productsByCategory[category]) {
        return {
          ...deepClone(state),
          error: 'Error. Wrong category'
        };
      }

      products = action.payload.products;
      productsByCategory = deepClone(state.productsByCategory);
      productsByCategoryCount = deepClone(state.productsByCategoryCount);
      categoryIsEmpty = deepClone(state.categoryIsEmpty);
      meta = action.payload.meta;
      productsByCategoryCount[category] = meta && meta.total ? meta.total : 0;

      if (products.length === 0 && productsByCategory[category].length === 0) {
        categoryIsEmpty[category] = true;
        return {
          ...state,
          categoryIsEmpty
        };
      }

      products.forEach(product => {
        const existed = productsByCategory[category].find(x => x.id === product.id),
          cloneProduct = deepClone(product);
        if (existed) {
          Object.assign(existed, cloneProduct);
        } else {
          productsByCategory[category].push(cloneProduct);
        }
      });
      return {
        ...deepClone(state),
        productsByCategoryCount,
        productsByCategory,
        categoryIsEmpty
      };
    default:
      return {
        ...deepClone(state)
      };
  }
};
