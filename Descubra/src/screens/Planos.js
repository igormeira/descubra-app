/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, ScrollView, AsyncStorage, FlatList} from 'react-native';

import DescubraFetchService from '../services/DescubraFetchService';
import PlanosInfo from '../components/PlanosInfo';


type Props = {};
export default class Planos extends Component<Props> {

    constructor() {
        super();
        this.state = {
            data: [],
            user: '',
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
        AsyncStorage.getItem('table')
        .then( table => {
            console.log(table);
            const uri = '/' + table
            return uri
        })
        .then( uri => {
            DescubraFetchService.get(uri)
            .then(json => this.setState({data: json}))
            .catch(e => this.setState({status: 'FALHA_CARREGAMENTO'}));
        })
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) =>
                    <PlanosInfo data={item}
                    user={this.state.user}/>
                    }
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
});
