import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import Explore from '../pages/Explore';
import renderWithRouter from './renderWithRouter';

beforeEach(() => {
  renderWithRouter(<Explore />);
});

describe('page Explore', () => {
  test('heading Explore ', () => {
    const title = screen.getByRole('heading', { level: 1, name: 'Explore' });
    expect(title).toBeInTheDocument();
  });

  test('click on Explore foods', () => {
    const { history } = renderWithRouter(<Explore />);
    const button = screen.getAllByTestId('explore-foods');
    fireEvent.click(button[0]);
    history.push('/explore/foods');
  });

  test('click on Explore drinks', () => {
    const { history } = renderWithRouter(<Explore />);
    const button = screen.getAllByTestId('explore-drinks');
    fireEvent.click(button[0]);
    history.push('/explore/drinks');
  });
});
