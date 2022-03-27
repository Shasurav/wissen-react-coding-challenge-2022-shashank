import React, { Fragment, useState } from 'react';
import { render } from 'react-dom';
import './style.css';
import { Provider } from 'react-redux';
import configureStore from './store';

import Start from './app';

const App = () => {
  const store = configureStore({});
  return (
    <Provider store={store}>
      <Start />
    </Provider>
  );
};

render(<App />, document.getElementById('root'));
