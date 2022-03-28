import React, { Fragment, useEffect } from 'react';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';

import Login from './components/login';
import View from './components/view';

const Start = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (localStorage.getItem('token'))
      dispatch({ type: 'SET_LOGGEDIN', payload: true });
  });
  return (
    <Fragment>
      {!isLoggedIn && <Login />}
      {isLoggedIn && <View />}
    </Fragment>
  );
};

export default Start;
