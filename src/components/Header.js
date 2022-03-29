import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';

export default function Header({ title, showSearchIcon }) {
  const history = useHistory();
  // const [openInput, setOpenInput] = useState(false);

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
      { showSearchIcon && (<img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="Ícone do Perfil"
      />)}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearchIcon: PropTypes.bool.isRequired,
};
