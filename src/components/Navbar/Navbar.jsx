import { useState } from 'react';
import { Link } from 'react-router';
import { getCartItems, attachSetCartItems } from '../cart-storage.js';

const getNumberOfCartItems = () =>
  getCartItems().reduce((total, item) => total + item.quantity, 0);

function Navbar() {
  const [numOfCartItems, setNumOfCartItems] = useState(() =>
    getNumberOfCartItems(),
  );
  attachSetCartItems(() => {
    setNumOfCartItems(getNumberOfCartItems());
  });

  return (
    <nav>
      <div>Vanity</div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/cart">Cart | {numOfCartItems}</Link>
        </li>
      </ul>
    </nav>
  );
}

export { Navbar };
