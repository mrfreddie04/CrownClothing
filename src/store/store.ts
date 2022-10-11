import { compose, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root", //persist everything
  storage: storage,
  whitelist: ['cart'] //reducers we do not want to persist - user is coming automatically from firebase
}

//pass persist config and combine root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer );

//create middleware to add the logger to the reducer
//middleware is run before the action is processed by the reducer
const middlewares = process.env.NODE_ENV !== "production" ? [logger] : [];
//const middlewares = [process.env.NODE_ENV !== "production" && logger].filter(Boolean);
middlewares.push(thunk);

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancer = (process.env.NODE_ENV !== "production" 
      && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middlewares));

//create store - based on reducers
//store facilitates the movements of data
export const store = createStore( 
  persistedReducer, 
  undefined, 
  composeEnhancers
);

//create & export persistor object
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;