import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Main from './components/MainComponent';
import 'react-native-gesture-handler';

export default class App extends React.Component {
  render(){
    return (
      <Main />
    );
  }
}


