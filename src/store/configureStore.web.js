import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // or whatever storage you are using
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import rootReducer from './../reducers';

// const config = {
//   key: 'primary',
//   storage,
//   blacklist: ['app', 'form', 'loading', 'error'],
// };

// const reducer = persistCombineReducers(config, rootReducer);

let middleware = [thunk];
// let middlewareApply;

middleware = [...middleware];

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)));
  persistStore(store, null, () => {
    store.getState();
  });
  return store;
}
