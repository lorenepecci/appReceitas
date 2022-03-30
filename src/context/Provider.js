import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

const Provider = ({ children }) => {
  const [userInfos, setUserInfos] = useState({
    email: '',
    password: '',
  });

  const [loginButtonDissabled, setLoginButtonDissabled] = useState(true);

  const contextData = {
    userInfos,
    setUserInfos,
    loginButtonDissabled,
    setLoginButtonDissabled,
  };

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
