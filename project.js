/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import _ from 'lodash';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Communications from 'react-native-communications';
import Reps from './feed/representatives';
import { StackNavigator } from 'react-navigation';

Reps.sort((a, b) => {
  return a.statename < b.statename ? -1 : a.statename > b.statename ? 1 : 0;
});

Array.prototype.unique = function () {
  var a = [];
  this.forEach(b => {
    if (a.indexOf(b) === -1) {
      a.push(b);
    }
  })
  return a;
};

Commonwealths = Reps
  .map(a => a.statecode)
  .unique()
  .map(a => Reps.filter(b => b.statecode == a)[0])
  .sort((a, b) => a.statecode < b.statecode ? -1 : a.statecode > b.statecode ? 1 : 0);

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Call Your Representatives',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.cwList} contentContainerStyle={styles.cwListInner}>
          {
            _.chain(Commonwealths)
            .chunk(3)
            .map((cws, i) => <View key={i} style={styles.cwRow}>
              {
                cws.map((cw, i) =>
                  <TouchableOpacity style={styles.cwOuter} key={cw.statecode} onPress={() => navigate('Commonwealth', cw)}>
                    <View style={styles.cw}><Text style={styles.cwText}>{cw.statecode}</Text></View>
                  </TouchableOpacity>
                )
              }
            </View>)
            .value()
          }
        </ScrollView>
      </View>
    );
  }
}

class CommonwealthScreen extends Component {
  static navigationOptions = {
    // Nav options can be defined as a function of the navigation prop:
    title: ({ state }) => `${state.params.statename}`,
  };

  constructor(props) {
    super(props);
    const cw = props.navigation.state.params;
    this.state = {
      reps: _.chain(Reps)
        .filter(a => a.statecode == cw.statecode)
        .sort((a, b) => {
          console.log(a.name, b.name);
          let aLast = a.name.match(/([A-Za-z\-]+)(,? Jr.?)?$/)[1];
          let bLast = b.name.match(/([A-Za-z\-]+)(,? Jr.?)?$/)[1];
          return aLast < bLast ? -1 : aLast > bLast ? 1 : 0;
        })
        .groupBy(a => a.name)
        .value(),
    };
  }

  render() {
    let {reps} = this.state;
    return (
      <ScrollView style={styles.senatorList}>
        {
          Object.keys(reps).map((name) => {
            let rep = reps[name];
            return (
              <View key={name} style={styles.senator}>
                <Text style={styles.text} style={styles.senatorTitle}>
                  {name}
                </Text>
                {
                  reps[name]
                  .sort((a, b) => a.officename < b.officename ? -1 : a.officename > b.officename ? 1 : 0)
                  .map((rep, i) => {
                    return <TouchableOpacity key={i}
                      onPress={() => Communications.phonecall(rep.phone, true)}>
                      <Text style={styles.senatorOffice}>{rep.phone} — {rep.officename}</Text>
                    </TouchableOpacity>
                  })
                }
              </View>
            );
          })
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  cwList: {
    flex: 1,
    // flexDirection: "row",
    height: 200,
    backgroundColor: '#ff0000',
  },
  cwListInner: {
    // flex: 1,
    flexDirection: "column",
    alignItems: 'stretch',
  },
  cwRow: {
    flexDirection: "row",
    flex: 1,
  },
  cwOuter: {
    flex: 1,
  },
  cw: {
    // minWidth: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    flex: 0,
    backgroundColor: '#ffaaaa',
    margin: 8,
  },
  cwText: {
    fontSize: 40,
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
  senator: {
  },
  senatorTitle: {
    fontSize: 24,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  senatorOffice: {
    backgroundColor: '#ddd',
    paddingVertical: 5,
    paddingHorizontal: 13,
  }
});


export default StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Commonwealth: {
    screen: CommonwealthScreen,
  }
});
