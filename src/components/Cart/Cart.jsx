import { Navbar } from '../Navbar/Navbar.jsx';
import { getCartItems } from '../cart-storage.js';
import { CartItemList } from './CartItemList.jsx';

function Cart() {
  const cartItems = getCartItems() ?? [];

  return (
    <>
      <Navbar />
      <h1>Your Cart</h1>
      <main>
        {cartItems.length > 0 ? (
          <CartItemList cartItems={cartItems} />
        ) : (
          <p>There are no items in the cart.</p>
        )}
      </main>
    </>
  );
}

export { Cart };
