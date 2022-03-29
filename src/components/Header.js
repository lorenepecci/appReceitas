import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ title }) {
  return (
    <div>
      <Link to="/profile">
        <button
          type="button"
          // onClick={ () => history.push('/profile') }
          // onClick={ () => {} }
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Ícone do Perfil"
          />
        </button>
      </Link>
      <h1 data-testid="page-title">{ title }</h1>
      <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="Ícone do Perfil"
      />
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  // history: PropTypes.shape({
  //   push: PropTypes.func.isRequired,
  // }).isRequired,
};
