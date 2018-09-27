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
    Platform,
} from 'react-native';

import { Picker } from 'react-native-picker-dropdown';
import Dialog from "react-native-dialog";

import DescubraFetchService from '../../services/DescubraFetchService';
import Notificacao from '../../api/Notificacao';

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
            altPwd: false,
            oldPwd: '',
            newPwd: '',
            c_newPwd: '',
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
        const uri = 'https://descubra-api.herokuapp.com/usuario/update';
        AsyncStorage.getItem('usuario')
        .then( email => {
            const body = {
                email: email,
                nome: this.state.nome,
                ddd: this.state.ddd,
                sexo: this.state.sexo
            };
            DescubraFetchService.post(uri, body)
                .then(() => {
                    AsyncStorage.setItem('nome', this.state.nome),
                        AsyncStorage.setItem('sexo', this.state.sexo),
                        AsyncStorage.setItem('ddd', this.state.ddd.toString()),
                        this.props.navigator.resetTo({
                            screen: 'App',
                            title: 'Descubra'
                        })
                })
                .catch(e => this.setState({ mensagem: e.mensagem }))
        })
    }

    isValidSenha() {
        if (this.state.oldPwd === '') {
            Notificacao.exibe('Ops...', 'Forneça a senha atual!');
        } else if (this.state.newPwd === '') {
            Notificacao.exibe('Ops...', 'Forneça sua nova senha!');
        } else if (this.state.c_newPwd === '') {
            Notificacao.exibe('Ops...', 'Confirme sua senha!');
        } else if (!(this.state.c_newPwd === this.state.newPwd)) {
            Notificacao.exibe('Ops...', 'As senhas devem ser iguais!');
        } else {
            this.altSenha();
        }
    }

    altSenha() {
        const uri = 'https://descubra-api.herokuapp.com/usuario/change/password';
        AsyncStorage.getItem('usuario')
        .then( email => {
            return body = {
                email: email,
                senha: this.state.newPwd,
                old_pwd: this.state.oldPwd
            }
        })
        .then ( body => {
            AsyncStorage.getItem('senha')
            .then( senha => {
                if (senha === this.state.oldPwd) {
                    DescubraFetchService.post(uri, body)
                    .then(() => {
                        AsyncStorage.setItem('senha', this.state.newPwd),
                        this.setState({ altPwd : false })
                    })
                    .catch(e => this.setState({ mensagem: e.mensagem }))
                }
                else {
                    Notificacao.exibe('Ops...', 'Senha atual inválida!');
                }
            })
        })

            
    }

    showDialog() {
        this.setState({ altPwd : true });
    }

    dismissDialog() {
        this.setState({ altPwd : false });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Descubra</Text>
                
                <View style={styles.dialog}>
                    <Dialog.Container visible={this.state.altPwd}>
                        <Dialog.Title>Alterar senha</Dialog.Title>
                        <Dialog.Input
                            keyboardShouldPersistTaps={'handled'}
                            placeholder='Senha atual...'
                            onChangeText={texto => this.setState({ oldPwd: texto })}
                            autoCapitalize='none'
                            secureTextEntry={true} />
                        <Dialog.Input
                            keyboardShouldPersistTaps={'handled'}
                            placeholder='Senha nova...'
                            onChangeText={texto => this.setState({ newPwd: texto })}
                            autoCapitalize='none'
                            secureTextEntry={true} />
                        <Dialog.Input
                            keyboardShouldPersistTaps={'handled'}
                            placeholder='Confirme a senha...'
                            onChangeText={texto => this.setState({ c_newPwd: texto })}
                            autoCapitalize='none'
                            secureTextEntry={true} />

                        <Dialog.Button label="Cancelar" onPress={this.dismissDialog.bind(this)}/>
                        <Dialog.Button label="Alterar" onPress={this.isValidSenha.bind(this)}/>
                    </Dialog.Container>
                </View>
                
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

                    <View style={styles.button}>
                        <Button 
                        title='Salvar'
                        onPress={this.isValid.bind(this)} />
                    </View>
                    
                    <View style={styles.button}>
                        <Button 
                        title='Alterar Senha'
                        onPress={this.showDialog.bind(this)} />
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
    },
    button: {
        marginTop: Platform.OS === 'ios' ? 0 : 10,
    },
    dialog: {
        width: width * 0.8,
    },
});
