/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity, Image, AsyncStorage, Dimensions, Text} from 'react-native';

import DescubraFetchService from '../services/DescubraFetchService';
import PlanosInfo from '../components/PlanosInfo';
import Loader from '../components/Loader';

const height = Dimensions.get('screen').height;

type Props = {};
export default class PlanosCelular extends Component<Props> {

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
        let uri = '/celular';
        this.setState({loading: true});
        this.setState({ data: [] });
        this.fetch(uri);
    }

    loadPlan(plan) {
        if (plan === 'all') {
            this.setState({ showText: false });
            this.load();
        }
        else {
            let uri = '/celular/plano/' + plan;
            this.setState({ showText: false });
            this.setState({loading: true});
            this.setState({ data: [] });
            this.fetch(uri);
        }
    }

    fetch(uri) {
        DescubraFetchService.get(uri)
            .then(json => {
                if (json.length === 0) {
                    this.setState({ showText: true })
                }
                else {
                    this.setState({ data: json })
                }
            })
            .then( () => {
                this.setState({loading: false})
            })
            .catch(e => this.setState({status: 'FALHA_CARREGAMENTO'}));
    }

    _keyExtractor = item => item.id;

    render() {
        return (
            <View style={styles.containerAll}>

                <Loader
                    loading={this.state.loading} />

                <View style={styles.container}>
                    <ScrollView style={styles.containerScroll}>
                        <FlatList
                            data={this.state.data}
                            keyExtractor={this._keyExtractor}
                            renderItem={({item}) =>
                            <PlanosInfo data={item}
                            user={this.state.user}/>
                            }
                        />

                        { this.state.showText ? <Text style={styles.semPlanos}>
                            {this.state.no_data}
                        </Text> : null } 

                    </ScrollView>

                </View>

                <View style={styles.containerBar}>
                    <TouchableOpacity style={styles.botao} onPress={() => this.loadPlan('all')} >
                        <Image style={styles.img} source={require("../../resources/images/call.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => this.loadPlan('Pos')} >
                        <Image style={styles.img} source={require("../../resources/images/p.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => this.loadPlan('Controle')} >
                        <Image style={styles.img} source={require("../../resources/images/info.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => this.loadPlan('Pre')} >
                        <Image style={styles.img} source={require("../../resources/images/p.png")}/>
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
    containerScroll: {
        flex: 0.925,
        backgroundColor: '#FFFFFF',
    },
    containerBar: {
        flex: 0.075,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
    semPlanos: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: height / 2.5
    },
});
