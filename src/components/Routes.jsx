import { Cart } from './Cart/Cart.jsx';
import { Home } from './Home/Home.jsx';
import { ErrorPage } from './Home/ErrorPage.jsx';
import { Shop } from './Shop/Shop.jsx';
import { Item } from './Shop/Item.jsx';

const routes = [
  { path: '/', element: <Home />, errorElement: <ErrorPage /> },
  { path: '/shop', element: <Shop /> },
  { path: '/shop:id', element: <Item /> },
  { path: '/cart', element: <Cart /> },
];

export { routes };
