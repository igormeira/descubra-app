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
    AsyncStorage,
    Platform
} from 'react-native';

import DescubraFetchService from '../services/DescubraFetchService';
import Notificacao from '../api/Notificacao';
import Loader from '../components/Loader';

const width = Dimensions.get('screen').width;

type Props = {};
export default class Login extends Component<Props> {

    constructor() {
        super();
        this.state = {
            usuario: '',
            senha: '',
            loading: false,
            showText: false,
        }
    }

    efetuaLogin() {
        if (this.state.usuario != '' && this.state.senha != '') {
            this.setState({ loading: true });
            const uri = 'https://descubra-api.herokuapp.com/login';
            const body = {
                email: this.state.usuario,
                senha: this.state.senha
            };
            DescubraFetchService.post(uri, body)
                .then(json => {
                    if (json[0].Authorized === true) {
                        AsyncStorage.setItem('token', json[0].access_token),
                            AsyncStorage.setItem('refresh_token', json[0].refresh_token),
                            AsyncStorage.setItem('usuario', this.state.usuario),
                            AsyncStorage.setItem('senha', this.state.senha),
                            AsyncStorage.setItem('nome', json[0].info[0].nome),
                            AsyncStorage.setItem('sexo', json[0].info[0].sexo),
                            AsyncStorage.setItem('ddd', json[0].info[0].ddd.toString()),
                            this.props.navigator.resetTo({
                                screen: 'App',
                                title: 'Descubra'
                            })
                    }
                    else {
                        this.setState({ loading: false });
                        this.setState({ showText: true });
                    }
                })
                .catch(e => this.setState({ mensagem: 'FALHA_CARREGAMENTO' }))
        }
        else {
            Notificacao.exibe('Ops...', 'Preencha os dados!');
        };
    }

    invalido() {
        this.setState({ loading: false });
    }

    cadastrar() {
        this.props.navigator.push({
            screen: 'Cadastro',
            title: 'Cadastro',
            backButtonTitle: ''
        })
    }

    render() {
        return (
            <View style={styles.container}>

                <Loader
                    loading={this.state.loading} />

                <Text style={styles.titulo}>Descubra</Text>

                {this.state.showText ? <Text style={styles.dadosInvalidos}>
                    Dados inválidos!
                </Text> : null} 

                <View style={styles.form}>
                    <TextInput style={styles.input}
                        placeholder='E-mail...'
                        onChangeText={texto => this.setState({ usuario: texto })}
                        autoCapitalize='none' />

                    <TextInput style={styles.input}
                        placeholder='Senha...'
                        onChangeText={texto => this.setState({ senha: texto })}
                        secureTextEntry={true} />

                    <View style={styles.button}>
                        <Button
                            title='Login'
                            onPress={this.efetuaLogin.bind(this)} />
                    </View>

                    <View style={styles.button}>
                        <Button
                            title='Criar conta'
                            onPress={this.cadastrar.bind(this)} />
                    </View>

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
    button: {
        marginTop: Platform.OS === 'ios' ? 0 : 10,
    },
    dadosInvalidos: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#e74c3c',
        marginTop: 3,
        marginBottom: 3
    },
});
