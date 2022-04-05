import { screen } from '@testing-library/react';
import React from 'react';
import oneDrinkId15997 from '../../cypress/mocks/oneDrinkId15997';
import ExploreDrinks from '../pages/ExploreDrinks';
import renderWithRouter from './renderWithRouter';

describe('page ExploreDrinks', () => {
  test('button By ingredient ', async () => {
    const { history } = renderWithRouter(<ExploreDrinks />);
    const text = await screen.findByText('By Ingredient');
    expect(text).toBeInTheDocument();
    text.click();
    history.push('/explore/drinks/ingredients');
  });

  test('button Surprise me ', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(oneDrinkId15997),
    });
    const { history } = renderWithRouter(<ExploreDrinks />);
    const text2 = await screen.findByText('Surprise me!');
    expect(text2).toBeInTheDocument();
    text2.click();
    history.push('/drinks/15997');
  });
});
