/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, StatusBar, Picker, Text, Alert, ActivityIndicator} from 'react-native';
import {Button} from 'react-native-elements';
import {fonts, colors} from 'res';
import {inject, observer} from 'mobx-react';
import Api from '~/api';
import {Actions} from 'react-native-router-flux';

@inject('authStore')
@observer
class OpenAccount extends React.Component {
  state={
    loading: false,
  }
  onPress = () => {
    const {user, setAccountList} = this.props.authStore;
    this.setState({
      loading: true,
    });
    Api.Auth.newAccount({
      tc: user,
    })
      .then(res => {
        setAccountList(user);
        this.setState({
          loading: false,
        });
        Alert.alert(
          'Hesap Oluştuma Başarılı!', 'Bankamızı kullandığınız için teşekkürler.',  [{text: 'TAMAM', onPress: () => Actions.pop()}]
        );
      })
      .catch(err => {
        this.setState({
          loading: false,
        });
        Alert.alert('Hesap açma işlemi başarısız.', 'takrar deneyiniz..');
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
            </Picker>
          </View>
        </View>
        <View>
        {this.state.loading ? (
            <ActivityIndicator color={'blue'} size="large" />
          ) : (
        <Button title={'Yeni Hesap Oluştur'} onPress={this.onPress} />)}
        </View>
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
