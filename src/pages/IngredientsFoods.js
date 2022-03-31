import React, { useEffect, useState } from 'react';
import CardIngredients from '../components/CardIngredients';
import FooterPages from '../components/FooterPages';
import Header from '../components/Header';

export default function IngredientsFoods() {
  const URLIngredients = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const [listIngredients, setListIngredients] = useState([]);
  const [twelveIngredients, setTwelveIngredients] = useState([]);
  useEffect(() => {
    const FetchIngredients = async () => {
      try {
        const response = await fetch(URLIngredients);
        const data = await response.json();
        setListIngredients(data.meals);
      } catch (error) {
        return error;
      }
    };
    FetchIngredients();
  }, []);
  /* strIngredient idIngredient */
  const num = 12;
  useEffect(() => {
    setTwelveIngredients(listIngredients
      .filter((_i, index) => index < num));
  }, [listIngredients]);

  return (
    <div>
      <Header title="Explore Ingredients" />
      { twelveIngredients.length
        && twelveIngredients.map((item, index) => (
          <div key={ index }>
            <CardIngredients
              name={ item.strIngredient }
              index={ index }
            />
          </div>
        ))}
      <FooterPages />
    </div>
  );
}
