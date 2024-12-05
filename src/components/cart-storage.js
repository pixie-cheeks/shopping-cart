const setCartItems = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

const getCartItems = () => JSON.parse(localStorage.getItem('cartItems'));

export { setCartItems, getCartItems };
