import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title, showSearchIcon, foodOrDrink }) {
  const history = useHistory();
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <div className="header-container">
      <button
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Ícone do Perfil"
        />
      </button>
      <h1 data-testid="page-title">{ title }</h1>
      { showSearchIcon && (
        <button
          type="button"
          onClick={ () => { setShowSearchBar(!showSearchBar); } }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Ícone do Perfil"
          />
        </button>
      ) }
      {showSearchBar && <SearchBar foodOrDrink={ foodOrDrink } />}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearchIcon: PropTypes.bool,
  foodOrDrink: PropTypes.string,
};

Header.defaultProps = {
  showSearchIcon: false,
  foodOrDrink: '',
};
