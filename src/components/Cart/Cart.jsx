import { useState } from 'react';
import { Navbar } from '../Navbar/Navbar.jsx';
import {
  getCartItems,
  setCartItems as setCartItemsLocal,
} from '../cart-storage.js';
import { CartItemList } from './CartItemList.jsx';

function Cart() {
  const [cartItems, setCartItemsState] = useState(() => getCartItems() ?? []);
  const setCartItems = (givenCartItems) => {
    setCartItemsLocal(givenCartItems);
    setCartItemsState(givenCartItems);
  };

  return (
    <>
      <Navbar />
      <h1>Your Cart</h1>
      <main>
        {cartItems.length > 0 ? (
          <CartItemList {...{ cartItems, setCartItems }} />
        ) : (
          <p>There are no items in the cart.</p>
        )}
      </main>
    </>
  );
}

export { Cart };
