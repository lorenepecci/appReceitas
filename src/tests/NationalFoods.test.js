import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import meals from '../../cypress/mocks/meals';
import NationalFoods from '../pages/NationalFoods';
import renderWithRouter from './renderWithRouter';

describe('page NationalFoods', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    renderWithRouter(<NationalFoods />);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('first card in NationalFoods ', async () => {
    const text = await screen.findByText('Corba');
    expect(global.fetch).toHaveBeenCalled();
    expect(text).toBeInTheDocument();
  });

  test('count all cards', async () => {
    const allCards = await screen.findAllByAltText('cardImage');
    const numTwelve = 12;
    expect(allCards.length).toEqual(numTwelve);
  });

  test('click on first card at NationalFoods', async () => {
    const { history } = renderWithRouter(<NationalFoods />);
    const button = await screen.findByTestId('0-recipe-card');
    userEvent.click(button);
    history.push( '/foods/52977' );
  });
});
