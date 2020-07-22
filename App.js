import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Main from './components/MainComponent';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

export default class App extends React.Component {
  render(){
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}


