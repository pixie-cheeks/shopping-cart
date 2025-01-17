import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './product-card.module.css';

function ProductCard({ title, price, image, rating }) {
  const [buyCount, setBuyCount] = useState(1);

  return (
    <div className={styles.card}>
      <div className={styles.cardImgContainer}>
        <img
          src={image}
          alt={title}
          className={`${styles.img} ${styles.cardImg}`}
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
          className={styles.cartCountIncrement}
          type="button"
          onClick={() => setBuyCount((count) => count + 1)}
        >
          +
        </button>
        <input
          className={styles.cartCountCount}
          type="number"
          value={buyCount}
          onKeyDown={(e) => {
            if (e.key === '-') e.preventDefault();
          }}
          onChange={(e) => {
            setBuyCount(Number(e.target.value));
          }}
          min={1}
        />
        <button
          className={styles.cartCountDecrement}
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
  rating: PropTypes.shape({
    count: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
