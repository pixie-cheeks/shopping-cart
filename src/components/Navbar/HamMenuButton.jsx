import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ham-menu.module.css';

function HamMenuButton({ toggleIsNavVisible, givenClassName }) {
  const [isActive, setIsActive] = useState(false);
  const activeClass = isActive ? styles.hamMenu_isActive : '';
  const handleClick = () => {
    setIsActive(!isActive);
    toggleIsNavVisible();
  };
  return (
    <button
      type="button"
      aria-label="Navigation Menu"
      onClick={handleClick}
      className={`${styles.hamMenu} button ${givenClassName} ${activeClass}`}
    >
      <span className={styles.hamMenu_span} />
      <span className={styles.hamMenu_span} />
      <span className={styles.hamMenu_span} />
    </button>
  );
}

HamMenuButton.propTypes = {
  toggleIsNavVisible: PropTypes.func.isRequired,
  givenClassName: PropTypes.string.isRequired,
};

export { HamMenuButton };
