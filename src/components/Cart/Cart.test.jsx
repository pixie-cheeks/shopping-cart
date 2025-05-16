import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { userEvent } from '@testing-library/user-event';
import { Cart } from './Cart.jsx';

const setupRoutes = () => {
  const router = createMemoryRouter([
    {
      path: '/',
      element: <Cart />,
    },
  ]);
  render(<RouterProvider router={router} />);
};

const userSetup = () => {
  const user = userEvent.setup();
  setupRoutes();
  return user;
};

const fakeProduct = {
  id: 1,
  title: 'Mens Cotton Jacket',
  price: 55.99,
  image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
  quantity: 1,
  rating: {
    rate: 4.7,
    count: 500,
  },
};

const setCartItems = (items) =>
  localStorage.setItem('cartItems', JSON.stringify(items));
const getCartItems = () => JSON.parse(localStorage.getItem('cartItems'));

describe('Testing Functionality', () => {
  it('works when there are no items given', () => {
    setupRoutes();

    expect(screen.queryByRole('button', { name: '+' })).not.toBeInTheDocument();
    expect(screen.getByRole('paragraph')).toHaveTextContent(
      'There are no items in the cart.',
    );
  });

  it('increments quantity by one', async () => {
    setCartItems([fakeProduct]);
    const user = userSetup();

    await user.click(screen.getByRole('button', { name: '+' }));

    expect(getCartItems().at(0).quantity).toBe(2);
  });

  it('decrements quantity by one', async () => {
    setCartItems([{ ...fakeProduct, quantity: 2 }]);
    const user = userSetup();

    await user.click(screen.getByRole('button', { name: '-' }));

    expect(getCartItems().at(0).quantity).toBe(1);
  });

  it('removes item when quantity reaches 0', async () => {
    setCartItems([fakeProduct]);
    const user = userSetup();

    await user.click(screen.getByRole('button', { name: '-' }));

    expect(getCartItems()).toHaveLength(0);
  });

  it('removes item when clicking the remove button', async () => {
    setCartItems([fakeProduct]);
    const user = userSetup();

    await user.click(screen.getByRole('button', { name: 'Remove Item' }));

    expect(getCartItems()).toHaveLength(0);
  });
});
