import { screen } from '@testing-library/react';
import React from 'react';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouter from './renderWithRouter';

describe('page DoneRecipes', () => {
  beforeEach(() => {
    renderWithRouter(<DoneRecipes />);
  });
  test('heading DoneRecipes ', () => {
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Done Recipes');
  });
  test('button all ', () => {
    const title = screen.getByText('All');
    expect(title).toBeInTheDocument();
  });
  test('button Food ', () => {
    const title = screen.getByText('Food');
    expect(title).toBeInTheDocument();
  });
  test('button Drinks ', () => {
    const title = screen.getByText('Drinks');
    expect(title).toBeInTheDocument();
  });
});
