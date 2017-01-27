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
  ListView,
  TouchableOpacity
} from 'react-native';
import Communications from 'react-native-communications';
import Reps from './reps';

Reps.sort((a, b) => {
  return a.statename < b.statename ? -1 : a.statename > b.statename ? 1 : 0;
});

export default class Main extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: ((r1, r2) => r1 !== r2),
      initialListSize: 60,
    });
    this.state = {
      dataSource: ds.cloneWithRows(Reps),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Call Your Representatives~!
        </Text>
        <ListView style={styles.senatorList}
          dataSource={this.state.dataSource}
          renderRow={(rep, i) => {
            return <TouchableOpacity key={rep.name + ' ' + rep.officename + ' ' + rep.phone + ' ' + i} onPress={() => Communications.phonecall(rep.phone, true)}>
              <Text style={styles.text}>{rep.statename} - {rep.name}</Text>
              <Text style={styles.subtext}>{rep.officename}</Text>
            </TouchableOpacity>
          }}
          />
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
