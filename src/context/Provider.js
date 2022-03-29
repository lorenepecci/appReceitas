import PropTypes from 'prop-types';
import React from 'react';
import Context from './Context';

const Provider = ({ children }) => {
  const contextData = { };
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
