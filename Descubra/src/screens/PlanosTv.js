/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, AsyncStorage, FlatList} from 'react-native';
import DescubraFetchService from '../services/DescubraFetchService';


type Props = {};
export default class Planos extends Component<Props> {

    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.props.navigator.setOnNavigatorEvent(event => {
            if(event.id === 'willAppear')
                this.load();
        });
    }

    load() {
        let tb = AsyncStorage.getItem("table");
        let uri = '/tv';

        DescubraFetchService.get(uri)
            .then(json => this.setState({data: json}))
            .catch(e => this.setState({status: 'FALHA_CARREGAMENTO'}));
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) =>
                        <View style={styles.containerItem} key={item.id}>
                            <View style={styles.containerProvedor}>
                                <Text style={{fontWeight: 'bold'}}>
                                    {item.provedor}</Text>
                            </View>

                            <View style={styles.containerPlano}>
                                <View style={styles.containerTitulo}>
                                    <Text style={{fontWeight: 'bold'}}>Plano</Text>
                                </View>
                                <View style={styles.containerTitulo}>
                                    <Text style={{fontWeight: 'bold'}}>Preço</Text>
                                </View>
                            </View>

                            <View style={styles.containerPlano}>
                                <View style={styles.containerTitulo}>
                                    <Text>{item.plano}</Text>
                                </View>
                                <View style={styles.containerTitulo}>
                                    <Text>{item.preco}</Text>
                                </View>
                            </View>

                            <View style={styles.containerDetalhes}>
                                <Text style={{fontWeight: 'bold'}}>Detalhes</Text>
                                <Text>{item.detalhes}</Text>
                            </View>
                        </View>}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#FFFFFF',
    },
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
    containerProvedor: {
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
});
