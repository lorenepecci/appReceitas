import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FooterPages from '../components/FooterPages';
import Header from '../components/Header';
import './Pages.css';

export default function Profile() {
  const [user, setUser] = useState('');
  const clearLocalStorage = () => {
    localStorage.clear();
  };

  const verifyEmail = () => {
    if (user) {
      return user.email;
    }
    return '';
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <div>
      <Header title="Profile">
        <p />
      </Header>
      <div className="profile-container">
        { user && <p data-testid="profile-email">{verifyEmail()}</p>}
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
