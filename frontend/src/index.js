import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/app/store';
import { Provider } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const publishableKey =
  'pk_test_51MJgDSB83C7nM6cpUcvMU0emvlX5JWBD4ejCvUTgYSGjj49qdaDJSiSYv77yOMnK807yV7t0qMH7ZyQd18tF13BO00PUT2lVNv';
const stripePromise = loadStripe(publishableKey);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
