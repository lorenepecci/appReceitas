import { screen } from '@testing-library/react';
import React from 'react';
import Profile from '../pages/Profile';
import renderWithRouter from './renderWithRouter';

describe('page Profile', () => {
  test('button Done Recipes ', async () => {
    const { history } = renderWithRouter(<Profile />);
    const text = await screen.findByText('Done Recipes');
    expect(text).toBeInTheDocument();
    text.click();
    history.push('/done-recipes');
  });

  test('button Favorite Recipes ', async () => {
    const { history } = renderWithRouter(<Profile />);
    const text2 = await screen.findByText('Favorite Recipes');
    expect(text2).toBeInTheDocument();
    text2.click();
    history.push('/favorite-recipes');
  });

  test('button Logout ', async () => {
    const { history } = renderWithRouter(<Profile />);
    const text3 = await screen.findByText('Logout');
    expect(text3).toBeInTheDocument();
    text3.click();
    history.push('/');
  });
});
