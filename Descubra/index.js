/** @format */

import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from 'react-native';

import App from './App';
import Login from './src/screens/Login';
import Cadastro from './src/screens/Cadastro';
import User from './src/screens/User';
import PlanosCelular from './src/screens/PlanosCelular';
import PlanosFixo from './src/screens/PlanosFixo';
import PlanosInternet from './src/screens/PlanosInternet';
import PlanosTv from './src/screens/PlanosTv';

Navigation.registerComponent('App', () => App);
Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Cadastro', () => Cadastro);
Navigation.registerComponent('User', () => User);
Navigation.registerComponent('PlanosCelular', () => PlanosCelular);
Navigation.registerComponent('PlanosFixo', () => PlanosFixo);
Navigation.registerComponent('PlanosInternet', () => PlanosInternet);
Navigation.registerComponent('PlanosTv', () => PlanosTv);

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
