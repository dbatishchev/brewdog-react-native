import React from 'react';
import {AppRegistry, StyleSheet} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Details from './src/components/Details';
import List from './src/components/List';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

const App = StackNavigator({
    Main: {screen: List},
    Details: {screen: Details},
});

AppRegistry.registerComponent('Beer', () => App);
