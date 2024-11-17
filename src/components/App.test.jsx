import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App.jsx';

describe('App', () => {
  it('renders main text', () => {
    render(<App />);

    expect(screen.getByText('Hello World!')).toBeInTheDocument();
  });
});
