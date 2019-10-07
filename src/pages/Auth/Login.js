/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Input, Button, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from 'res';

export default class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputBox}>
          <Input
            label={'Kimlik No'}
            placeholder="11122233344"
            keyboardType={'numeric'}
            leftIcon={<Icon name="id-card" size={24} color="black" />}
            leftIconContainerStyle={{left: -13}}
          />
          <Input
            label={'Şifre'}
            placeholder="******"
            leftIcon={<Icon name="key" size={24} color="black" />}
            leftIconContainerStyle={{left: -13}}
            containerStyle={{marginTop: 20}}
          />
        </View>
        <View style={styles.buttonBox}>
          <Button
            title="Giriş Yap"
            type="outline"
            containerStyle={{width: 200, backgroundColor: colors.secondaryDark}}
            titleStyle={{color: 'white'}}
          />
        </View>
        <TouchableOpacity style={styles.forgotPass}>
          <Text style={{color: 'red'}}>Şifremi Unuttum</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  inputBox: {
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    marginHorizontal: 30,
  },
  buttonBox: {
    marginTop: 50,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  forgotPass: {},
});
