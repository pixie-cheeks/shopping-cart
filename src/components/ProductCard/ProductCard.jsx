import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './product-card.module.css';

function ProductCard({ title, price, image, rating, id }) {
  const [buyCount, setBuyCount] = useState(1);

  return (
    <div className={styles.card} data-id={id}>
      <div className={styles.card_imgContainer}>
        <img
          src={image}
          alt={title}
          className={`${styles.img} ${styles.card_img}`}
        />
      </div>
      <div>
        <div>{title}</div>
        <div>Price: {price}</div>
        <div>
          Rate: {rating.rate} Count: {rating.count}
        </div>
      </div>
      <div className={styles.cartCount}>
        <button
          className={styles.cartCount_increment}
          type="button"
          onClick={() => setBuyCount((count) => count + 1)}
        >
          +
        </button>
        <div>{buyCount}</div>
        <button
          className={styles.cartCount_decrement}
          type="button"
          onClick={() => setBuyCount((count) => (count > 1 ? count - 1 : 1))}
        >
          -
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  rating: PropTypes.shape({
    count: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
  }).isRequired,
};

export { ProductCard };
