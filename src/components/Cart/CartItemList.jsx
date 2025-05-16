import PropTypes from 'prop-types';
import styles from './cart.module.css';

function CartItem({ image, title, price, quantity }) {
  return (
    <div className={styles.cartList_item}>
      <div className={styles.cartList_imgContainer}>
        <img src={image} alt={title} className="img" />
      </div>
      <div className={styles.cartList_content}>
        <h3>{title}</h3>
        <p>Price: {price}</p>
        <div className={styles.cartList_quantityControl}>
          <button type="button">-</button>
          <div>{quantity}</div>
          <button type="button">+</button>
        </div>
      </div>
      <button type="button">Remove Item</button>
    </div>
  );
}

function CartItemList({ cartItems }) {
  return (
    <div className={styles.cartList}>
      {cartItems.map(({ id, title, price, image, quantity }) => (
        <CartItem key={id} {...{ title, price, image, quantity }} />
      ))}
    </div>
  );
}

const cartItems = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};

CartItem.propTypes = {
  ...cartItems,
};

CartItemList.propTypes = {
  cartItems: PropTypes.shape(cartItems).isRequired,
};

export { CartItemList };
