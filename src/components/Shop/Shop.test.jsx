import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { Shop } from './Shop.jsx';

const setupRoutes = () => {
  const router = createMemoryRouter([{ path: '/', element: <Shop /> }]);
  render(<RouterProvider router={router} />);
};

const sleep = (delay) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });

const fakeProduct = {
  id: 3,
  title: 'Mens Cotton Jacket',
  price: 55.99,
  image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
  rating: {
    rate: 4.7,
    count: 500,
  },
};

describe('Shop page', () => {
  it('is in the document', async () => {
    setupRoutes();

    expect(
      screen.getByRole('heading', { name: 'Products' }),
    ).toBeInTheDocument();
  });

  it('renders loading state', () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(vi.fn(() => sleep(1_000)));
    setupRoutes();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(
      screen.queryByText('There was an error in fetching products.'),
    ).not.toBeInTheDocument();

    vi.restoreAllMocks();
  });

  it('renders error state', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      vi.fn(() => Promise.reject(new Error('Test'))),
    );
    setupRoutes();

    expect(
      await screen.findByText('There was an error in fetching products.'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

    vi.restoreAllMocks();
  });

  it('renders items', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      vi.fn(() => Promise.resolve({ json: () => [fakeProduct] })),
    );
    setupRoutes();

    expect(await screen.findByText(fakeProduct.title)).toBeInTheDocument();
    expect(
      screen.queryByText('There was an error in fetching products.'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

    vi.restoreAllMocks();
  });

  it('works the same way with localStorage', async () => {
    localStorage.setItem('products', JSON.stringify([fakeProduct]));
    setupRoutes();

    expect(await screen.findByText(fakeProduct.title)).toBeInTheDocument();
    expect(
      screen.queryByText('There was an error in fetching products.'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
