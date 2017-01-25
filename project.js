/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Communications from 'react-native-communications';
import Reps from './reps';

export default class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Call Your Representatives!
        </Text>
        <ScrollView style={styles.senatorList}>
          {
            Reps
            .sort((a, b) => {
              return a.statename < b.statename ? -1 : a.statename > b.statename ? 1 : 0;
            })
            .map((rep, i) => {
              return <TouchableOpacity key={rep.name + ' ' + rep.officename + ' ' + rep.phone + ' ' + i} onPress={() => Communications.phonecall(rep.phone, true)}>
                <Text style={styles.text}>{rep.statename} - {rep.name}</Text>
                <Text style={styles.subtext}>{rep.officename}</Text>
              </TouchableOpacity>
            })
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  senatorList: {
    flex: 1,
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
  holder: {
    flex: 0.25,
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
  },
  subtext: {
    fontSize: 16,
  },
});
