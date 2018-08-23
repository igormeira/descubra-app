/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
 StyleSheet,
 Text,
 View,
 Dimensions,
 TextInput,
 Button,
} from 'react-native';
import { Picker } from 'react-native-picker-dropdown'

import DescubraFetchService from '../services/DescubraFetchService';
import Notificacao from '../api/Notificacao'

const width = Dimensions.get('screen').width;

type Props = {};
export default class Cadastro extends Component<Props> {

  constructor() {
    super();
    this.state = {
        nome: '',
        email: '',
        senha: '',
        ddd: '',
        sexo: '',
        mensagem: '',
        data: []
    }
    this.onValueChange = this.handleValueChange.bind(this)
  }

  handleValueChange(sexo) {
    this.setState({ sexo })
  }

    isValid() {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

        if(this.state.nome === '') {
            Notificacao.exibe('Ops...','Nome em branco!');
        } else if (reg.test(this.state.email) === false) {
            Notificacao.exibe('Ops...','E-mail inválido!');
        } else if (this.state.senha === '') {
            Notificacao.exibe('Ops...','Senha em branco!');
        } else if (this.state.ddd === '') {
            Notificacao.exibe('Ops...','DDD em branco!');
        } else if (this.state.sexo === '') {
            Notificacao.exibe('Ops...','Sexo em branco!');
        } else {
            DescubraFetchService.get('/usuario/' + this.state.email)
                .then(json => this.setState({data: json}))
                .then( () => 
                    {if(this.state.data.length == 0) {
                        this.cadastrar();
                    } else {
                        Notificacao.exibe('Ops...','E-mail existente!');
                    }})
        }
    }

  cadastrar() {
    DescubraFetchService.postCadastro(this.state.nome, this.state.email, this.state.senha, this.state.ddd, this.state.sexo)
        .then( () =>
            this.props.navigator.resetTo({
                screen: 'Login',
                title: 'Login'
            })
        )
        .catch(e => this.setState({mensagem: e.mensagem}))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Descubra</Text>
        <View style={styles.form}>
            <TextInput style={styles.input}
                keyboardShouldPersistTaps={'handled'}
                placeholder='Nome...'
                onChangeText={texto => this.setState({nome: texto})}
                autoCapitalize='none' />

            <TextInput style={styles.input}
                placeholder='E-mail...'
                onChangeText={texto => this.setState({email: texto})}
                autoCapitalize='none' />

            <TextInput style={styles.input}
                placeholder='Senha...'
                onChangeText={texto => this.setState({senha: texto})}
                secureTextEntry={true} />

            <TextInput style={styles.input}
                keyboardType='numeric'
                placeholder='DDD...'
                onChangeText={texto => this.setState({ddd: texto})}
                autoCapitalize='none' />

            <Picker
                selectedValue={this.state.sexo}
                onValueChange={this.onValueChange}
                prompt="Sexo..."
                style={styles.picker}
                textStyle={styles.pickerText}
                cancel>
                <Picker.Item label="Feminino" value="feminino" />
                <Picker.Item label="Masculino" value="masculino" />
                <Picker.Item label="Outro" value="outro" />
            </Picker>

            <Button title='Cadastrar'
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
