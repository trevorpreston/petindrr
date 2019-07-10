import React from 'react';
import { StyleSheet, View } from 'react-native';

import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import { Provider } from 'react-redux';

import AppNavigator from './navigation/AppNavigator';

import userReducer from './reducers/userReducer';
import petReducer from './reducers/petReducer'

const client = axios.create({
  baseURL: 'http://localhost:19002/',
  responseType: 'json'
});

const allReducers = combineReducers({
  user: userReducer, 
  pet: petReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  allReducers,
  {},
  composeEnhancers(applyMiddleware(axiosMiddleware(client)))
);
 

export default function App(props) {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <AppNavigator/>
      </View>
    </Provider>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 0
  },
});
