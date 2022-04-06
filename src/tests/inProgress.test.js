import { screen } from '@testing-library/react';
import React from 'react';
import oneDrink from '../../cypress/mocks/oneDrink';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testes na magina de inProgressDrink', () => {
  let globalHistory;
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
    const { history } = renderWithRouter(<App />);
    globalHistory = history;
    globalHistory.push('/drinks/178319/in-progress');
  });
  // Testa se a imagem aparece na tela.
  it('Test if the recipe image exists with alt ', async () => {
    const imgDrink = await screen.findByTestId(/recipe-photo/i);
    expect(imgDrink.src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
  });

  // Testa se o nome do drink aparece na tela.
  it('Test if the name of the drink is being displayed on the screen ', async () => {
    const titleDrink = await screen.findByTestId('recipe-title');
    expect(titleDrink).toHaveTextContent(/Aquamarine/i);
  });

  it('test if clicking on the share icon', async () => {
    const shareIcon = await screen.findByTestId('share-btn');
    expect(shareIcon).toBeInTheDocument();
  });

  it('test if clicking on the favorite icon', async () => {
    const favoriteIcon = await screen.findByAltText('Icone de favoritar');
    expect(favoriteIcon).toBeInTheDocument();
  });

  // Testa se a lista de ingredientes aparece na tela.
  it('Test if the ingredients list is being displayed on the screen', async () => {
    const firstIngredient = await screen.findByText('Hpnotiq - 2 oz');
    expect(firstIngredient).toBeInTheDocument();
  });

  // Testa se categoria ou se a bebida é alcoólica ou não aparece na tela.
  it('Test if the Alcoholic test is being displayed on the screen', async () => {
    const alcolica = await screen.findByText('Alcoholic');
    expect(alcolica).toBeInTheDocument();
  });

  // Testa se instruções de preparo aparecem na tela.
  it('Test if the ingredients list is being displayed on the screen', async () => {
    const instructionss = await screen
      .findByText('Shake well in a shaker with ice. Strain in a martini glass.');
    expect(instructionss).toBeInTheDocument();
  });
});
