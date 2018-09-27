/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, ScrollView, AsyncStorage, FlatList, Text, Dimensions } from 'react-native';

import DescubraFetchService from '../services/DescubraFetchService';
import PlanosInfo from '../components/PlanosInfo';
import Loader from '../components/Loader';
import Notificacao from '../api/Notificacao';

const height = Dimensions.get('screen').height;

type Props = {};
export default class Planos extends Component<Props> {

    constructor() {
        super();
        this.state = {
            data: [],
            no_data: 'NÃO EXISTEM PLANOS!',
            showText: false,
            user: '',
            loading: true,
        }
    }

    componentDidMount() {
        this.props.navigator.setOnNavigatorEvent(event => {
            if(event.id === 'willAppear') {
                AsyncStorage.getItem('usuario')
                .then( usuario => {
                    this.setState({user: usuario})
                })
                .then( () => {
                    this.load();
                })
            }
        });
    }

    load() {
        this.setState({loading: true});
        this.fetch();
    }

    fetch() {
        AsyncStorage.getItem('table')
        .then( table => {
            console.log(table);
            const uri = '/' + table
            return uri
        })
        .then( uri => {
            DescubraFetchService.get(uri)
            .then(json => {
                if (json.length === 0) {
                    this.setState({ showText: true })
                }
                else {
                    this.setState({data: json})
                }
            })
            .then( () => {
                this.setState({loading: false})
            })
            .catch(e => this.setState({status: 'FALHA_CARREGAMENTO'}))
        })
    }

    _keyExtractor = item => item.id;

    render() {
        return (
            <ScrollView style={styles.container}>
                <Loader
                    loading={this.state.loading} />

                <FlatList
                    data={this.state.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) =>
                    <PlanosInfo data={item}
                    user={this.state.user}/>
                    }
                />
                
                {this.state.showText ? <Text style={styles.semPlanos}>
                    {this.state.no_data}
                </Text> : null} 

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
    semPlanos: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: height / 2.5
    },
});
