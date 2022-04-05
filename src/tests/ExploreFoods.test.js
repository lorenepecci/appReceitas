import { screen } from '@testing-library/react';
import React from 'react';
import oneMeal from '../../cypress/mocks/oneMeal';
import ExploreFoods from '../pages/ExploreFoods';
import renderWithRouter from './renderWithRouter';

describe('page ExploreFoods', () => {
  test('button By ingredient ', async () => {
    const { history } = renderWithRouter(<ExploreFoods />);
    const text = await screen.findByText('By Ingredient');
    expect(text).toBeInTheDocument();
    text.click();
    history.push('/explore/drinks/ingredients');
  });

  test('button Surprise me ', async () => {
    const { history } = renderWithRouter(<ExploreFoods />);
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(oneMeal.meals),
    });
    const text2 = await screen.findByText('Surprise me!');
    expect(text2).toBeInTheDocument();
    text2.click();
    history.push('/foods/52771');
  });

  test('button By Nationality ', async () => {
    const { history } = renderWithRouter(<ExploreFoods />);
    const text3 = await screen.findByText('By Nationality');
    expect(text3).toBeInTheDocument();
    text3.click();
    history.push('/explore/foods/nationalities');
  });
});
