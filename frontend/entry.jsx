import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import store from './store';

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(<App store={store} />, document.getElementById('root'));
});
