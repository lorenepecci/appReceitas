import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('page Login', () => {
  const idEmail = 'email-input';
  const idPassword = 'password-input';
  let globalHistory;
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    globalHistory = history;
  });

  test('testa se existe o input email', () => {
    const text2 = screen.getByTestId(idEmail);
    expect(text2).toBeInTheDocument();
  });

  test('button hidden true ', () => {
    const button = screen.getByRole('button', { hidden: true });
    expect(button).toBeInTheDocument();
  });

  test('testa se após digitar no campo email ele recebe ', () => {
    const emailSimulation = 'lorenepecci@gmail.com';
    const inputEmail = screen.getByTestId(idEmail);
    console.log(inputEmail);
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toHaveValue('');
    userEvent.type(inputEmail, emailSimulation);
    expect(inputEmail).toHaveValue(emailSimulation);
  });

  test('testa se após digitar no campo password ele recebe', () => {
    const passwordSimulation = '99999999999999999999';
    const inputPassword = screen.getByTestId(idPassword);
    console.log(inputPassword);
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toHaveValue('');
    userEvent.type(inputPassword, passwordSimulation);
    expect(inputPassword).toHaveValue('99999999999999999999');
  });

  test('testar o click do botao ', () => {
    const button = screen.getByTestId('login-submit-btn');
    expect(button).toBeDisabled();
    const inputEmail = screen.getByTestId(idEmail);
    userEvent.type(inputEmail, 'lorenepecci@gmail.com');
    const inputPassword = screen.getByTestId(idPassword);
    userEvent.type(inputPassword, '99999999999999999999');
    expect(button).not.toBeDisabled();
    userEvent.click(button);
    globalHistory.push('/foods');
  });
});
