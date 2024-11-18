import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './Home.jsx';

describe('Home page', () => {
  it('renders main text', () => {
    render(<Home />);

    expect(screen.getByText('Hello World!')).toBeInTheDocument();
  });
});
