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
} from 'react-native';

import DescubraFetchService from '../services/DescubraFetchService';

const width = Dimensions.get('screen').width;

type Props = {};
export default class User extends Component<Props> {

    static navigatorButtons = {
        rightButtons: [
            {
                title: 'Editar', // for a textual button, provide the button title (label)
                id: 'edit', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
                disabled: false, // optional, used to disable the button (appears faded and doesn't interact)
                disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
                showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
                buttonColor: 'blue', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
                buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
                buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
            }
        ]
    };

    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            email: '',
            ddd: '',
            sexo: '',
        }
        // if you want to listen on navigator events, set this up
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'edit') { // this is the same id field from the static navigatorButtons definition
                
            }
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
