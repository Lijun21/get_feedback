import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

//tmp code to testing out the backend code, weather or not it works
import axios from 'axios';
window.axios = axios;

//createStore --> create a instance of our redux store, 3 prameter, 
//1. all differnet reducer inside of our app, give it a single reducer,
//2. starting initail state
//3. middleware
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  //provider knows how to read changes from our redux store and inform the App component to updata with the new state
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')
);

// console.log("strip key is ", process.env.REACT_APP_STRIPE_KEY);
// console.log("Envirnment is ", process.env.NODE_ENV);
// console.log("react version is : ", React.version);