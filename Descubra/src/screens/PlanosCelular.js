/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import
{
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Linking,
    Image,
} from 'react-native';

import DescubraFetchService from '../services/DescubraFetchService';


type Props = {};
export default class Planos extends Component<Props> {

    constructor() {
        super();
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        this.props.navigator.setOnNavigatorEvent(event => {
            if(event.id === 'willAppear')
                this.load();
        });
    }

    load() {
        let uri = '/celular';

        DescubraFetchService.get(uri)
            .then(json => this.setState({data: json}))
            .catch(e => this.setState({status: 'FALHA_CARREGAMENTO'}));
    }

    loadPlan(plan) {
        if (plan === 'all') {
            this.load();
        }
        else {
            let uri = '/celular/plano/' + plan;

            DescubraFetchService.get(uri)
                .then(json => this.setState({data: json}))
                .catch(e => this.setState({status: 'FALHA_CARREGAMENTO'}));
        }
    }

    maisInfo(op) {
        switch(op) {
            case 'TIM':
                return Linking.openURL('http://www.tim.com.br');
            case 'Oi':
                return Linking.openURL('https://www.oi.com.br');
            default:
                return NONE;
        }
    }

    callTo(op) {
        switch(op) {
            case 'TIM':
                return Linking.openURL('http://www.tim.com.br');
            case 'Oi':
                return Linking.openURL('https://www.oi.com.br');
            default:
                return NONE;
        }
    }

    render() {
        return (
            <View style={styles.containerAll}>
                <View style={styles.container}>
                    <ScrollView style={styles.containerScroll}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({item}) =>
                                <View style={styles.containerItem} key={item.id}>
                                    <View style={styles.containerOperadora}>
                                        <Text style={{fontWeight: 'bold'}}>
                                            {item.operadora}</Text>
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
                                            <Text>{item.plano}</Text>
                                        </View>
                                        <View style={styles.containerTitulo}>
                                            <Text>{item.preco}</Text>
                                        </View>
                                        <View style={styles.containerTitulo}>
                                            <Text>{item.validade}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.containerDetalhes}>
                                        <Text style={{fontWeight: 'bold'}}>Detalhes</Text>
                                        <Text>{item.detalhes}</Text>
                                    </View>

                                    <View style={styles.containerBotoes}>
                                        <TouchableOpacity style={styles.botao} onPress={() => this.callTo(item.operadora)} >
                                            <Image style={styles.img} source={require("../../resources/images/call.png")}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.botao} onPress={() => this.maisInfo(item.operadora)} >
                                            <Image style={styles.img} source={require("../../resources/images/info.png")}/>
                                        </TouchableOpacity>
                                    </View>
                            
                                </View>
                            }
                        />
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
