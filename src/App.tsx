import React from 'react';
import './App.css';

import { Provider } from "react-redux"

import RouterManager from './app/RouteManager';
import { store } from './app/redux/store';
function App() {
  return (
    <Provider store={store}>
      <RouterManager />
    </Provider>
  );
}

export default App;
