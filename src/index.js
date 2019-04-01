import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
// redux thunk is a middleware and we want to apply it to our store
import thunk from 'redux-thunk';
// related to react-redux-firebase, redux-firebase packages
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
// import config file we want to use as aparameter for reduxfirebase/firestore
import fbConfig from './config/fbConfig';
const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore })),
    reactReduxFirebase(fbConfig, { useFirestoreForProfile: true , userProfile : 'users' ,attachAuthIsReady: true}),
    reduxFirestore(fbConfig)
  )
);

store.firebaseAuthIsReady.then( () => {
  ReactDOM.render( <Provider store={store}><App /></Provider>, document.getElementById('root'));
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
