const onSetCartItems = [];

const setCartItems = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  onSetCartItems.forEach((callback) => callback());
};

/**
 * @typedef {Object} CartItem
 * @property {number} id
 * @property {number} quantity
 */

/** @return {CartItem[]} */
const getCartItems = () => JSON.parse(localStorage.getItem('cartItems')) ?? [];

const attachSetCartItems = (callback) => onSetCartItems.push(callback);

export { setCartItems, getCartItems, attachSetCartItems };
