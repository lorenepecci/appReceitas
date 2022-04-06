import { screen } from '@testing-library/react';
import React from 'react';
import oneDrinkId15997 from '../../cypress/mocks/oneDrinkId15997';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('teste pagina de detailedRecipes', () => {
  let globalHistory;
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrinkId15997),
    });
    const { history } = renderWithRouter(<App />);
    globalHistory = history;
    globalHistory.push('/drinks/15997');
  });
  test('H1 com texto de DetailedRecipe ', () => {
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('DetailedRecipe');
  });

  test('presença do icone coração ', async () => {
    const favoriteIcon = await screen.findByAltText('Icone de favoritar');
    expect(favoriteIcon).toBeInTheDocument();
  });

  test('presença do icone share ', async () => {
    const shareIcon = await screen.findByTestId('share-btn');
    expect(shareIcon).toBeInTheDocument();
  });

  test('testa o titulo da receita data-testid="recipe-title"', async () => {
    const titleRecipe = await screen.findByTestId('recipe-title');
    expect(titleRecipe).toBeInTheDocument();
    expect(titleRecipe).toHaveTextContent('GG');
  });

  test('testa a foto se é a correta ', async () => {
    const fotoRecipe = await screen.findByTestId('recipe-photo');
    expect(fotoRecipe).toBeInTheDocument();
    expect(fotoRecipe.src).toBe('https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');
  });

  test('testa se existe o card corba ', async () => {
    const corba = await screen.findByTestId('0-recomendation-card');
    expect(corba).toBeInTheDocument();
  });
});
