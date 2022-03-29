import React from 'react';
import { Link } from 'react-router-dom';
import FooterPages from '../components/FooterPages';
import Header from '../components/Header';
import './Pages.css';

export default function Profile() {
  const getUser = JSON.parse(localStorage.getItem('user'));
  const clearLocalStorage = () => {
    localStorage.clear();
  };
  return (
    <div>
      <Header />
      <div className="profile-container">
        <p data-testid="profile-email">{getUser.email}</p>
        <Link to="/done-recipes">
          <button data-testid="profile-done-btn" type="button">Done Recipes</button>
        </Link>
        <Link to="/favorite-recipes">
          <button
            data-testid="profile-favorite-btn"
            type="button"
          >
            Favorite Recipes
          </button>
        </Link>
        <Link to="/">
          <button
            onClick={ clearLocalStorage }
            data-testid="profile-logout-btn"
            type="button"
          >
            Logout
          </button>
        </Link>
      </div>
      <FooterPages />
    </div>
  );
}
