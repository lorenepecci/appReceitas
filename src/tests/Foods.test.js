import { screen } from '@testing-library/react';
import React from 'react';
import Foods from '../pages/Foods';
import renderWithRouter from './renderWithRouter';

beforeEach(() => {
  renderWithRouter(<Foods />);
});

test('page foods ', () => {
  const title = screen.getByText('heading', { level: 1, name: 'Foods' });
  expect(title).toBeInTheDocument();
});
