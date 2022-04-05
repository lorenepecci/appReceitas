import { screen } from '@testing-library/react';
/* import userEvent from '@testing-library/user-event'; */
import React from 'react';
import drinksIngredients from '../../cypress/mocks/drinkIngredients';
import IngredientsDrinks from '../pages/IngredientsDrinks';
import renderWithRouter from './renderWithRouter';

describe('page IngredientsDrinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinksIngredients),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('first card in IngredientsDrinks ', async () => {
    renderWithRouter(<IngredientsDrinks />);
    const text = await screen.findByText('Gin');
    expect(global.fetch).toHaveBeenCalled();
    expect(text).toBeInTheDocument();
  });

  test('count all cards', async () => {
    renderWithRouter(<IngredientsDrinks />);
    const allCards = await screen.findAllByAltText('cardIngredient');
    const numTwelve = 12;
    expect(allCards.length).toEqual(numTwelve);
  });

/*   test('click on first card at IngredientsDrinks', async () => {
    const { history } = renderWithRouter(<IngredientsDrinks />);
    const button = await screen.findByTestId('0-ingredient-card');
    userEvent.click(button);
    history.push('/foods');
  }); */
});
