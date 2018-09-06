import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator
} from 'react-native';

type Props = {};
export default class Loader extends Component<Props> {

    render() {

        const { loading } = this.props;

        return (
            <Modal
                transparent={true}
                animationType={'none'}
                visible={loading}
                onRequestClose={() => {console.log('close modal')}}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator
                        animating={loading} />
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 50,
    width: 50,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});