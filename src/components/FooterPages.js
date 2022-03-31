import React from 'react';
import { Link } from 'react-router-dom';
import Drinks from '../images/drinkIcon.svg';
import Explore from '../images/exploreIcon.svg';
import Foods from '../images/mealIcon.svg';

const FooterPages = () => (
  <div>
    <footer id="footer-page" data-testid="footer">
      <Link to="/drinks">
        <button type="button">
          <img
            data-testid="drinks-bottom-btn"
            src={ Drinks }
            alt="Icone de bebidas"
          />
        </button>
      </Link>
      <Link to="/explore">
        <button type="button">
          <img data-testid="explore-bottom-btn" src={ Explore } alt="Icone de explorar" />
        </button>
      </Link>
      <Link to="/foods">
        <button type="button">
          <img data-testid="food-bottom-btn" src={ Foods } alt="Icone de comidas" />
        </button>
      </Link>
    </footer>
  </div>
);

export default FooterPages;
