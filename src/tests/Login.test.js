import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('page Login', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('testa se existe o input email', () => {
    const idEmail = 'email-input';
    const text2 = screen.getByTestId(idEmail);
    expect(text2).toBeInTheDocument();
  });

  test('button hidden true ', () => {
    const button = screen.getByRole('button', { hidden: true });
    expect(button).toBeInTheDocument();
  });

  test('testa se após digitar no campo email ele recebe ', () => {
    const idEmail = 'email-input';
    const emailSimulation = 'lorenepecci@gmail.com';
    const inputEmail = screen.getByTestId(idEmail);
    console.log(inputEmail);
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toHaveValue('');
    userEvent.type(inputEmail, emailSimulation);
    expect(inputEmail).toHaveValue(emailSimulation);
  });

  test('testa se após digitar no campo password ele recebe', () => {
    const idPassword = 'password-input';
    const passwordSimulation = '99999999999999999999';
    const inputPassword = screen.getByTestId(idPassword);
    console.log(inputPassword);
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toHaveValue('');
    userEvent.type(inputPassword, passwordSimulation);
    expect(inputPassword).toHaveValue('99999999999999999999');
  });

  test.only('testar o click do botao ', () => {
    const { history } = renderWithRouter(<App />);
    const idEmail = 'email-input';
    const idPassword = 'password-input';
    const button = screen.getByTestId('login-submit-btn');
    console.log(button);
    expect(button).toBeDisabled();
    const inputEmail = screen.getByTestId(idEmail);
    userEvent.type(inputEmail, 'lorenepecci@gmail.com');
    const inputPassword = screen.getByTestId(idPassword);
    userEvent.type(inputPassword, '99999999999999999999');
    expect(button).not.toBeDisabled();
    userEvent.click(button);
    history.push('/foods');
    /*  const text2 = screen.getByText('Foods');
    expect(text2).toBeInTheDocument(); */
  });
});
