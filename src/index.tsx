import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from "./stripe/stripe.utils";

//import CartContextProvider from './context/CartContext';
//import AuthContextProvider from './context/AuthContext';
//import CategoryContextProvider from './context/CategoryContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          {/* <AuthContextProvider> */}
            {/* <CategoryContextProvider> */}
              {/* <CartContextProvider> */}
              <Elements stripe={stripePromise}>
                <App />
              </Elements>
              {/* </CartContextProvider> */}
            {/* </CategoryContextProvider> */}
          {/* </AuthContextProvider> */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
