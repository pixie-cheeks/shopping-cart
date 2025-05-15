import PropTypes from 'prop-types';
import styles from './shop.module.css';

function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
  allCategories,
}) {
  return (
    <div className={styles.categoryFilter}>
      {allCategories.map((categoryName) => (
        <label htmlFor={categoryName} key={categoryName}>
          <input
            id={categoryName}
            type="radio"
            name="category"
            value={categoryName}
            checked={categoryName === selectedCategory}
            onChange={() => setSelectedCategory(categoryName)}
          />
          {categoryName}
        </label>
      ))}
    </div>
  );
}

CategoryFilter.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  allCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export { CategoryFilter };
