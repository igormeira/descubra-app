import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FirstTime from '../components/FirstTime';

type Props = {};
export default class Tutorial extends Component<Props> {

    constructor() {
        super();
        this.state = {
            head: 'Avisos!',
            body: 'Texto de avisos!',
        }
    }

    ready() {
        this.props.navigator.resetTo({
          screen: 'Login',
          title: 'Login'
        })
      }

    render() {
        return (
            <View style={styles.container}>
                <FirstTime 
                    head={this.state.head}
                    body={this.state.body}
                    readyCallBack={this.ready.bind(this)}/>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#FFFFFF',
    },
});

