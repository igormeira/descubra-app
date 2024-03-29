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
    TouchableOpacity, 
    Image, 
    AsyncStorage,
    Dimensions,
} from 'react-native';

import DescubraFetchService from '../services/DescubraFetchService';
import Dialog from "react-native-dialog";
import Loader from '../components/Loader';

const width = Dimensions.get('screen').width;

type Props = {};
export default class App extends Component<Props> {

    constructor() {
        super();
        this.state = {
            quit: false,
            loading: false,
        }
    }

    exit() {
        this.setState({ loading: true });
        AsyncStorage.getItem('token')
            .then( token => {
                DescubraFetchService.postLogout(token)
                .then( () => {
                    AsyncStorage.removeItem('token'),
                    AsyncStorage.removeItem('refresh_token'),
                    AsyncStorage.removeItem('usuario')
                })
                .then( () => {
                    this.dismissDialog(),
                    this.props.navigator.resetTo({
                        screen: 'Login',
                        title: 'Login'
                    })
                })
            })
    }

    userInfo() {
        this.props.navigator.push({
            screen: 'User',
            title: 'Informações',
            backButtonTitle: ''
        })
    }

    planos(tb) {
        if (tb === "celular") {
            this.props.navigator.push({
                screen: 'PlanosCelular',
                title: tb,
                backButtonTitle: '',
            })
        }
        else {
            AsyncStorage.setItem("table", tb);
            this.props.navigator.push({
                screen: 'Planos',
                title: tb,
                backButtonTitle: '',
            })
        }
    }

    favs() {
        this.props.navigator.push({
            screen: 'Favoritos',
            title: 'Favoritos',
            backButtonTitle: ''
        })
    }

    showDialog() {
        this.setState({ quit : true });
    }

    dismissDialog() {
        this.setState({ quit : false });
    }

    render() {
        return (
            <View style={styles.containerAll}>

                <Loader
                    loading={this.state.loading} />

                <View style={styles.dialog}>
                    <Dialog.Container visible={this.state.quit}>
                        <Dialog.Title>Deseja sair?</Dialog.Title>
                        <Dialog.Button label="Cancelar" onPress={this.dismissDialog.bind(this)} />
                        <Dialog.Button label="Sair" onPress={this.exit.bind(this)} />
                    </Dialog.Container>
                </View>

                <View style={styles.container}>
                    <View style={styles.containerHalf}>
                        <TouchableOpacity onPress={() => this.planos("celular")}
                            style={styles.buttonLeft}>
                            <Image
                                style={styles.buttonImg}
                                source={require('../../resources/images/cell.png')} />
                            <Text>Planos para Celular</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.planos("fixo")}
                            style={styles.buttonRight}>
                            <Image
                                style={styles.buttonImg}
                                source={require('../../resources/images/fixo.png')} />
                            <Text>Planos para Fixo</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerHalf}>
                        <TouchableOpacity onPress={() => this.planos("internet")}
                            style={styles.buttonLeft}>
                            <Image
                                style={styles.buttonImg}
                                source={require('../../resources/images/internet.png')} />
                            <Text>Planos para Internet</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.planos("tv")}
                            style={styles.buttonRight}>
                            <Image
                                style={styles.buttonImg}
                                source={require('../../resources/images/tv.png')} />
                            <Text>Planos para TV</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.containerBar}>
                    <TouchableOpacity style={styles.botao} onPress={() => this.userInfo()} >
                        <Image style={styles.img} source={require("../../resources/images/user_bt.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => this.favs()} >
                        <Image style={styles.img} source={require("../../resources/images/like.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => this.showDialog()} >
                        <Image style={styles.img} source={require("../../resources/images/exit.png")}/>
                    </TouchableOpacity>
                </View>

            </View> 
        );
    }
}

const styles = StyleSheet.create({
    containerAll: {
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    containerHalf: {
        flex: 1,
        flexDirection: 'row'
    },
    buttonLeft: {
        flex: 1,
        backgroundColor: '#B0E2FF',
        marginTop: 1,
        marginLeft: 2,
        marginRight: 1,
        marginBottom: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    buttonRight: {
        flex: 1,
        backgroundColor: '#B0E2FF',
        marginTop: 1,
        marginRight: 2,
        marginLeft: 1,
        marginBottom: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonImg: {
        height: 100,
        width: 100,
    },
    containerBar: {
        flex: 0.075,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
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
    dialog: {
        width: width * 0.8,
    },
});
