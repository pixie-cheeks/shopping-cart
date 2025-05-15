import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../Navbar/Navbar.jsx';
import { ProductCard } from '../ProductCard/ProductCard.jsx';
import { CategoryFilter } from './CategoryFilter.jsx';
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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const allCategories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ];
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter(({ category }) => category === selectedCategory);

  return (
    <>
      <CategoryFilter
        {...{ selectedCategory, setSelectedCategory, allCategories }}
      />
      <div className={styles.productList}>
        {filteredProducts.map(({ id, title, price, image, rating }) => (
          <ProductCard {...{ id, title, price, image, rating }} key={id} />
        ))}
      </div>
    </>
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
