import { Link } from 'react-router';

function Navbar() {
  return (
    <nav>
      <div>Vanity</div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
}

export { Navbar };
