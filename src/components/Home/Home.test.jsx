import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import Home from './Home.jsx';

const setupRoutes = () => {
  const router = createMemoryRouter([{ path: '/', element: <Home /> }]);
  render(<RouterProvider router={router} />);
};

describe('Home page', () => {
  it('renders main text', () => {
    setupRoutes();

    expect(screen.getByText('This is the home page.')).toBeInTheDocument();
  });
});
