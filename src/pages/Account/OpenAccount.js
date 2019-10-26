/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, StatusBar, Picker, Text, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import {fonts, colors} from 'res';
import {inject, observer} from 'mobx-react';
import Api from '~/api';
import {Actions} from 'react-native-router-flux';

@inject('authStore')
@observer
class OpenAccount extends React.Component {
  onPress = () => {
    const {user, setAccountList} = this.props.authStore;
    Api.Auth.newAccount({
      tc: user,
    })
      .then(res => {
        setAccountList(user);
        Alert.alert(
          'Hesap Oluştuma Başarılı!'
        );
        Actions.pop();
      })
      .catch(err => {
        Alert.alert('giriş başarısız.', 'takrar deneyiniz..');
        console.log(err);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <Text style={styles.text}>Hesap Oluştur</Text>
        <View>
          <Text>Hesap Tipi Seçiniz</Text>
          <View style={styles.pickerStyle}>
            <Picker>
              <Picker.Item label="Bireysel" value="bireysel" />
              <Picker.Item label="Kurumsal" value="kurumsal" />
            </Picker>
          </View>
        </View>
        <Button title={'Yeni Hesap Oluştur'} onPress={this.onPress} />
      </View>
    );
  }
}

export default OpenAccount;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'space-evenly', alignItems: 'center'},
  text: {
    fontFamily: fonts.avenirMedium,
    fontSize: 28,
    color: colors.secondaryDark,
  },
  pickerStyle: {
    height: 50,
    width: 300,
    borderColor: colors.cyprus,
    borderWidth: 1,
  },
});
