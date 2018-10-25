/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, Linking, AsyncStorage} from 'react-native';

import call from 'react-native-phone-call';

import DescubraFetchService from '../services/DescubraFetchService';
import Notificacao from '../api/Notificacao';

type Props = {};
export default class PlanosInfo extends Component<Props> {

    constructor() {
        super();
        this.state = {
            liked: false,
        }
    }

    maisInfo(op) {
        switch(op) {
            case 'TIM':
                return Linking.openURL('http://www.tim.com.br');
            case 'Oi':
                return Linking.openURL('https://www.oi.com.br');
            default:
                return;
        }
    }

    callTo(op) {
        switch(op) {
            case 'TIM':
                return;
            case 'Oi':
                const args = {
                    number: '987272773', // String value with the number to call
                    prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
                };
                call(args).catch(console.error);
            default:
                return;
        }
    }

    likeIcon() {
        return this.state.liked ? require('../../resources/images/likefull.png') :
        require('../../resources/images/like.png')
    }

    like(id, type, user) {
        if (this.state.liked) {
            let uri = '/remove/' + type + '/fav/' + id + '/' + user;
            DescubraFetchService.get(uri)
            .then( () => { this.setState({liked: false })})
            .then( () => { this.likeIcon(this.state.liked) })
            .catch(e => this.setState({status: 'FALHA_CARREGAMENTO'}));
        }
        else {
            let uri = '/add/' + type + '/fav/' + id + '/' + user;
            DescubraFetchService.get(uri)
            .then( () => { this.setState({liked: false })})
            .then( () => { this.likeIcon(this.state.liked) })
            .catch(e => this.setState({status: 'FALHA_CARREGAMENTO'}));
        }
    }

    liked(id, type, user) {
        let uri = '/' + type + '/fav/' + user + '/' + id;

        DescubraFetchService.get(uri)
            .then( json => {
                if (json.length > 0){
                    this.setState({liked: true});
                } 
                else {
                    this.setState({liked: false});
                }
                
            })
            .catch(e => this.setState({status: 'FALHA_CARREGAMENTO'}))
    }
    
    render() {

        const { data, user } = this.props;
        this.liked(data.id, data.tipo, user);

        return (
            
            <View style={styles.containerItem} >
                <View style={styles.containerOperadora}>
                    <Text style={{fontWeight: 'bold'}}>
                        {data.operadora}</Text>
                </View>

                <View style={styles.containerPlano}>
                    <View style={styles.containerTitulo}>
                        <Text style={{fontWeight: 'bold'}}>Plano</Text>
                    </View>
                    <View style={styles.containerTitulo}>
                        <Text style={{fontWeight: 'bold'}}>Preço</Text>
                    </View>
                    <View style={styles.containerTitulo}>
                        <Text style={{fontWeight: 'bold'}}>Validade</Text>
                    </View>
                </View>

                <View style={styles.containerPlano}>
                    <View style={styles.containerTitulo}>
                        <Text>{data.plano}</Text>
                    </View>
                    <View style={styles.containerTitulo}>
                        <Text>{data.preco}</Text>
                    </View>
                    <View style={styles.containerTitulo}>
                        <Text>{data.validade}</Text>
                    </View>
                </View>

                <View style={styles.containerDetalhes}>
                    <Text style={{fontWeight: 'bold'}}>Detalhes</Text>
                    <Text>{data.detalhes}</Text>
                </View>

                <View style={styles.containerBotoes}>
                    <TouchableOpacity style={styles.botao} onPress={() => this.callTo(data.operadora)} >
                        <Image style={styles.img} source={require("../../resources/images/call.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => this.maisInfo(data.operadora)} >
                        <Image style={styles.img} source={require("../../resources/images/info.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => this.like(data.id, data.tipo, user)} >
                        <Image style={styles.img} source={this.likeIcon()}/>
                    </TouchableOpacity>
                </View>
        
            </View>
                    
        );
    }
}

const styles = StyleSheet.create({
    containerItem: {
        flex: 1,
        backgroundColor: '#C6E2FF',
        marginTop: 2,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    containerOperadora: {
        flex: 1,
        alignItems: 'center',
        marginTop: 5,
    },
    containerPlano: {
        flex: 1,
        flexDirection: 'row',
    },
    containerTitulo: {
        flex: 1,
        alignItems: 'center',
        fontWeight: 'bold',
    },
    containerDetalhes: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 5,
    },
    containerBotoes: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
    },
    botao: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        height: 30,
        width: 30,
    },
});
