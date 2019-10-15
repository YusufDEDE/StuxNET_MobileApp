import {SafeAreaView} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {TouchableOpacity} from 'react-native';
import Logo from './Logo';
import {Actions} from 'react-native-router-flux';

export default class NavBar extends React.Component {
  _renderLeft() {
    return (
      <SafeAreaView>
        <TouchableOpacity style={styles.container} onPress={Actions.drawerOpen}>
          <Logo />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>{this._renderLeft()}</SafeAreaView>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
