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
} from 'react-native';
import { Picker } from 'react-native-picker-dropdown'

import DescubraFetchService from '../../services/DescubraFetchService';
import Notificacao from '../../api/Notificacao'

const width = Dimensions.get('screen').width;

type Props = {};
export default class EditUser extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            ddd: '',
            sexo: '',
            mensagem: '',
        }
        this.onValueChange = this.handleValueChange.bind(this)
    }

    handleValueChange(sexo) {
        this.setState({ sexo })
    }

    componentDidMount() {
        this.props.navigator.setOnNavigatorEvent(event => {
            if (event.id === 'willAppear')
                this.load();
        });
    }

    load() {
        AsyncStorage.getItem('nome')
        .then( nome => {
            this.setState({ nome: nome });
        });
        AsyncStorage.getItem('ddd')
        .then( ddd => {
            this.setState({ ddd: ddd });
        });
        AsyncStorage.getItem('sexo')
        .then( sexo => {
            this.setState({ sexo: sexo });
        });
    }

    isValid() {

        if (this.state.nome === '') {
            Notificacao.exibe('Ops...', 'Nome em branco!');
        } else if (this.state.ddd === '') {
            Notificacao.exibe('Ops...', 'DDD em branco!');
        } else if (this.state.sexo === '') {
            Notificacao.exibe('Ops...', 'Sexo em branco!');
        } else {
            this.salvar();
        }
    }

    salvar() {
        AsyncStorage.getItem('usuario')
        .then( email => {
            DescubraFetchService.postUpdate(email, this.state.nome, this.state.ddd, this.state.sexo)
                .then(() =>
                    this.props.navigator.resetTo({
                        screen: 'User',
                        title: 'Informações'
                    })
                )
                .catch(e => this.setState({ mensagem: e.mensagem }))
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Descubra</Text>
                <View style={styles.form}>
                    <TextInput style={styles.input}
                        keyboardShouldPersistTaps={'handled'}
                        placeholder={this.state.nome}
                        onChangeText={texto => this.setState({ nome: texto })}
                        autoCapitalize='none' />

                    <TextInput style={styles.input}
                        keyboardType='numeric'
                        placeholder={this.state.ddd}
                        onChangeText={texto => this.setState({ ddd: texto })}
                        autoCapitalize='none' />

                    <Picker
                        selectedValue={this.state.sexo}
                        onValueChange={this.onValueChange}
                        prompt={this.state.sexo}
                        style={styles.picker}
                        textStyle={styles.pickerText}
                        cancel>
                        <Picker.Item label="Feminino" value="feminino" />
                        <Picker.Item label="Masculino" value="masculino" />
                        <Picker.Item label="Outro" value="outro" />
                    </Picker>

                    <Button title='Salvar'
                        onPress={this.isValid.bind(this)} />

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
    mensagem: {
        marginTop: 15,
        color: '#e74c3c'
    },
    picker: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 10,
    },
    pickerText: {
        color: 'black',
    }
});
