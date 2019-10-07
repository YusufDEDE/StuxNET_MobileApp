/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from 'res';

export default class SignUp extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputBox}>
          <Input
            label={'Kimlik No'}
            labelStyle={{color: 'red'}}
            placeholder="11122233344"
            keyboardType={'numeric'}
            leftIcon={<Icon name="id-card" size={24} color="black" />}
            leftIconContainerStyle={{left: -13}}
          />
          <Input
            label={'Şifre'}
            labelStyle={{color: 'red'}}
            placeholder="******"
            leftIcon={<Icon name="key" size={24} color="black" />}
            leftIconContainerStyle={{left: -13}}
            containerStyle={{marginTop: 30}}
          />
          <Input
            label={'Şifre Tekrar'}
            labelStyle={{color: 'red'}}
            placeholder="******"
            leftIcon={<Icon name="key" size={24} color="black" />}
            leftIconContainerStyle={{left: -13}}
            containerStyle={{marginTop: 30}}
          />
          <Input
            label={'Ad-Soyad'}
            labelStyle={{color: 'red'}}
            placeholder="******"
            leftIcon={<Icon name="user" size={24} color="black" />}
            leftIconContainerStyle={{left: -13}}
            containerStyle={{marginTop: 30}}
          />
          <Input
            label={'Adres'}
            labelStyle={{color: 'red'}}
            placeholder="******"
            leftIcon={<Icon name="map" size={24} color="black" />}
            leftIconContainerStyle={{left: -13}}
            containerStyle={{marginTop: 30}}
          />
          <Input
            label={'Telefon'}
            labelStyle={{color: 'red'}}
            placeholder="******"
            leftIcon={<Icon name="phone" size={24} color="black" />}
            leftIconContainerStyle={{left: -13}}
            containerStyle={{marginTop: 30}}
          />
        </View>
        <View style={styles.buttonBox}>
          <Button
            title="Kayıt Ol"
            type="outline"
            containerStyle={{
              width: 200,
              backgroundColor: colors.secondaryDark,
              marginBottom: 50,
            }}
            titleStyle={{color: 'white'}}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    marginHorizontal: 50,
    marginTop: 40,
  },
  buttonBox: {
    marginTop: 50,
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
