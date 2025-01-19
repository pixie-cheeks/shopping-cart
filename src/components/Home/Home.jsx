import { Link } from 'react-router';
import { Navbar } from '../Navbar/Navbar.jsx';
import styles from './home.module.css';

function Home() {
  return (
    <>
      <Navbar />
      <h1>Vanity Bazaar</h1>
      <p>A bazaar for vanity shopping</p>
      <Link className={styles.link} to="/shop">
        Shop Now
      </Link>
    </>
  );
}

export { Home };
