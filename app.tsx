import React, { Fragment } from 'react';
import './style.css';
import { useSelector } from 'react-redux';

import Login from './components/login';
import View from './components/view';

const Start = () => {
  const { isLoggedIn } = useSelector((state) => state.userReducer);
  return (
    <Fragment>
      {!isLoggedIn && <Login />}
      {isLoggedIn && <View />}
    </Fragment>
  );
};

export default Start;
