import React from 'react';
import {AppRegistry} from 'react-native';
import {StackNavigator} from 'react-navigation';
import DetailsScreen from './src/components/DetailsScreen';
import ListScreen from './src/components/ListScreen';

const App = StackNavigator({
    Main: {screen: ListScreen},
    Details: {screen: DetailsScreen},
});

AppRegistry.registerComponent('Beer', () => App);
