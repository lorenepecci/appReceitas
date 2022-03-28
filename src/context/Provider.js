import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

const Provider = ({ children }) => {
  const [searchState, setSearchState] = useState({
    searchInput: '',
    ingredient: false,
    name: false,
    firstLetter: false,
  });
  const contextData = { searchState, setSearchState };
  return (
    <Context.Provider value={ contextData }>
      { children }
    </Context.Provider>
  );
};
Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
