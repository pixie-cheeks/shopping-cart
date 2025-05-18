import { useState } from 'react';
import { Link } from 'react-router';
import styles from './navbar.module.css';
import { getCartItems, attachSetCartItems } from '../cart-storage.js';
import { HamMenuButton } from './HamMenuButton.jsx';

const getNumberOfCartItems = () =>
  getCartItems().reduce((total, item) => total + item.quantity, 0);

function Navbar() {
  const [numOfCartItems, setNumOfCartItems] = useState(() =>
    getNumberOfCartItems(),
  );
  const [isNavVisible, setIsNavVisible] = useState(false);
  const navVisibleClass = isNavVisible ? styles.nav_ul_visible : '';
  const toggleIsNavVisible = () => setIsNavVisible(!isNavVisible);
  attachSetCartItems(() => {
    setNumOfCartItems(getNumberOfCartItems());
  });

  return (
    <nav className={styles.nav}>
      <div className={`page__container ${styles.nav_container}`}>
        <div className={styles.nav_logo}>
          <Link to="/" className={`a ${styles.nav_link}`}>
            Vanity
          </Link>
        </div>
        <ul className={`ul ${styles.nav_ul} ${navVisibleClass}`}>
          <li className={`li ${styles.nav_li}`}>
            <Link to="/" className={`a ${styles.nav_link}`}>
              Home
            </Link>
          </li>
          <li className={`li ${styles.nav_li}`}>
            <Link to="/shop" className={`a ${styles.nav_link}`}>
              Shop
            </Link>
          </li>
          <li className={`li ${styles.nav_li}`}>
            <Link
              to="/cart"
              className={`a ${styles.nav_link} ${styles.cartLink}`}
            >
              <span
                className={`material-symbols-outlined ${styles.cartLink_icon}`}
              >
                shopping_cart
              </span>
              <span className={styles.cartLink_quantity}>{numOfCartItems}</span>
            </Link>
          </li>
        </ul>
        <HamMenuButton
          {...{ toggleIsNavVisible, givenClassName: styles.nav_hamMenu }}
        />
      </div>
    </nav>
  );
}

export { Navbar };
