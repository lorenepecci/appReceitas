import { screen } from '@testing-library/react';
import React from 'react';
import Drinks from '../pages/Drinks';
import renderWithRouter from './renderWithRouter';

beforeEach(() => {
  renderWithRouter(<Drinks />);
});

test('page Drinks ', () => {
  const title = screen.getByText('heading', { level: 1, name: 'Drinks' });
  expect(title).toBeInTheDocument();
});
