import React from 'react';
import Drinks from '../images/drinkIcon.svg';
import Explore from '../images/exploreIcon.svg';
import Foods from '../images/mealIcon.svg';
import './Footer.css';

const FooterPages = () => (
  <div>
    <footer id="footer-page" data-testid="footer">
      <button type="button">
        <img
          data-testid="drinks-bottom-btn"
          src={ Drinks }
          alt="Icone de bebidas"
        />
      </button>
      <button type="button">
        <img data-testid="explore-bottom-btn" src={ Explore } alt="Icone de explorar" />
      </button>
      <button data-testid="food-bottom-btn" type="button" src={ Foods }>
        <img data-testid="food-bottom-btn" src={ Foods } alt="Icone de comidas" />
      </button>
    </footer>
  </div>
);

export default FooterPages;
