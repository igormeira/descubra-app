import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, Button } from 'react-native';

type Props = {};
export default class FirstTime extends Component<Props> {

  render() {

    const { head, body, readyCallBack } = this.props;

    return (
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#4F6D7A"
          />
          <Text style={styles.welcome}>
            {head}
          </Text>
          <Text style={styles.instructions}>
            {body}
          </Text>
          <Button title='Estou pronto!'
            onPress={ () => {readyCallBack()}} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#000000',
  },
  instructions: {
    textAlign: 'center',
    color: '#000000',
    marginBottom: 5,
  },
});

