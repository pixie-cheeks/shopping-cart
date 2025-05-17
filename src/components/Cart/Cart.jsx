import { useState } from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../Navbar/Navbar.jsx';
import {
  getCartItems,
  setCartItems as setCartItemsLocal,
} from '../cart-storage.js';
import { CartItemList } from './CartItemList.jsx';
import styles from './cart.module.css';

function PaySection({ totalAmount }) {
  return (
    <div className={styles.paySection}>
      <p>Total: {totalAmount}</p>
      <button type="button">Checkout & Pay</button>
    </div>
  );
}

PaySection.propTypes = { totalAmount: PropTypes.number.isRequired };

const roundToTwoDecimalPlaces = (number) => {
  const TWO_PLACES = 10 ** 2;
  return Math.round(number * TWO_PLACES) / TWO_PLACES;
};

function Cart() {
  const [cartItems, setCartItemsState] = useState(() => getCartItems() ?? []);
  const setCartItems = (givenCartItems) => {
    setCartItemsLocal(givenCartItems);
    setCartItemsState(givenCartItems);
  };
  const totalAmount = roundToTwoDecimalPlaces(
    cartItems.reduce(
      (total, { price, quantity }) => total + price * quantity,
      0,
    ),
  ).toLocaleString();

  return (
    <>
      <Navbar />
      <h1>Your Cart</h1>
      <main>
        {cartItems.length > 0 ? (
          <>
            <CartItemList {...{ cartItems, setCartItems }} />
            <PaySection {...{ totalAmount }} />
          </>
        ) : (
          <p>There are no items in the cart.</p>
        )}
      </main>
    </>
  );
}

export { Cart };
