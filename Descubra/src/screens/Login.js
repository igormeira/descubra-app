/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native';

import DescubraFetchService from '../services/DescubraFetchService';
import Notificacao from '../api/Notificacao';

const width = Dimensions.get('screen').width;

type Props = {};
export default class Login extends Component<Props> {

  constructor() {
    super();
    this.state = {
      usuario: '',
      senha: ''
    }
  }

  efetuaLogin() {
    if (this.state.usuario != '' && this.state.senha != '') {
      DescubraFetchService.postLogin(this.state.usuario, this.state.senha)
        .then(json => {
          if (json[0].Authorized === true) {
              AsyncStorage.setItem('token', json[0].access_token),
              AsyncStorage.setItem('refresh_token', json[0].refresh_token),
              AsyncStorage.setItem('usuario', this.state.usuario),
              this.props.navigator.resetTo({
                screen: 'App',
                title: 'Descubra'
              })
          } else {
            Notificacao.exibe('Ops...', 'Dados inválidos!');
          }
        }
        )
        .catch(e => this.setState({ mensagem: 'FALHA_CARREGAMENTO' }))
    } else {
      Notificacao.exibe('Ops...', 'Preencha os dados!');
    }

  }

  cadastrar() {
    this.props.navigator.resetTo({
      screen: 'Cadastro',
      title: 'Cadastro'
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Descubra</Text>
        <View style={styles.form}>
          <TextInput style={styles.input}
            placeholder='E-mail...'
            onChangeText={texto => this.setState({ usuario: texto })}
            autoCapitalize='none' />

          <TextInput style={styles.input}
            placeholder='Senha...'
            onChangeText={texto => this.setState({ senha: texto })}
            secureTextEntry={true} />

          <Button title='Login'
            onPress={this.efetuaLogin.bind(this)} />
          <Button title='Criar conta'
            onPress={this.cadastrar.bind(this)} />

        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    width: width * 0.8
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 26
  },
});
