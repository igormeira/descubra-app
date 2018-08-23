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
} from 'react-native';

import DescubraFetchService from './src/services/DescubraFetchService';
import Notificacao from './src/api/Notificacao'

type Props = {};
export default class App extends Component<Props> {

    static navigatorButtons = {
        rightButtons: [
            {
                title: 'Sair', // for a textual button, provide the button title (label)
                id: 'logout', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
                disabled: false, // optional, used to disable the button (appears faded and doesn't interact)
                disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
                showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
                buttonColor: 'red', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
                buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
                buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
            }
        ],
        leftButtons: [
            {
                title: 'Usuario', // for a textual button, provide the button title (label)
                id: 'user', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
                disabled: false, // optional, used to disable the button (appears faded and doesn't interact)
                disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
                showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
                buttonColor: 'red', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
                buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
                buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
            }
        ]
    };

    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'logout') { // this is the same id field from the static navigatorButtons definition
                AsyncStorage.getItem('token')
                .then( token => {
                    DescubraFetchService.postLogout(token)
                    .then( () => {
                        //Notificacao.exibe(json[0].msg, 'Até mais!');
                        AsyncStorage.removeItem('token'),
                        AsyncStorage.removeItem('refresh_token'),
                        AsyncStorage.removeItem('usuario')
                    })
                    .then( () => {
                        this.props.navigator.resetTo({
                            screen: 'Login',
                            title: 'Login'
                        })
                    })
                })
            }
            if (event.id == 'user') {
                this.props.navigator.push({
                    screen: 'User',
                    title: 'Informações',
                    backButtonTitle: ''
                })
            }
        }
    }

    planosCel(tb) {
        AsyncStorage.setItem("table", tb);
        this.props.navigator.push({
            screen: 'PlanosCelular',
            title: tb,
            backButtonTitle: '',
        })
    }

    planosFixo(tb) {
        AsyncStorage.setItem("table", tb);
        this.props.navigator.push({
            screen: 'PlanosFixo',
            title: tb,
            backButtonTitle: '',
        })
    }

    planosNet(tb) {
        AsyncStorage.setItem("table", tb);
        this.props.navigator.push({
            screen: 'PlanosInternet',
            title: tb,
            backButtonTitle: '',
        })
    }

    planosTv(tb) {
        AsyncStorage.setItem("table", tb);
        this.props.navigator.push({
            screen: 'PlanosTv',
            title: tb,
            backButtonTitle: '',
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerHalf}>
                    <TouchableOpacity onPress={() => this.planosCel("Celular")}
                        style={styles.buttonLeft}>
                        <Image
                            style={styles.buttonImg}
                            source={require('./resources/images/cell.png')} />
                        <Text>Planos para Celular</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.planosFixo("Fixo")}
                        style={styles.buttonRight}>
                        <Image
                            style={styles.buttonImg}
                            source={require('./resources/images/fixo.png')} />
                        <Text>Planos para Fixo</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerHalf}>
                    <TouchableOpacity onPress={() => this.planosNet("Internet")}
                        style={styles.buttonLeft}>
                        <Image
                            style={styles.buttonImg}
                            source={require('./resources/images/internet.png')} />
                        <Text>Planos para Internet</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.planosTv("Tv")}
                        style={styles.buttonRight}>
                        <Image
                            style={styles.buttonImg}
                            source={require('./resources/images/tv.png')} />
                        <Text>Planos para TV</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#000000',
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
});
