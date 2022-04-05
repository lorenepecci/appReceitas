import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('page Login', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('text Login ', () => {
    const text2 = screen.getByTestId(idEmail);
    expect(text2).toBeInTheDocument();
  });

  test('button hidden true ', () => {
    const button = screen.getByRole('button', { hidden: true });
    expect(button).toBeInTheDocument();
  });

  test('input email', () => {
    const idEmail = 'email-input';
    const emailSimulation = 'lorenepecci@gmail.com';
    const inputEmail = screen.getByTestId(idEmail);
    console.log(inputEmail);
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toHaveValue('');
    userEvent.type(inputEmail, emailSimulation);
    expect(inputEmail).toHaveValue(emailSimulation);
  });

  test('input password', () => {
    const idPassword = 'password-input';
    const passwordSimulation = '99999999999999999999';
    const inputPassword = screen.getByTestId(idPassword);
    console.log(inputPassword);
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toHaveValue('');
    userEvent.type(inputPassword, passwordSimulation);
    expect(inputPassword).toHaveValue('99999999999999999999');
  });

  test('disable button ', () => {
    const idPassword = 'password-input';
    const button = screen.getByRole('button', { hidden: true });
    const inputEmail = screen.getByTestId(idPassword);
    userEvent.type(inputEmail, 'lorenepecci@gmail.com');
    const inputPassword = screen.getByTestId(idPassword);
    userEvent.type(inputPassword, '99999999999999999999');
    expect(button.hidden).toBe(false);
  });
});
