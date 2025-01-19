import { Cart } from './Cart/Cart.jsx';
import Home from './Home/Home.jsx';
import Shop from './Shop/Shop.jsx';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/shop', element: <Shop /> },
  { path: '/cart', element: <Cart /> },
];

export default routes;
