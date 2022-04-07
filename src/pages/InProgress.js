import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import ProgressComponent from '../components/ProgressComponent';
import Context from '../context/Context';
import { getByType } from '../services/IDApi';

export default function InProgress({ match: { params: { id, foodOrDrink } } }) {
  const {
    setDataDetailed,
    setGetResult,
    getResult,
  } = useContext(Context);

  useEffect(() => {
    async function fetchData() {
      const response = await getByType(id, foodOrDrink);
      const results = response.meals ? response.meals : response.drinks;
      await setDataDetailed(results);
      await setGetResult(true);
    }
    fetchData();
  }, [foodOrDrink, id, setDataDetailed, setGetResult]);

  return (
    <div>
      {getResult
        ? (
          <ProgressComponent
            foodOrDrink={ foodOrDrink }
            id={ id }
          />
        ) : <p>Carregando...</p> }
    </div>
  );
}

InProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      foodOrDrink: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
