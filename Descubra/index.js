/** @format */

import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from 'react-native';

import App from './App';
import Login from './src/screens/Login';
import Cadastro from './src/screens/Cadastro';
import User from './src/screens/User';
import PlanosCelular from './src/screens/PlanosCelular';
import Planos from './src/screens/Planos';
import Favoritos from './src/screens/Favoritos';

Navigation.registerComponent('App', () => App);
Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Cadastro', () => Cadastro);
Navigation.registerComponent('User', () => User);
Navigation.registerComponent('PlanosCelular', () => PlanosCelular);
Navigation.registerComponent('Planos', () => Planos);
Navigation.registerComponent('Favoritos', () => Favoritos);

AsyncStorage.getItem('token')
  .then(token => {
    if(token) {
      return {
        screen: 'App',
        title: 'Descubra'
      };
    }
    return {
      screen: 'Login',
      title: 'Login'
    }
  })
  .then(screen => {
    Navigation.startSingleScreenApp({screen : screen});
  });
