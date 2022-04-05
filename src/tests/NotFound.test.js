import { screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../pages/NotFound';
import renderWithRouter from './renderWithRouter';

beforeEach(() => {
  renderWithRouter(<NotFound />);
});

describe('page NotFound', () => {
  test('text NotFound ', () => {
    const text = screen.getByText('Not Found');
    expect(text).toBeInTheDocument();
  });
});
