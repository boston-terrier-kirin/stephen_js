console.log('shoppingCart');

export const cart = [];

export const addToCart = (product, quantity) => {
  cart.push({ product, quantity });
  console.log(`${product} X ${quantity} was added.`);
};
