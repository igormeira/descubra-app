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
    Image,
    AsyncStorage,
    Button,
} from 'react-native';

import DescubraFetchService from '../services/DescubraFetchService';
import Notificacao from '../api/Notificacao';

const width = Dimensions.get('screen').width;

type Props = {};
export default class User extends Component<Props> {

    constructor() {
        super();
        this.state = {
            nome: '',
            email: '',
            ddd: '',
            sexo: '',
        }
    }

    componentDidMount() {
        this.props.navigator.setOnNavigatorEvent(event => {
            if(event.id === 'willAppear')
                this.load();
        });
    }

    load() {
        //AsyncStorage returns a promise
        AsyncStorage.getItem('usuario')
        .then( usuario => {
            const uri = '/usuario/' + usuario
            return uri
        })
        .then( uri => {
            DescubraFetchService.get(uri)
            .then(json => {
                this.setState({nome: json[0].nome}),
                this.setState({email: json[0].email}),
                this.setState({ddd: json[0].ddd}),
                this.setState({sexo: json[0].sexo})
            })
            .catch(e => this.setState({status: 'FALHA_CARREGAMENTO'}));
        })
    }

    render() {
        return (
        <View style={styles.container}>
            <Image style={styles.img} source={require("../../resources/images/default_user.png")}/>

            <Text style={styles.info} >
                Nome: {this.state.nome}
            </Text>

            <Text style={styles.info} >
                E-mail: {this.state.email}
            </Text>

            <Text style={styles.info} >
                DDD: {this.state.ddd}
            </Text>

            <Text style={styles.info} >
                Sexo: {this.state.sexo}
            </Text>

        </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        alignItems: 'center'
    },
    info: {
        fontSize: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 10,
    },
    img: {
        width: 150,
        height: 150,
        marginBottom: 20,
        marginTop: 20,
    }
});
