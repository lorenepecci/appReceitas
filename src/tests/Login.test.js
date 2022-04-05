import { screen } from '@testing-library/react';
import React from 'react';
import Login from '../pages/Login';
import renderWithRouter from './renderWithRouter';

beforeEach(() => {
  renderWithRouter(<Login />);
});

describe('page Login', () => {
  test('text Login ', () => {
    /* const text = screen.getByLabelText('email'); */
    /* const text2 = screen.getByTestId( 'email-input' ); */
    const text3 = screen.getByRole('email-input');
    expect(text3).toBeInTheDocument();
  });

  test('button hidden true ', () => {
    const button = screen.getAllByRole('button', { hidden: true });
    expect(button).toBeInTheDocument();
  });
});
