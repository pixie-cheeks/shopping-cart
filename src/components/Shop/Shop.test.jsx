import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import Shop from './Shop.jsx';

const setupRoutes = () => {
  const router = createMemoryRouter([{ path: '/', element: <Shop /> }]);
  render(<RouterProvider router={router} />);
};

describe('Shop page', () => {
  it('is in the document', () => {
    setupRoutes();

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
