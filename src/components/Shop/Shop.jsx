import { useState } from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../Navbar/Navbar.jsx';
import { ProductCard } from '../ProductCard/ProductCard.jsx';
import { CategoryFilter } from './CategoryFilter.jsx';
import styles from './shop.module.css';
import { useProducts } from '../use-products.js';

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
    <div className={styles.products}>
      <h1 className="page__h1">Products</h1>
      <CategoryFilter
        {...{ selectedCategory, setSelectedCategory, allCategories }}
      />
      <div className={styles.productList}>
        {filteredProducts.map(({ id, title, price, image, rating }) => (
          <ProductCard {...{ id, title, price, image, rating }} key={id} />
        ))}
      </div>
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
      <header>
        <Navbar />
      </header>
      <main>
        <div className={`page__container ${styles.shop_container}`}>
          {products && <ProductList products={products} />}
          {loading && <p>Loading...</p>}
          {error && <p>There was an error in fetching products.</p>}
        </div>
      </main>
    </>
  );
}

export { Shop };
