import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { userEvent } from '@testing-library/user-event';
import { CategoryFilter } from './CategoryFilter.jsx';

const props = {
  selectedCategory: 'One',
  setSelectedCategory: vi.fn(),
  allCategories: ['One', 'Two', 'Three', 'Four', 'Five'],
};

const { selectedCategory, setSelectedCategory, allCategories } = props;

const setupRoutes = () => {
  const router = createMemoryRouter([
    {
      path: '/',
      element: (
        <CategoryFilter
          {...{
            selectedCategory,
            setSelectedCategory,
            allCategories,
          }}
        />
      ),
    },
  ]);
  render(<RouterProvider router={router} />);
};

const userSetup = () => {
  const user = userEvent.setup();
  setupRoutes();
  return user;
};

describe('Category Filter Tests', () => {
  it('selects the given category', () => {
    setupRoutes();

    expect(screen.getByRole('radio', { checked: true })).toHaveAccessibleName(
      selectedCategory,
    );
  });

  it('selects the user-selected category', async () => {
    const user = userSetup();
    const name = allCategories.at(-1);

    await user.click(screen.getByRole('radio', { name }));

    expect(setSelectedCategory).toBeCalledWith(name);
  });
});
