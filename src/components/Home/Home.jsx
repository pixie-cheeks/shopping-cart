import { Link } from 'react-router';
import { Navbar } from '../Navbar/Navbar.jsx';
import styles from './home.module.css';

localStorage.removeItem('cartItems');
function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className={`page__container ${styles.hero}`}>
          <h1 className={`page__h1 ${styles.hero_heading}`}>Vanity Bazaar</h1>
          <p className={`page__p ${styles.hero_text}`}>
            A bazaar for vanity shopping
          </p>
          <Link className={`a ${styles.link} ${styles.hero_link}`} to="/shop">
            Shop Now
          </Link>
        </div>
      </main>
    </>
  );
}

export { Home };
