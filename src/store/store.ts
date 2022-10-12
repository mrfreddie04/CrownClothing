import { compose, createStore, applyMiddleware } from "redux";
//import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from "./root-reducer";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// Persists Reducer
const persistConfig = {
  key: "root", //persist everything
  storage: storage,
  whitelist: ['cart'] //reducers we do not want to persist - user is coming automatically from firebase
}

//pass persist config and combine root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer );

// Logger Middleware
//middleware is run before the action is processed by the reducer
const middlewares = process.env.NODE_ENV !== "production" ? [logger] : [];
//const middlewares = [process.env.NODE_ENV !== "production" && logger].filter(Boolean);

// Thunk middleware
//middlewares.push(thunk);

//Saga middleware - create and add to the middleware array
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

const composeEnhancer = (process.env.NODE_ENV !== "production" 
      && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middlewares));

//Create store - based on reducers
//store facilitates the movements of data
export const store = createStore( 
  persistedReducer, 
  undefined, 
  composeEnhancers
);

//Run Saga Middleware - after the store has been instantiated with saga middleware
sagaMiddleware.run(rootSaga);

//Create & export persistor object
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;