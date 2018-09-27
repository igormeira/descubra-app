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
    View,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    AsyncStorage,
    Text,
    Dimensions
} from 'react-native';

import DescubraFetchService from '../services/DescubraFetchService';
import PlanosInfo from '../components/PlanosInfo';
import Loader from '../components/Loader';

const height = Dimensions.get('screen').height;

type Props = {};
export default class Favoritos extends Component<Props> {

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
            if(event.id === 'willAppear'){
                AsyncStorage.getItem('usuario')
                .then( usuario => this.setState({user: usuario}))
                .then( () => this.load())
            }
        });
    }

    load() {
        let uri = '/celular/fav/' + this.state.user;
        this.setState({ loading: true });
        this.setState({ data: [] });
        this.fetch(uri);
    }

    loadType(type) {
        if (type === 'celular') {
            this.setState({ showText: false });
            this.load();
        }
        else {
            let uri = '/' + type + '/fav/' + this.state.user;
            this.setState({ showText: false });
            this.setState({ loading: true });
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
            .then(() => {
                this.setState({ loading: false })
            })
            .catch(e => this.setState({status: 'FALHA_CARREGAMENTO'}));
    }

    render() {
        return (
            <View style={styles.containerAll}>
                <View style={styles.container}>
                    <ScrollView style={styles.containerScroll}>

                        <Loader
                            loading={this.state.loading} />

                        <FlatList
                            data={this.state.data}
                            renderItem={({item}) =>
                            <PlanosInfo data={item}
                            user={this.state.user}/>
                            }
                        />
                        
                        {this.state.showText ? <Text style={styles.semPlanos}>
                            {this.state.no_data}
                        </Text> : null} 

                    </ScrollView>
                </View>

                <View style={styles.containerBar}>
                    <TouchableOpacity style={styles.botao} onPress={() => this.loadType('celular')} >
                        <Image style={styles.img} source={require("../../resources/images/cell.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => this.loadType('fixo')} >
                        <Image style={styles.img} source={require("../../resources/images/fixo.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => this.loadType('internet')} >
                        <Image style={styles.img} source={require("../../resources/images/internet.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => this.loadType('tv')} >
                        <Image style={styles.img} source={require("../../resources/images/tv.png")}/>
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
