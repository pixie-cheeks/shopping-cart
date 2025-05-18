import PropTypes from 'prop-types';
import styles from './category-filter.module.css';

function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
  allCategories,
}) {
  return (
    <div
      className={styles.categories}
      role="radiogroup"
      aria-label="Category Selection"
    >
      {allCategories.map((categoryName) => (
        <div key={categoryName} className={styles.category}>
          <input
            className={styles.category_input}
            id={categoryName}
            type="radio"
            name="category"
            value={categoryName}
            checked={categoryName === selectedCategory}
            onChange={() => setSelectedCategory(categoryName)}
          />
          <label className={styles.category_label} htmlFor={categoryName}>
            {categoryName}
          </label>
        </div>
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
