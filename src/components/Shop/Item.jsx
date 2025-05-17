import { useParams } from 'react-router';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../Navbar/Navbar.jsx';
import styles from './shop.module.css';
import { useProducts } from '../use-products.js';
import { getCartItems, setCartItems } from '../cart-storage.js';

function ItemInfo({ id, title, price, image, rating, description }) {
  const [buyCount, setBuyCount] = useState(1);
  const onAddToCartClick = () => {
    const cartItems = getCartItems();
    const currentItem = cartItems.find((item) => item.id === id);
    if (currentItem) {
      currentItem.quantity += buyCount;
    } else {
      cartItems.push({ id, quantity: buyCount, title, price, image, rating });
    }
    setCartItems(cartItems);
  };
  const onInputChange = (e) => {
    const inputValue = Number(e.target.value);
    if (inputValue < 1) {
      setBuyCount(1);
    } else if (inputValue > 999) {
      setBuyCount(999);
    } else {
      setBuyCount(inputValue);
    }
  };

  return (
    <div className={styles.card}>
      <div className={`${styles.card_imgContainer}`}>
        <img src={image} alt={title} className={`img ${styles.card_img}`} />
      </div>
      <div>
        <div>{title}</div>
        <div>Price: {price}</div>
        <div>
          Rate: {rating.rate} Count: {rating.count}
        </div>
        <div>Description:</div>
        <div>{description}</div>
      </div>
      <div className={styles.cartControl}>
        <div className={styles.cartControl_top}>
          <button
            className={styles.cartControl_reducer}
            type="button"
            onClick={() => setBuyCount((count) => (count > 1 ? count - 1 : 1))}
          >
            -
          </button>
          <input
            type="number"
            aria-label="Number of Items"
            value={buyCount}
            min="1"
            max="999"
            className={`${styles.cartControl_display} ${styles.inputNumber}`}
            onChange={onInputChange}
          />
          <button
            className={styles.cartControl_adder}
            type="button"
            onClick={() =>
              setBuyCount((count) => (count < 999 ? count + 1 : 999))
            }
          >
            +
          </button>
        </div>
        <div className={styles.cartControl_bottom}>
          <button
            type="button"
            className={styles.cartControl_submit}
            onClick={onAddToCartClick}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
ItemInfo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.shape({
    count: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
  }).isRequired,
};

function Item() {
  const { products, loading, error } = useProducts();
  const { id: paramId } = useParams();
  const getItemInfo = () => {
    if (!products) return;
    const { id, title, price, image, rating, description } = products.find(
      (product) => product.id === Number(paramId),
    );

    return <ItemInfo {...{ id, title, price, image, rating, description }} />;
  };
  return (
    <>
      <Navbar />
      {getItemInfo()}
      {loading && <p>Loading...</p>}
      {error && <p>There was an error in loading the item.</p>}
    </>
  );
}

export { Item };
