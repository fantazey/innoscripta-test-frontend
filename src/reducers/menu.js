import { CATEGORIES_LOADED, CATEGORY_PRODUCTS_LOAD } from './../actionTypes'

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
  let productsByCategory, categoryIsEmpty, productsByCategoryCount;
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
      productsByCategoryCount = {...state.productsByCategoryCount};
      categoriesByName.forEach(category => {
        if (!productsByCategory.hasOwnProperty(category)) {
          productsByCategory[category] = [];
        }
        if (!categoryIsEmpty.hasOwnProperty(category)) {
          categoryIsEmpty[category] = false;
        }
        if (!productsByCategoryCount.hasOwnProperty(category)) {
          productsByCategoryCount[category] = 0;
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
      const {products, meta} = action.payload;
      productsByCategory = {...state.productsByCategory};
      productsByCategoryCount = {...state.productsByCategoryCount};
      if (!productsByCategory[category]) {
        return {
          ...state
        };
      }
      productsByCategoryCount[category] = meta.total;
      categoryIsEmpty = {...state.categoryIsEmpty};
      if (products.length === 0 && productsByCategory[category].length === 0) {
        categoryIsEmpty[category] = true;
        return {
          ...state,
          categoryIsEmpty
        };
      }
      productsByCategory[category] = [];
      products.forEach(product => {
        let existed = productsByCategory[category].find(x => x.id === product.id);
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
}