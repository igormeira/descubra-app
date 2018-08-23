/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import DescubraFetchService from './src/services/DescubraFetchService';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.load();
    }

    load() {
        let uri = '/celular';

        DescubraFetchService.get(uri)
            .then(json => this.setState({data: json}))
            .catch(e => this.setState({status: 'FALHA_CARREGAMENTO'}));
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerInfo}>
                    <Text style={styles.welcome}>Welcome to React Native!</Text>
                    <Text style={styles.instructions}>To get started, edit App.js</Text>
                    <Text style={styles.instructions}>{instructions}</Text>
                </View>
                <View style={styles.displayData}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({item}) =>
                            <Text>{item.id} - {item.operadora} - {item.plano} - {item.preco} - {item.detalhes}</Text>}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    displayData: {
        flex: 0.5,
        margin: 10,
    },
});
