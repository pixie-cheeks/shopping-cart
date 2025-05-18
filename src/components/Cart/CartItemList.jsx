import PropTypes from 'prop-types';
import { Link } from 'react-router';
import styles from './cart.module.css';

function CartItem({
  id,
  image,
  title,
  price,
  quantity,
  incrementQuantity,
  decrementQuantity,
  removeItem,
}) {
  return (
    <div className={styles.cartList_item}>
      <div className={styles.cartList_imgContainer}>
        <Link to={`/shop/${id}`}>
          <img src={image} alt={title} className="img" />
        </Link>
      </div>
      <div className={styles.cartList_content}>
        <h3>{title}</h3>
        <p className={styles.card_price}>
          <span className={styles.card_priceSymbol}>$</span>
          <span aria-label="price" className={styles.card_priceWhole}>
            {price}
          </span>
        </p>
        <div
          className={`${styles.cartList_quantityControl} ${styles.quantityControl}`}
        >
          <button
            type="button"
            onClick={decrementQuantity}
            className={`${styles.quantityControl_button} button`}
          >
            -
          </button>
          <div className={styles.quantityControl_display}>{quantity}</div>
          <button
            type="button"
            onClick={incrementQuantity}
            className={`${styles.quantityControl_button} button`}
          >
            +
          </button>
        </div>
      </div>
      <button
        type="button"
        className={`${styles.cart_removeButton} button`}
        onClick={removeItem}
      >
        Remove Item
      </button>
    </div>
  );
}

function CartItemList({ cartItems, setCartItems }) {
  const createCartItem = (item) => {
    const { id, title, price, image, quantity } = item;
    const incrementQuantity = () => {
      item.quantity++;
      setCartItems([...cartItems]);
    };

    const removeItem = () => {
      setCartItems(cartItems.filter((givenItem) => givenItem.id !== id));
    };

    const decrementQuantity = () => {
      if (quantity === 1) {
        removeItem();
        return;
      }
      item.quantity--;
      setCartItems([...cartItems]);
    };

    return (
      <CartItem
        key={id}
        {...{
          id,
          title,
          price,
          image,
          quantity,
          incrementQuantity,
          decrementQuantity,
          removeItem,
        }}
      />
    );
  };
  return (
    <div className={styles.cartList}>
      {cartItems.map((item) => createCartItem(item))}
    </div>
  );
}

CartItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  incrementQuantity: PropTypes.func.isRequired,
  decrementQuantity: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};

CartItemList.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  setCartItems: PropTypes.func.isRequired,
};

export { CartItemList };
