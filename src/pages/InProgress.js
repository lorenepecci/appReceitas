import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import ProgressComponent from '../components/ProgressComponent';
import Context from '../context/Context';
import { getByType } from '../services/IDApi';

let noArray = [];
export default function InProgress({ match: { params: { id, foodOrDrink } } }) {
  const {
    setDataDetailed,
    setGetResult,
  } = useContext(Context);

  useEffect(() => {
    async function fetchData() {
      const response = await getByType(id, foodOrDrink);
      const results = response.meals ? response.meals : response.drinks;
      console.log(results, 'resultado');
      noArray = results;
      await setDataDetailed(results);
      await setGetResult(true);
    }
    fetchData();
  }, []);

  return (
    <div>
      {noArray.length
        ? (
          <ProgressComponent
            foodOrDrink={ foodOrDrink }
            id={ id }
            data={ noArray }
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
