import PropTypes from 'prop-types';
import styles from './product-card.module.css';

function ProductCard({ title, price, image, rating }) {
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
