import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router';
import userEvent from '@testing-library/user-event';
import { ProductCard } from './ProductCard.jsx';

const fakeProduct = {
  title: 'Mens Cotton Jacket',
  price: 55.99,
  image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
  rating: {
    rate: 4.7,
    count: 500,
  },
};

const { title, price, image, rating } = fakeProduct;
const setupRoutes = () => {
  const router = createMemoryRouter([
    {
      path: '/',
      element: <ProductCard {...{ title, price, image, rating }} />,
    },
  ]);
  render(<RouterProvider router={router} />);
};

describe('Rendering Tests', () => {
  beforeEach(() => setupRoutes());

  it('renders title', () => {
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('renders price', () => {
    expect(screen.getByText(`Price: ${price}`)).toBeInTheDocument();
  });

  it('renders image', () => {
    expect(screen.getByRole('img')).toHaveAttribute('src', image);
  });

  it('renders rating', () => {
    expect(
      screen.getByText(`Rate: ${rating.rate} Count: ${rating.count}`),
    ).toBeInTheDocument();
  });
});

const userSetup = () => {
  /** @type {import('@testing-library/user-event').UserEvent} */
  const user = userEvent.setup();
  setupRoutes();
  return user;
};

describe('Cart controls', () => {
  it('increments the quantity by one', async () => {
    const user = userSetup();

    await user.click(screen.getByRole('button', { name: '+' }));

    expect(
      screen.getByRole('spinbutton', {
        name: 'Number of Items',
      }),
    ).toHaveValue(2);
  });

  it('decrements the quantity by one', async () => {
    const user = userSetup();

    await user.click(screen.getByRole('button', { name: '+' }));
    await user.click(screen.getByRole('button', { name: '-' }));

    expect(
      screen.getByRole('spinbutton', {
        name: 'Number of Items',
      }),
    ).toHaveValue(1);
  });

  it('does not go below one', async () => {
    const user = userSetup();

    await user.click(screen.getByRole('button', { name: '-' }));

    expect(
      screen.getByRole('spinbutton', {
        name: 'Number of Items',
      }),
    ).toHaveValue(1);
  });

  it('does not go above 999', async () => {
    const user = userSetup();
    const quantityInput = screen.getByRole('spinbutton', {
      name: 'Number of Items',
    });

    await user.type(quantityInput, '999');
    await user.click(screen.getByRole('button', { name: '+' }));

    expect(quantityInput).toHaveValue(999);
  });

  it('does not go below one when typed', async () => {
    const user = userSetup();
    const quantityInput = screen.getByRole('spinbutton', {
      name: 'Number of Items',
    });

    await user.click(screen.getByRole('button', { name: '+' }));
    await user.type(quantityInput, '{Backspace}');

    expect(quantityInput).toHaveValue(1);
  });
});
