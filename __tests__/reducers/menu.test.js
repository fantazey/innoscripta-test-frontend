import { deepClone } from '../../src/utils';
import { CATEGORIES_LOADED, CATEGORY_PRODUCTS_LOAD } from '../../src/actionTypes';
import menu, { initialState } from '../../src/reducers/menu';

describe('menu reducer', () => {
  let state;

  beforeEach(() => {
    state = deepClone(initialState);
  });

  it('should handle default state', () => {
    const result = menu(state, {});
    expect(result).not.toBe(state);
    expect(result).toEqual(state);
  });
});

describe('menu reducer CATEGORIES_LOADED', () => {
  let state;
  const categories = {
      types: [
        {
          id: 1,
          name: 'test_cat_1'
        },
        {
          id: 2,
          name: 'test_cat_2'
        }
      ]
    },
    categoriesLoadedAction = { type: CATEGORIES_LOADED, payload: categories };

  beforeEach(() => {
    state = deepClone(initialState);
  });

  it('should process invalid payload', () => {
    const result = menu(
      state,
      {
        type: CATEGORIES_LOADED,
        payload: undefined
      }
    );
    expect(result).not.toBe(state);
    expect(result.error).toEqual('Empty categories. Something gone wrong');
    expect(result.categoriesLoaded).toBeFalsy();
  });

  it('should initialize store after loading categories', () => {
    const result = menu(state, categoriesLoadedAction);
    expect(result).not.toBe(state);
    expect(result.categoriesLoaded).toBeTruthy();
    expect(result.categories).toEqual(categories.types);
    categories.types.forEach(category => {
      expect(result.categoryIsEmpty[category.name]).toBeFalsy();
      expect(result.productsByCategory[category.name]).toEqual([]);
      expect(result.productsByCategoryCount[category.name]).toEqual(0);
    });
    expect(result.categoriesByName).toEqual(['test_cat_1', 'test_cat_2']);
  });

  it('reloading categories should not clear stored data', () => {
    const product = { id: 1, name: 'test_product_1' };
    state = {
      ...state,
      categories: [
        { id: 1, name: 'test_cat_1' }
      ],
      categoriesByName: ['test_cat_1'],
      productsByCategory: {
        test_cat_1: [product],
      },
      productsByCategoryCount: {
        test_cat_1: 1,
      },
      categoryIsEmpty: {
        test_cat_1: false,
      }
    };
    const result = menu(state, categoriesLoadedAction),
      storedCategoryName = 'test_cat_1',
      newCategoryName = 'test_cat_2';

    expect(result.categories).toEqual(categories.types);
    // new category loaded
    expect(result.categoryIsEmpty[newCategoryName]).toBeFalsy();
    expect(result.productsByCategory[newCategoryName]).toEqual([]);

    // stored category not modified
    expect(result.categoryIsEmpty[storedCategoryName]).toBeFalsy();
    expect(result.productsByCategory[storedCategoryName]).toEqual([
      product
    ]);

    // nested object cloned
    expect(result.productsByCategory[storedCategoryName][0]).not.toBe(
      product
    );
  });
});

describe('menu reducer CATEGORY_PRODUCTS_LOAD', () => {
  let state;
  const storedCategory = 'test_1',
    storedProduct = {
      id: 1,
      name: 'not updated product',
      extraData: 'some extra data not specified in payload',
      type: {
        id: 1,
        name: 'test_1'
      },
      description: 'old description for product',
      price: 555,
      image: 'path/to/image/product/1'
    },
    productsLoadState = {
      categories: [
        { id: 1, name: 'test_1' }
      ],
      categoriesByName: [
        'test_1'
      ],
      categoriesLoaded: true,
      productsByCategory: {
        test_1: [storedProduct]
      },
      productsByCategoryCount: {
        test_1: 1
      },
      categoryIsEmpty: {
        test_1: false
      }
    },
    products = [
      {
        id: 1,
        name: 'test product 1',
        type: {
          id: 1,
          name: 'test_1'
        },
        description: 'test description product 1',
        price: 10.5,
        image: 'path/to/image/product/1'
      },
      {
        id: 2,
        name: 'test product 2',
        type: {
          id: 1,
          name: 'test_1'
        },
        description: 'test description for product 2',
        price: 14.0,
        image: 'path/to/image/product/2'
      },
    ],
    meta = {
      total: 5,
      limit: 2,
      offset: 0,
    },
    productsLoadedAction = { type: CATEGORY_PRODUCTS_LOAD, payload: { products, meta } };

  beforeEach(() => {
    state = deepClone(productsLoadState);
  });

  it('should handle empty payload', () => {
    const result = menu(state, { ...productsLoadedAction, payload: undefined });
    // deep clone state
    expect(result).not.toBe(state);
    expect(
      result.productsByCategory[storedCategory]
    ).not.toBe(
      state.productsByCategory[storedCategory]
    );

    // handle error
    expect(result.error).toEqual('Error. Incorrect payload or category');

    // state not modified
    expect(result.productsByCategory).toEqual(state.productsByCategory);
  });

  it('should handle empty category', () => {
    const result = menu(state, { ...productsLoadedAction, payload: { products: undefined } });
    // handle error
    expect(result.error).toEqual('Error. Incorrect payload or category');
  });

  it('should handle incorrect payload', () => {
    const result = menu(
      state,
      {
        ...productsLoadedAction,
        payload: { prdcts: undefined },
        category: storedCategory
      }
    );
    // handle error
    expect(result.error).toEqual('Error. Incorrect payload or category');
  });

  it('should handle incorrect category', () => {
    const result = menu(
      state,
      {
        ...productsLoadedAction,
        payload: { products: [] },
        category: 'incorrect'
      }
    );
    // handle error
    expect(result.error).toEqual('Error. Wrong category');
  });

  it('should handle products', () => {
    const result = menu(state, { ...productsLoadedAction, category: storedCategory }),
      storedCategoryProducts = result.productsByCategory[storedCategory];
    expect(result).not.toBe(state);
    expect(result.productsByCategoryCount[storedCategory]).toEqual(meta.total);
    expect(storedCategoryProducts).toHaveLength(2);
    expect(storedCategoryProducts).not.toBe(
      state.productsByCategory[storedCategory]
    );

    expect(storedCategoryProducts[1]).toEqual(products[1]);
    expect(storedCategoryProducts[1]).not.toBe(products[1]);

    expect(storedCategoryProducts[0]).toEqual({
      ...products[0],
      extraData: storedProduct.extraData,
    });
  });
});
