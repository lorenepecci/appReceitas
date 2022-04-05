import { screen } from '@testing-library/react';
/* import userEvent from '@testing-library/user-event'; */
import React from 'react';
import mealIngredients from '../../cypress/mocks/mealIngredients';
import IngredientsFoods from '../pages/IngredientsFoods';
import renderWithRouter from './renderWithRouter';

describe('page IngredientsFoods', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealIngredients),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('first card in IngredientsFoods ', async () => {
    renderWithRouter(<IngredientsFoods />);
    const text = await screen.findByText('Chicken');
    expect(global.fetch).toHaveBeenCalled();
    expect(text).toBeInTheDocument();
  });

  test('count all cards', async () => {
    renderWithRouter(<IngredientsFoods />);
    const allCards = await screen.findAllByAltText('cardIngredient');
    const numTwelve = 12;
    expect(allCards.length).toEqual(numTwelve);
  });

/*   test('click on first card at IngredientsFoods', async () => {
    const { history } = renderWithRouter(<IngredientsFoods />);
    const button = await screen.findByTestId('0-ingredient-card');
    userEvent.click(button);
    history.push('/foods');
  }); */
});
