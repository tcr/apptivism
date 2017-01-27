/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Communications from 'react-native-communications';

import Main from './project';

export default class Apptivism extends Component {
  render() {
    return (
      <Main />
    );
  }
}

AppRegistry.registerComponent('Apptivism', () => Apptivism);
