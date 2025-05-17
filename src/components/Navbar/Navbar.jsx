import { useState } from 'react';
import { Link } from 'react-router';
import styles from './navbar.module.css';
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
    <nav className={styles.nav}>
      <div className="page__container">
        <div className={styles.nav_logo}>Vanity</div>
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
      </div>
    </nav>
  );
}

export { Navbar };
