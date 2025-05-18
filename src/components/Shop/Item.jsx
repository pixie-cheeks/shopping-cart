import { useParams } from 'react-router';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../Navbar/Navbar.jsx';
import styles from './item.module.css';
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
    <div className={`${styles.item} page__container`}>
      <div className={`${styles.item_imgContainer}`}>
        <img src={image} alt={title} className={`img ${styles.item_img}`} />
      </div>
      <div className={styles.item_contentContainer}>
        <div className={styles.item_infoSection}>
          <h2 className={styles.card_title}>{title}</h2>
          <p>{description}</p>
          <div className={styles.rating}>
            <div className={styles.rating_rate}>
              <span
                aria-label="product rating"
                className={styles.rating_number}
              >
                {rating.rate}
              </span>
              <span
                className={`${styles.rating_icon} material-symbols-outlined `}
              >
                star
              </span>
            </div>
            <div aria-label="number of ratings" className={styles.rating_count}>
              {rating.count} rating{rating.count === 1 ? '' : 's'}
            </div>
          </div>
        </div>

        <div className={styles.item_purchaseSection}>
          <p className={styles.card_price}>
            <span className={styles.card_priceSymbol}>$</span>
            <span aria-label="price" className={styles.card_priceWhole}>
              {price}
            </span>
          </p>
          <div className={styles.cartControl}>
            <div className={styles.cartControl_top}>
              <button
                className={`${styles.cartControl_reducer} button ${styles.cartControl_button}`}
                type="button"
                onClick={() =>
                  setBuyCount((count) => (count > 1 ? count - 1 : 1))
                }
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
                className={`${styles.cartControl_adder} button ${styles.cartControl_button}`}
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
      <header>
        <Navbar />
      </header>
      <main>
        {getItemInfo()}
        {loading && <p>Loading...</p>}
        {error && <p>There was an error in loading the item.</p>}
      </main>
    </>
  );
}

export { Item };
