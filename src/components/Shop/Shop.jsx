import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../Navbar/Navbar.jsx';
import { ProductCard } from '../ProductCard/ProductCard.jsx';
import styles from './shop.module.css';

const useProducts = () => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const localProducts = JSON.parse(localStorage.getItem('products'));
    if (localProducts) {
      setProducts(localProducts);
      setLoading(false);
      return;
    }

    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem('products', JSON.stringify(response));
        setProducts(response);
      })
      .catch((receivedError) => setError(receivedError))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
};

function ProductList({ products }) {
  return (
    <div className={styles.productList}>
      {products.map(({ id, title, price, image, rating }) => (
        <ProductCard {...{ title, price, image, rating }} key={id} />
      ))}
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      rating: PropTypes.shape({
        count: PropTypes.number,
        rate: PropTypes.number,
      }),
    }),
  ).isRequired,
};

function Shop() {
  const { products, loading, error } = useProducts();

  return (
    <>
      <Navbar />
      <h1>Products</h1>
      {products && <ProductList products={products} />}
      {loading && <p>Loading...</p>}
      {error && <p>There was an error in fetching products.</p>}
    </>
  );
}

export { Shop };
