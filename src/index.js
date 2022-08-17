import React from 'react';
import ReactDOM from 'react-dom/client';
import RouteCmp from './route/RouteCmp';
import { Provider } from 'react-redux';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
      <RouteCmp />
   </Provider>
);
