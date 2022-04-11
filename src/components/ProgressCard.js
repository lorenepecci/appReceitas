import PropTypes from 'prop-types';
import React from 'react';

export default function ProgressCard({ checkedState, index,
  measure, value, handleOnChange }) {
  return (
    <div>
      <label
        className="riscar"
        htmlFor={ index }
      >
        <input
          type="checkbox"
          id={ index }
          checked={ checkedState }
          onChange={ () => handleOnChange(index) }
        />
        <span
          className="tagp"
        >
          { `${value} - ${Object.values(measure)[index]}` }
        </span>
      </label>
    </div>
  );
}
ProgressCard.propTypes = {
  checkedState: PropTypes.arrayOf(PropTypes.bool).isRequired,
  index: PropTypes.string.isRequired,
  measure: PropTypes.objectOf(PropTypes.string).isRequired,
  value: PropTypes.number.isRequired,
  handleOnChange: PropTypes.func.isRequired,
};
