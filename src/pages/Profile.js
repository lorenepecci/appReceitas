import React from 'react';
import FooterPages from '../components/FooterPages';
import Header from '../components/Header';
import './Pages.css';

export default function Profile() {
  return (
    <div>
      <Header />
      <div className="profile-container">
        <p data-testid="profile-email">Email</p>
        <button data-testid="profile-done-btn" type="button">Done Recipes</button>
        <button data-testid="profile-favorite-btn" type="button">Favorite Recipes</button>
        <button data-testid="profile-logout-btn" type="button">Logout</button>
      </div>
      <FooterPages />
    </div>
  );
}
