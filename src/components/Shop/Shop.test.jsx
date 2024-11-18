import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Shop from './Shop.jsx';

describe('Shop page', () => {
  it('is in the document', () => {
    render(<Shop />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
