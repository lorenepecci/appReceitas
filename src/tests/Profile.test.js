import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('page Profile', () => {
  let globalHistory;
  const emailFake = 'lorenepecci@gmail.com';
  const idEmail = 'email-input';
  const idPassword = 'password-input';
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    globalHistory = history;
  });
  test('button Done Recipes ', async () => {
    globalHistory.push('/profile');
    const text = await screen.findByText('Done Recipes');
    expect(text).toBeInTheDocument();
    text.click();
    globalHistory.push('/done-recipes');
  });

  test('button Favorite Recipes ', async () => {
    globalHistory.push('/profile');
    const text2 = await screen.findByText('Favorite Recipes');
    expect(text2).toBeInTheDocument();
    text2.click();
    globalHistory.push('/favorite-recipes');
  });

  test('button Logout ', async () => {
    globalHistory.push('/profile');
    const text3 = await screen.findByText('Logout');
    expect(text3).toBeInTheDocument();
    text3.click();
    globalHistory.push('/');
  });

  test('verificar se o email aparece', () => {
    const button = screen.getByTestId('login-submit-btn');
    expect(button).toBeDisabled();
    const inputEmail = screen.getByTestId(idEmail);
    userEvent.type(inputEmail, emailFake);
    const inputPassword = screen.getByTestId(idPassword);
    userEvent.type(inputPassword, '99999999999999999999');
    expect(button).not.toBeDisabled();
    userEvent.click(button);
    globalHistory.push('/foods');
    const btnProfile = screen.getByTestId('profile-top-btn-btn');
    userEvent.click(btnProfile);
    globalHistory.push('/profile');
    const emailProfile = screen.getByTestId('profile-email');
    expect(emailProfile).toHaveTextContent(emailFake);
  });

  test('verificar se o email nao aparece', () => {
    /*  const button = screen.getByTestId('login-submit-btn');
    expect(button).toBeDisabled();
    const inputEmail = screen.getByTestId(idEmail);
    userEvent.type(inputEmail, '');
    const inputPassword = screen.getByTestId(idPassword);
    userEvent.type(inputPassword, '99999999999999999999');
    expect(button).not.toBeDisabled();
    userEvent.click(button);
    globalHistory.push('/foods');
    const btnProfile = screen.getByTestId('profile-top-btn-btn');
    userEvent.click(btnProfile); */
    globalHistory.push('/profile');
    const emailProfile = screen.getByTestId('profile-email');
    expect(emailProfile).toHaveTextContent('');
  });
});
