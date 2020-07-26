import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Main from './components/MainComponent';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Loading } from './components/LoadingComponents';
import { registerRootComponent } from 'expo';

const { persistor, store} = ConfigureStore();

export default class App extends React.Component {
  render(){
    return (
      <Provider store={store}>
        <PersistGate
          laoding={<Loading />}
          persistor={persistor}
          >
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}


registerRootComponent(App);