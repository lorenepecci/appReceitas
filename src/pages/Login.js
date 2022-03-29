import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

export default function Login() {
  const {
    userInfos,
    setUserInfos,
    loginButtonDissabled,
    setLoginButtonDissabled,
  } = useContext(Context);

  const history = useHistory();

  const validadeForm = () => {
    const { email, password } = userInfos;
    const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/i;
    const minPasswordLenght = 5;
    if (emailRegex.test(email) && password.length > minPasswordLenght) {
      setLoginButtonDissabled(false);
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfos((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validadeForm();
  };

  const handleClick = (event) => {
    event.preventDefault();
    const { email } = userInfos;
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  };

  return (
    <form>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          data-testid="email-input"
          name="email"
          id="email"
          value={ userInfos.email }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          type="password"
          data-testid="password-input"
          name="password"
          id="password"
          value={ userInfos.password }
          onChange={ handleChange }
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="submit"
        disabled={ loginButtonDissabled }
        onClick={ handleClick }
      >
        Enter
      </button>
    </form>
  );
}
